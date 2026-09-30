import {
  CanvasTexture,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** Everything the card prints. Passed in so the copy stays in portfolio-data.ts. */
export interface CardContent {
  name: string;
  title: string;
  school: string;
  program: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface CardSceneOptions {
  container: HTMLElement;
  photoUrl: string;
  content: CardContent;
  /** Called whenever the visible face changes. */
  onFace: (showingBack: boolean) => void;
  /** Called if the GPU context is lost, so the caller can fall back to the static card. */
  onLost: () => void;
}

export interface CardScene {
  /** Half-turn in the given direction. */
  flip(direction: 1 | -1): void;
  destroy(): void;
}

// All tuning lives here.
const CARD = { width: 1, height: 1.5, radius: 0.07, thickness: 0.018 };
const TEXTURE = { width: 1024, height: 1536 };
const SPRING = { stiffness: 120, damping: 15 };
const TILT_MAX = (12 * Math.PI) / 180;
const DRAG_RADIANS_PER_PX = 0.0085;
const DRAG_TILT_LIMIT = 0.6;
const MAX_SPIN = 20;
const REST = 0.0008;
const COLORS = { ink: '#1D1D1F', muted: '#6E6E73', paper: '#FFFFFF', slot: '#E5E5EA', backdrop: '#1D1D1F', onDark: '#F5F5F7', mutedOnDark: '#A1A1A6', status: '#30D158' };

export async function createCardScene(options: CardSceneOptions): Promise<CardScene> {
  const { container, photoUrl, content, onFace, onLost } = options;

  const [photo] = await Promise.all([loadImage(photoUrl), loadFonts()]);

  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y';
  container.appendChild(canvas);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04).texture;
  scene.environment = environment;
  scene.environmentIntensity = 0.16;
  const key = new DirectionalLight(0xffffff, 0.3);
  key.position.set(1.5, 2.5, 3);
  scene.add(key);

  const camera = new PerspectiveCamera(28, 1, 0.1, 20);

  // Two faces with their own art, and an edge slab between them.
  const anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
  const frontTexture = makeTexture(drawFront(photo, content), anisotropy);
  const backTexture = makeTexture(drawBack(content), anisotropy);
  const faceMaterial = (map: CanvasTexture) =>
    // The art is emissive so its colors stay exact; light only adds the moving sheen on top.
    new MeshPhysicalMaterial({
      color: 0x000000,
      emissive: 0xffffff,
      emissiveMap: map,
      roughness: 0.6,
      metalness: 0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.35,
    });
  const frontMaterial = faceMaterial(frontTexture);
  const backMaterial = faceMaterial(backTexture);
  const edgeMaterial = new MeshStandardMaterial({ color: 0xd2d2d7, roughness: 0.35, metalness: 0.6 });

  const outline = roundedRect(CARD.width, CARD.height, CARD.radius);
  const faceGeometry = makeFaceGeometry();
  const edgeGeometry = new ExtrudeGeometry(outline, { depth: CARD.thickness, bevelEnabled: false, curveSegments: 20 });
  edgeGeometry.translate(0, 0, -CARD.thickness / 2);

  const inset = CARD.thickness / 2 + 0.0006;
  const front = new Mesh(faceGeometry, frontMaterial);
  front.position.z = inset;
  const back = new Mesh(faceGeometry, backMaterial);
  back.rotation.y = Math.PI;
  back.position.z = -inset;
  const card = new Group();
  card.add(new Mesh(edgeGeometry, edgeMaterial), front, back);
  scene.add(card);

  // --- Spring state: rotation about X (tilt) and Y (turn) ---
  const state = { x: 0, y: 0, vx: 0, vy: 0, face: 0, hoverX: 0, hoverY: 0, dragging: false };
  let raf = 0;
  let last = 0;
  let visible = true;
  let destroyed = false;

  const showingBack = () => Math.abs(Math.round(state.face / Math.PI)) % 2 === 1;

  const render = () => {
    card.rotation.set(state.x, state.y, 0);
    renderer.render(scene, camera);
  };

  const targets = () => ({ x: state.hoverX, y: state.face + state.hoverY });

  const settled = () => {
    const t = targets();
    return (
      !state.dragging &&
      Math.abs(state.vx) < REST &&
      Math.abs(state.vy) < REST &&
      Math.abs(t.x - state.x) < REST &&
      Math.abs(t.y - state.y) < REST
    );
  };

  const frame = (now: number) => {
    raf = 0;
    if (destroyed || !visible) return;
    const dt = Math.min((now - last) / 1000 || 1 / 60, 1 / 30);
    last = now;

    if (!state.dragging) {
      const t = targets();
      state.vx += (SPRING.stiffness * (t.x - state.x) - SPRING.damping * state.vx) * dt;
      state.vy += (SPRING.stiffness * (t.y - state.y) - SPRING.damping * state.vy) * dt;
      state.x += state.vx * dt;
      state.y += state.vy * dt;
    }

    if (settled()) {
      const t = targets();
      state.x = t.x;
      state.y = t.y;
      state.vx = 0;
      state.vy = 0;
      render();
      return;
    }
    render();
    raf = requestAnimationFrame(frame);
  };

  const requestRender = () => {
    if (raf || destroyed || !visible) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  // --- Sizing ---
  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const halfFov = (camera.fov * Math.PI) / 360;
    const fitHeight = (CARD.height * 1.12) / 2 / Math.tan(halfFov);
    const fitWidth = (CARD.width * 1.12) / 2 / camera.aspect / Math.tan(halfFov);
    camera.position.set(0, 0, Math.max(fitHeight, fitWidth));
    camera.updateProjectionMatrix();
    render();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestRender();
  });
  visibilityObserver.observe(container);

  // --- Pointer: hover tilt, drag to turn, release to spring to the nearest face ---
  let lastX = 0;
  let lastY = 0;
  let lastT = 0;

  const setHover = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const rect = container.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    state.hoverY = clamp(nx, -1, 1) * TILT_MAX;
    state.hoverX = clamp(ny, -1, 1) * TILT_MAX;
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    state.dragging = true;
    state.vx = 0;
    state.vy = 0;
    lastX = event.clientX;
    lastY = event.clientY;
    lastT = event.timeStamp;
    container.setPointerCapture(event.pointerId);
    requestRender();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!state.dragging) {
      setHover(event);
      requestRender();
      return;
    }
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const elapsed = Math.max((event.timeStamp - lastT) / 1000, 0.008);
    state.y += dx * DRAG_RADIANS_PER_PX;
    state.x = clamp(state.x + dy * DRAG_RADIANS_PER_PX, -DRAG_TILT_LIMIT, DRAG_TILT_LIMIT);
    state.vy = clamp(state.vy * 0.5 + ((dx * DRAG_RADIANS_PER_PX) / elapsed) * 0.5, -MAX_SPIN, MAX_SPIN);
    lastX = event.clientX;
    lastY = event.clientY;
    lastT = event.timeStamp;
    requestRender();
  };

  const endDrag = (event: PointerEvent) => {
    if (!state.dragging) return;
    state.dragging = false;
    if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
    // Let the flick carry the card, then settle on the nearest face.
    state.face = Math.round((state.y + state.vy * 0.2) / Math.PI) * Math.PI;
    if (event.pointerType === 'touch') {
      state.hoverX = 0;
      state.hoverY = 0;
    } else {
      setHover(event);
    }
    onFace(showingBack());
    requestRender();
  };

  const onPointerLeave = () => {
    state.hoverX = 0;
    state.hoverY = 0;
    requestRender();
  };

  container.addEventListener('pointerdown', onPointerDown);
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerup', endDrag);
  container.addEventListener('pointercancel', endDrag);
  container.addEventListener('pointerleave', onPointerLeave);

  const onContextLost = (event: Event) => {
    event.preventDefault();
    onLost();
  };
  canvas.addEventListener('webglcontextlost', onContextLost);

  render();

  return {
    flip(direction) {
      state.face += direction * Math.PI;
      onFace(showingBack());
      requestRender();
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', endDrag);
      container.removeEventListener('pointercancel', endDrag);
      container.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      faceGeometry.dispose();
      edgeGeometry.dispose();
      frontMaterial.dispose();
      backMaterial.dispose();
      edgeMaterial.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      environment.dispose();
      room.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}

// ---------------------------------------------------------------- geometry

function roundedRect(width: number, height: number, radius: number): Shape {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.absarc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false);
  shape.lineTo(x + width, y + height - radius);
  shape.absarc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
  shape.lineTo(x + radius, y + height);
  shape.absarc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + radius);
  shape.absarc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false);
  return shape;
}

/** A rounded card face whose UVs run 0 to 1 across the whole card. */
function makeFaceGeometry(): ShapeGeometry {
  const geometry = new ShapeGeometry(roundedRect(CARD.width, CARD.height, CARD.radius), 20);
  const position = geometry.attributes['position'];
  const uv = geometry.attributes['uv'];
  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, position.getX(i) / CARD.width + 0.5, position.getY(i) / CARD.height + 0.5);
  }
  uv.needsUpdate = true;
  return geometry;
}

function makeTexture(canvas: HTMLCanvasElement, anisotropy: number): CanvasTexture {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = anisotropy;
  return texture;
}

// ---------------------------------------------------------------- card art

const SANS = 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

function newCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE.width;
  canvas.height = TEXTURE.height;
  return { canvas, ctx: canvas.getContext('2d')! };
}

function drawFront(photo: HTMLImageElement, content: CardContent): HTMLCanvasElement {
  const { canvas, ctx } = newCanvas();
  const { width, height } = TEXTURE;
  ctx.fillStyle = COLORS.paper;
  ctx.fillRect(0, 0, width, height);

  // Hairline so the white card reads against a white page
  pathRoundRect(ctx, 2, 2, width - 4, height - 4, (CARD.radius / CARD.width) * width);
  ctx.strokeStyle = 'rgba(0,0,0,0.10)';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Lanyard slot
  pathRoundRect(ctx, width / 2 - 70, 46, 140, 26, 13);
  ctx.fillStyle = COLORS.slot;
  ctx.fill();

  // Photo, cropped toward the top so the face sits well in frame
  const box = { x: 56, y: 104, w: width - 112, h: 1030 };
  ctx.save();
  pathRoundRect(ctx, box.x, box.y, box.w, box.h, 36);
  ctx.clip();
  const scale = box.w / photo.naturalWidth;
  const drawnHeight = photo.naturalHeight * scale;
  ctx.drawImage(photo, box.x, box.y - (drawnHeight - box.h) * 0.55, box.w, drawnHeight);
  ctx.restore();

  const left = 64;
  let y = box.y + box.h + 104;
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = COLORS.ink;
  ctx.font = `600 80px ${SANS}`;
  ctx.fillText(content.name, left, y);
  y += 68;
  ctx.fillStyle = COLORS.muted;
  ctx.font = `400 46px ${SANS}`;
  ctx.fillText(content.title, left, y);
  y += 72;
  ctx.font = `400 40px ${MONO}`;
  ctx.fillText(content.school, left, y);
  return canvas;
}

function drawBack(content: CardContent): HTMLCanvasElement {
  const { canvas, ctx } = newCanvas();
  const { width, height } = TEXTURE;
  ctx.fillStyle = COLORS.backdrop;
  ctx.fillRect(0, 0, width, height);
  ctx.textBaseline = 'alphabetic';

  const left = 72;
  ctx.fillStyle = COLORS.onDark;
  ctx.font = `700 150px ${SANS}`;
  ctx.fillText('WB.', left, 250);

  ctx.font = `600 76px ${SANS}`;
  ctx.fillText(content.name, left, 620);
  ctx.fillStyle = COLORS.mutedOnDark;
  ctx.font = `400 44px ${SANS}`;
  ctx.fillText(content.title, left, 690);

  ctx.font = `400 40px ${MONO}`;
  ctx.fillText(content.school, left, 800);
  ctx.fillText(content.program, left, 856);

  ctx.fillStyle = COLORS.status;
  ctx.beginPath();
  ctx.arc(left + 10, 982, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.onDark;
  ctx.font = `400 36px ${MONO}`;
  ctx.fillText(content.status, left + 38, 994);

  ctx.strokeStyle = 'rgba(245,245,247,0.16)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, 1180);
  ctx.lineTo(width - left, 1180);
  ctx.stroke();

  ctx.fillStyle = COLORS.onDark;
  ctx.font = `400 40px ${MONO}`;
  ctx.fillText(content.email, left, 1272);
  ctx.fillText(content.github, left, 1336);
  ctx.fillText(content.linkedin, left, 1400);
  return canvas;
}

function pathRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---------------------------------------------------------------- helpers

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.decoding = 'async';
  image.src = url;
  await image.decode();
  return image;
}

async function loadFonts(): Promise<void> {
  await Promise.all([
    document.fonts.load(`600 80px ${SANS}`),
    document.fonts.load(`700 150px ${SANS}`),
    document.fonts.load(`400 36px ${SANS}`),
    document.fonts.load(`400 30px ${MONO}`),
  ]);
}

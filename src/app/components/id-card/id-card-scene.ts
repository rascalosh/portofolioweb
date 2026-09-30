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
  status: string;
  /** What you are working on now; the back shows it only when set. */
  now: string | null;
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
const COLORS = { caution: '#FFD60A', ink: '#0E0E0E', muted: '#6E6E73', paper: '#FFFFFF', slot: '#E5E5EA', backdrop: '#1D1D1F', onDark: '#F5F5F7', mutedOnDark: '#A1A1A6' };

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
  const centre = width / 2;

  // Laminated staff pass: white stock, a scatter of yellow seals, hazard stripes top and bottom.
  ctx.fillStyle = COLORS.paper;
  ctx.fillRect(0, 0, width, height);

  for (const [x, y, r] of [[170, 400, 128], [880, 330, 112], [900, 800, 132], [130, 880, 118], [820, 1270, 110], [190, 1300, 104]]) {
    drawSeal(ctx, x, y, r);
  }

  hazardBand(ctx, 0, width, 24);
  hazardBand(ctx, height - 40, width, 40);

  // Hairline so the white card reads against the page
  pathRoundRect(ctx, 2, 2, width - 4, height - 4, (CARD.radius / CARD.width) * width);
  ctx.strokeStyle = 'rgba(0,0,0,0.18)';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Lanyard slot
  pathRoundRect(ctx, centre - 70, 58, 140, 26, 13);
  ctx.fillStyle = COLORS.slot;
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = COLORS.ink;

  // Photo, cropped toward the top so the face sits well in frame
  const box = { x: 152, y: 132, w: 720, h: 830 };
  ctx.save();
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.w, box.h);
  ctx.clip();
  const scale = box.w / photo.naturalWidth;
  const drawnHeight = photo.naturalHeight * scale;
  ctx.drawImage(photo, box.x, box.y - (drawnHeight - box.h) * 0.4, box.w, drawnHeight);
  ctx.restore();
  ctx.strokeStyle = COLORS.ink;
  ctx.lineWidth = 6;
  ctx.strokeRect(box.x, box.y, box.w, box.h);

  // Name, title, barcode
  const [first, ...rest] = content.name.toUpperCase().split(' ');
  ctx.fillStyle = COLORS.ink;
  ctx.font = fitFont(ctx, first, 800, 124, 900, SANS);
  ctx.fillText(first, centre, 1100);
  ctx.font = fitFont(ctx, rest.join(' '), 700, 84, 900, SANS);
  ctx.fillText(rest.join(' '), centre, 1198);
  ctx.font = fitFont(ctx, content.title.toUpperCase(), 500, 40, 820, SANS);
  ctx.fillText(content.title.toUpperCase(), centre, 1288);
  drawBarcode(ctx, content.name, 232, 1348, 560, 108);

  ctx.textAlign = 'start';
  return canvas;
}

/** A yellow roundel with a ring of small print, printed faintly behind the card's content. */
function drawSeal(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = COLORS.caution;
  ctx.fillStyle = COLORS.caution;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.62, 0, Math.PI * 2);
  ctx.stroke();

  const ring = 'FULL-STACK · AI ENGINEER · PORTFOLIO · ';
  ctx.font = `700 ${Math.round(r * 0.2)}px ${SANS}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const radius = r * 0.81;
  const step = (Math.PI * 2) / ring.length;
  for (let i = 0; i < ring.length; i++) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 2 + step * i);
    ctx.translate(0, -radius);
    ctx.fillText(ring[i], 0, 0);
    ctx.restore();
  }
  ctx.font = `800 ${Math.round(r * 0.42)}px ${SANS}`;
  ctx.fillText('WB.', cx, cy);
  ctx.restore();
}

/** Diagonal caution stripes across a band, the same motif as the site's header edge. */
function hazardBand(ctx: CanvasRenderingContext2D, y: number, width: number, thickness: number): void {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, y, width, thickness);
  ctx.clip();
  ctx.fillStyle = COLORS.caution;
  ctx.fillRect(0, y, width, thickness);
  ctx.fillStyle = COLORS.ink;
  const stripe = thickness * 0.9;
  for (let x = -thickness; x < width + thickness; x += stripe * 2) {
    ctx.beginPath();
    ctx.moveTo(x, y + thickness);
    ctx.lineTo(x + stripe, y + thickness);
    ctx.lineTo(x + stripe + thickness, y);
    ctx.lineTo(x + thickness, y);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

/** Decorative barcode derived from the name, so it is stable between loads. It encodes nothing. */
function drawBarcode(ctx: CanvasRenderingContext2D, seed: string, x: number, y: number, w: number, h: number): void {
  let state = 0;
  for (const char of seed) state = (state * 31 + char.charCodeAt(0)) >>> 0;
  ctx.fillStyle = COLORS.ink;
  let cursor = x;
  while (cursor < x + w) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const bar = 3 + (state % 4) * 3;
    const gap = 3 + ((state >>> 8) % 3) * 3;
    ctx.fillRect(cursor, y, Math.min(bar, x + w - cursor), h);
    cursor += bar + gap;
  }
}

/** Largest font size, up to `max`, at which the text fits `maxWidth`. */
function fitFont(ctx: CanvasRenderingContext2D, text: string, weight: number, max: number, maxWidth: number, family: string): string {
  let size = max;
  ctx.font = `${weight} ${size}px ${family}`;
  while (size > 16 && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;
  }
  return ctx.font;
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

  ctx.fillStyle = COLORS.onDark;
  ctx.font = `400 36px ${MONO}`;
  ctx.fillText(fitText(ctx, content.status, width - left * 2), left, 994);

  if (content.now) {
    ctx.fillStyle = COLORS.mutedOnDark;
    ctx.fillText('Now', left, 1064);
    ctx.fillStyle = COLORS.onDark;
    ctx.fillText(fitText(ctx, content.now, width - left * 2 - 110), left + 110, 1064);
  }

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

/** Trims text with an ellipsis so it fits a width. */
function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let trimmed = text;
  while (trimmed.length > 1 && ctx.measureText(trimmed + '…').width > maxWidth) trimmed = trimmed.slice(0, -1);
  return trimmed + '…';
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
    document.fonts.load(`500 76px ${SANS}`),
    document.fonts.load(`600 80px ${SANS}`),
    document.fonts.load(`700 150px ${SANS}`),
    document.fonts.load(`400 36px ${SANS}`),
    document.fonts.load(`400 30px ${MONO}`),
  ]);
}

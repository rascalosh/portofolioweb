import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { EXPERIENCES, HERO_DATA, PROJECTS, SKILLS } from './data/portfolio-data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  const render = async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return { fixture, root: fixture.nativeElement as HTMLElement };
  };

  it('should create the app', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('renders one h1 with the name', async () => {
    const { root } = await render();
    const headings = root.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toContain(HERO_DATA.name);
  });

  it('renders every skill, and only skills used in a project or role can be selected', async () => {
    const { root } = await render();
    const skills = root.querySelector('#skills') as HTMLElement;

    for (const skill of SKILLS) expect(skills.textContent).toContain(skill.name);
    expect([...skills.querySelectorAll('button[aria-pressed]')].some((b) => b.textContent?.trim() === 'PyTorch')).toBe(true);
    expect([...skills.querySelectorAll('button[aria-pressed]')].some((b) => b.textContent?.trim() === 'Figma')).toBe(false);
  });

  it('filters projects by category', async () => {
    const { fixture, root } = await render();
    const cards = () => root.querySelectorAll('#work article').length;
    expect(cards()).toBe(PROJECTS.length);

    const aiButton = [...root.querySelectorAll<HTMLButtonElement>('#work button')].find((b) => b.textContent?.trim() === 'AI-ML')!;
    aiButton.click();
    await fixture.whenStable();

    expect(cards()).toBe(PROJECTS.filter((p) => p.category === 'ai').length);
  });

  it('lists engineering and teaching roles before leadership roles', async () => {
    const { root } = await render();
    const ids = [...root.querySelectorAll('#experience li[id^="experience-"]')].map((li) => li.id.replace('experience-', ''));
    const kinds = ids.map((id) => EXPERIENCES.find((role) => role.id === id)!.kind);
    expect(kinds).toEqual([...kinds].sort((a, b) => (a === b ? 0 : a === 'technical' ? -1 : 1)));
  });
});

import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { HERO_DATA, SKILLS } from './data/portfolio-data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders one h1 with the name', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const headings = (fixture.nativeElement as HTMLElement).querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toContain(HERO_DATA.name);
  });

  it('renders every skill, and links only skills that appear in a project or role', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const skills = root.querySelector('#skills') as HTMLElement;

    for (const skill of SKILLS) {
      expect(skills.textContent).toContain(skill.name);
    }
    const pytorch = skills.querySelector('a[aria-label^="PyTorch"]');
    expect(pytorch?.getAttribute('href')).toBe('#project-depression-classification');
    expect(skills.querySelector('a[aria-label^="Figma"]')).toBeNull();
  });
});

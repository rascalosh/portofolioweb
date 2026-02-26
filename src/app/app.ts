import { Component, ChangeDetectionStrategy, inject, AfterViewInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/exp.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { KeyboardNavService } from './services/keyboard-nav.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    ScrollTopComponent,
  ],
  template: `
    <app-header />
    <main id="main-content">
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-exp />
      <app-contact />
    </main>
    <app-footer />
    <app-scroll-top />
  `,
})
export class App implements AfterViewInit {
  private readonly keyboardNav = inject(KeyboardNavService);

  ngAfterViewInit(): void {
    this.keyboardNav.init();
  }
}


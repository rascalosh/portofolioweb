import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TapeComponent } from './components/tape/tape.component';
import { WorkComponent } from './components/work/work.component';
import { ActiveSectionService } from './services/active-section.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    WorkComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    TapeComponent,
    BackToTopComponent,
  ],
  template: `
    <app-header />
    <main id="main-content" tabindex="-1">
      <app-hero />
      <app-tape label="Selected Work" />
      <app-work />
      <app-tape label="Skills" [tilt]="-1" />
      <app-skills />
      <app-tape label="Experience" />
      <app-experience />
      <app-tape label="Say hello" [tilt]="-1" />
      <app-contact />
    </main>
    <app-footer />
    <app-back-to-top />
  `,
})
export class App implements AfterViewInit {
  private readonly activeSection = inject(ActiveSectionService);

  ngAfterViewInit(): void {
    this.activeSection.init(['hero', 'work', 'skills', 'experience', 'contact']);
  }
}

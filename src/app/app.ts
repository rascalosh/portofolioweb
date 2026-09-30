import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
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
  ],
  template: `
    <app-header />
    <main id="main-content" tabindex="-1">
      <app-hero />
      <app-work />
      <app-skills />
      <app-experience />
      <app-contact />
    </main>
    <app-footer />
  `,
})
export class App implements AfterViewInit {
  private readonly activeSection = inject(ActiveSectionService);

  ngAfterViewInit(): void {
    this.activeSection.init(['hero', 'work', 'skills', 'experience', 'contact']);
  }
}

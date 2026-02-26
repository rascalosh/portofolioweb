import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { PROJECTS } from '../../data/portfolio-data';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'projects.html',
})
export class ProjectsComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly projects = PROJECTS;

  protected readonly bannerGradients = [
    'bg-gradient-to-r from-primary-400 to-primary-600',
    'bg-gradient-to-r from-accent-400 to-accent-500',
    'bg-gradient-to-r from-primary-500 to-accent-400',
    'bg-gradient-to-r from-accent-500 to-primary-400',
  ];
}

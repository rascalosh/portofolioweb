import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO_DATA } from '../../data/portfolio-data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'footer.html',
})
export class FooterComponent {
  protected readonly name = HERO_DATA.name;
  protected readonly year = new Date().getFullYear();
}

import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent{
  @Input() backgroundUrl: string = '';
  @Input() headingText: string = '';
  @Input() subheadingText: string = '';
  @Input() buttonText: string = '';
  @Input() buttonUrl: string = '';
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() showing = false;
  @Input() size: string; // small, medium, large
  @Input() color = 'dark'; // dark, light

  sizeClass = 'la-3x';

  constructor() { }

  ngOnInit() {
    switch (this.size) {
      case 'small':
        this.sizeClass = 'la-1x';
        break;
      case 'medium':
        this.sizeClass = 'la-2x';
        break;
      case 'large':
        break;
      default:
        break;
    }
  }

  show() {
    this.showing = true;
  }

  hide() {
    this.showing = false;
  }
}

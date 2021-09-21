import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-section-separator',
  templateUrl: './section-separator.component.html',
  styleUrls: ['./section-separator.component.css']
})
export class SectionSeparatorComponent implements OnInit {

  @Output() btnClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}

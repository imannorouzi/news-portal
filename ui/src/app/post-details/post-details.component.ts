import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CommentsComponent} from '../comments/comments.component';
import {DateService} from '../utils/date.service';
import {CommonService} from '../utils/common.service';
import {ReceptionService} from '../archive/reception/reception.service';
import {NavigationService} from '../utils/navigation.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  @ViewChild('comments', {static: true}) comments: CommentsComponent;

  @Input() post;
  constructor(public dateService: DateService,
              public commonService: CommonService,
              private navigationService: NavigationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.post && changes.event.previousValue !== changes.event.currentValue) {

    }
  }

}

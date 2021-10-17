import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CommentsComponent} from '../../comments/comments.component';
import {DateService} from '../../utils/date.service';
import {CommonService} from '../../utils/common.service';
import {NavigationService} from '../../utils/navigation.service';
import {PostSection} from '../../post-section';

@Component({
  selector: 'app-post-section',
  templateUrl: './post-section.component.html',
  styleUrls: ['./post-section.component.css']
})
export class PostSectionComponent implements OnInit {
  @ViewChild('comments', {static: true}) comments: CommentsComponent;

  @Input() postSection: PostSection;
  constructor(public dateService: DateService,
              public commonService: CommonService,
              private navigationService: NavigationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}

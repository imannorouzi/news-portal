import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CommentsComponent} from '../comments/comments.component';
import {DateService} from '../utils/date.service';
import {CommonService} from '../utils/common.service';
import {Post} from '../post';
import {PostSection} from '../post-section';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('comments', {static: true}) comments: CommentsComponent;

  @Input() post: Post;
  styles = {};

  constructor(public dateService: DateService,
              public commonService: CommonService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {
    this.post.postSections.forEach( (ps: PostSection) => {

    });
  }

}

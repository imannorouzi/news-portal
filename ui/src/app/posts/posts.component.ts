import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SpinnerComponent} from '../spinner/spinner.component';
import {MeetingItemModalComponent} from '../archive/meeting-item-modal/meeting-item-modal.component';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataService} from '../utils/data.service';
import {DateService} from '../utils/date.service';
import {AlertService} from '../alert.service';
import {MeetingService, readMethod} from '../archive/meetings/meeting.service';
import {CommonService} from '../utils/common.service';
import {of} from 'rxjs';
import {DummyData} from '../dummyData';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @ViewChild('spinner', {static: true}) spinner: SpinnerComponent;
  @ViewChild('postModal', {static: true}) postModal: MeetingItemModalComponent;

  posts = [];
  loading = false;

  selectedPost = undefined;

  noMoreForward = false;

  filter = '';
  interval;

  subscriptions: Subscription[] = [];

  constructor(private dataService: DataService,
              public dateService: DateService,
              private alertService: AlertService,
              public meetingService: MeetingService,
              public commonService: CommonService,
              private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked()  {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.subscriptions.push(
      of(DummyData.POSTS)
        .subscribe( posts => this.posts = posts)
    );
  }

  ngAfterViewInit(): void {
  }

  onPostClick(event: any) {
    this.selectedPost = event;
    this.postModal.show();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);

    this.subscriptions.forEach( sub => {
      sub.unsubscribe();
    });

    this.subscriptions = [];
  }

}

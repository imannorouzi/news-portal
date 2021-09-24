import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SpinnerComponent} from '../../spinner/spinner.component';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataService} from '../../utils/data.service';
import {DateService} from '../../utils/date.service';
import {AlertService} from '../../utils/alert.service';
import {CommonService} from '../../utils/common.service';
import {of} from 'rxjs';
import {DummyData} from '../../dummyData';
import {PostModalComponent} from '../../post-modal/post-modal.component';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements  OnInit {
  @ViewChild('spinner', {static: true}) spinner: SpinnerComponent;

  posts = [];
  loading = false;
  noMoreForward = false;

  filter = '';
  interval;

  subscriptions: Subscription[] = [];

  constructor(private dataService: DataService,
              public dateService: DateService,
              private alertService: AlertService,
              public commonService: CommonService,
              private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked()  {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.getPosts()
        .subscribe( data => {
          if (data.msg === 'OK'){
            this.posts = data.object;
          }
        },
          error => console.error(error) )
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);

    this.subscriptions.forEach( sub => {
      sub.unsubscribe();
    });

    this.subscriptions = [];
  }

}

import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SpinnerComponent} from '../../spinner/spinner.component';
import {DataService} from '../../utils/data.service';
import {DateService} from '../../utils/date.service';
import {AlertService} from '../../utils/alert.service';
import {CommonService} from '../../utils/common.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements  OnInit {
  @ViewChild('spinner', {static: true}) spinner: SpinnerComponent;

  posts = [];
  loading = true;
  loadingMore = false;
  noMoreForward = false;

  filter = '';
  interval;

  PAGE_SIZE = 15;
  page = 0;

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
    this.readPosts();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }


  readPosts() {
    this.dataService.getPosts(this.page++, this.PAGE_SIZE, null, null)
      .pipe(take(1))
      .subscribe( data => {
          if (data.msg === 'OK') {
            this.posts = [...this.posts, ...data.object];
            if ( data.object.length < this.PAGE_SIZE ) {
              this.noMoreForward = true;
            }
          } else {
            this.alertService.error('مشکلی پیش آمده. دوباره تلاش کنید.');
          }
          this.loading = false;
          this.loadingMore = false;
        },
        error => {
          console.error(error);
          this.alertService.error('مشکلی پیش آمده. دوباره تلاش کنید.');
          this.loading = false;
          this.loadingMore = false;
        });
  }

  loadMore() {
    this.loadingMore = true;
    this.readPosts();
  }

  removed(index: number) {
    this.posts.splice(index, 1);
  }
}

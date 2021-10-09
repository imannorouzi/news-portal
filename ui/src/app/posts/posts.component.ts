import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SpinnerComponent} from '../spinner/spinner.component';
import {DataService} from '../utils/data.service';
import {DateService} from '../utils/date.service';
import {AlertService} from '../utils/alert.service';
import {CommonService} from '../utils/common.service';
import {take} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @ViewChild('spinner', {static: true}) spinner: SpinnerComponent;

  posts = [];
  loading = true;
  loadingMore = false;

  PAGE_SIZE = 10;
  page = 0;

  selectedPost = undefined;

  noMoreForward = false;

  filter = '';
  interval;

  attribute = '';
  value = '';

  constructor(private dataService: DataService,
              public dateService: DateService,
              private alertService: AlertService,
              public commonService: CommonService,
              private cdRef: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngAfterViewChecked()  {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    // this.readPosts();
    /*this.router.events
      .pipe(take(1))
      .subscribe(data => {
        if (data instanceof NavigationEnd) {
          this.page = 0;
          this.loading = true;
          this.posts = [];
          this.readPosts();
        }
      });*/

    this.route.params
      .subscribe(params => {this.page = 0;
      this.page = 0;
      this.loading = true;
      this.posts = [];
      this.readPosts();
    });
    // this.readPosts();

  }

  ngAfterViewInit(): void {
  }

  onPostClick(post: any) {
    this.selectedPost = post;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  readPosts() {
    this.attribute = this.route.snapshot.paramMap.get('attribute');
    this.value = this.route.snapshot.paramMap.get('value');

    this.dataService.getPosts(this.page++, this.PAGE_SIZE, this.attribute, this.value)
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
}

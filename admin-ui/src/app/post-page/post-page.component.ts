import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../utils/data.service';
import {AlertService} from '../utils/alert.service';
import {take} from 'rxjs/operators';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../utils/navigation.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  post: Post;
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Input() postId: string;
  loading = true;

  constructor(private dataService: DataService,
              private alertService: AlertService,
              public navigationService: NavigationService,
              private route: ActivatedRoute,
              private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked()  {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.postId = this.postId ? this.postId : this.route.snapshot.paramMap.get('postId');
    this.readPost();
  }

  ngOnDestroy(): void {
  }

  readPost() {
    this.dataService.getPost(this.postId)
      .pipe(take(1))
      .subscribe( data => {
          if (data.msg === 'OK') {
            this.post = data.object;
          } else {
            this.alertService.error('مشکلی پیش آمده. دوباره تلاش کنید.');
          }
          this.loading = false;
        },
        error => {
          console.error(error);
          this.alertService.error('مشکلی پیش آمده. دوباره تلاش کنید.');
          this.loading = false;
        });
  }

  backClicked() {
    if ( this.back.observers.length > 0 ) {
      this.back.emit();
    } else {
      this.navigationService.back();
    }
  }
}

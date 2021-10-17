import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from '../utils/data.service';
import {FormBuilder,  FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {AlertService} from '../utils/alert.service';
import {AuthService} from '../utils/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit, OnChanges {

  submitted = false;
  rows = 1;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  @Input() postId = 0;
  page = 0;

  comments: any[] = [];
  loading = false;
  @Input() anonymous = false;

  text = '';
  noMoreComments = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.eventId.currentValue !== changes.eventId.previousValue) {
      this.reset();
    }
  }

  ngAfterViewInit() {
    // this.reset();
  }

  reset() {
    // this.commentForm.reset();
    this.page = 0;
    this.comments = [];


    this.readComments();
  }

  readComments(event = undefined) {
    if (event) { event.preventDefault(); }

    this.dataService.getComments(this.postId, this.page++)
      .subscribe(
        data => {
          if (data && data.msg === 'OK') {
            this.comments.push(...data.object);

            if (data.object.length < 5) {
              // No more comments
              this.noMoreComments = true;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }


  onSubmit() {
    this.submitted = true;
    this.postComment();
  }

  postComment() {


    const comment = {
      text: this.text,
      eventId: this.postId,
    };

    this.loading = true;
    this.dataService.postComment(comment).subscribe(
      value => {
        if (value && value['msg'] === 'OK') {
          this.comments.unshift(value['object']);

          this.text = '';
          this.submitted = false;
        }
        this.loading = false;

      }, error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  deleteComment(index: number) {
    this.dataService.deleteComment(this.comments[index]).subscribe(
      data => {
        if (data['msg'] === 'OK') {
          this.comments.splice(index, 1);
        } else {
          this.alertService.error('نظر شما پاک نشد. دوباره تلاش کنید.');
        }
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  ngOnInit(): void {
  }
}

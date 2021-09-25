import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../user';
import {DateService} from '../../utils/date.service';
import {CommonService} from '../../utils/common.service';
import {DataService} from '../../utils/data.service';
import {Post} from '../../post';
import {AlertService} from '../../utils/alert.service';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post-item.component.html',
  styleUrls: ['./admin-post-item.component.css']
})
export class AdminPostItemComponent implements OnInit {

  @Input() post: Post;
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() removed: EventEmitter<any> = new EventEmitter();
  user: User;

  attendeesString: string;

  constructor(public dateService: DateService,
              public commonService: CommonService,
              private dataService: DataService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  onClicked(e, event) {
    this.clicked.emit(event);
  }

  updatePostAttribute(attribute: string, value: string) {
    const obj = { attribute: attribute, value: value };
    this.dataService.updatePostAttribute( this.post.id, obj )
      .subscribe( data => {
        if (data.msg === 'OK') {
          this.alertService.success('اوکیه');
        } else {
          this.alertService.error('نشد!');
        }
      }, error => {
        console.error(error);
        this.alertService.error(error);
      });
  }

  removePost() {
    this.dataService.deletePost( this.post.id )
      .subscribe( data => {
        if (data.msg === 'OK') {
          this.alertService.success('اوکیه');
          this.removed.emit(this.post.id)
        } else {
          this.alertService.error('نشد!');
        }
      }, error => {
        console.error(error);
        this.alertService.error(error);
      });
  }
}

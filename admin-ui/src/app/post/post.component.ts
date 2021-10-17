import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {DateService} from '../utils/date.service';
import {CommonService} from '../utils/common.service';
import {DataService} from '../utils/data.service';
import {AuthService} from '../utils/auth.service';
import {Post} from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  user: User;

  attendeesString: string;

  constructor(public dateService: DateService,
              public commonService: CommonService,
              private dataService: DataService,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onClicked(e, event) {
    this.clicked.emit(event);
  }
}

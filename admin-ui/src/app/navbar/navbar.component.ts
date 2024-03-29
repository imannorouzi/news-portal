import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonService} from '../utils/common.service';
import {AuthService} from '../utils/auth.service';
import {NavigationService} from '../utils/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() theme: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  filter = '';
  constructor(public authService: AuthService,
              public commonService: CommonService,
              public navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  themeChanged(switchValue: any) {
    // 0 means light, 1 means dark

    this.commonService.themeChanged.next(switchValue === 0 ? 'light' : 'dark');
  }

  search() {
    this.navigationService.navigate('/posts/search/' + this.filter );
  }
}

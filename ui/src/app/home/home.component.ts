import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../utils/navigation.service';
import {environment} from '../../environments/environment';
import {AuthService} from '../utils/auth.service';
import {QrCodeService} from '../utils/qr-code.service';
import {DataService} from '../utils/data.service';
import {ConfirmComponent} from '../common-components/confirm/confirm.component';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {SwitchButtonComponent} from '../common-components/switch-button/switch-button.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('prompt') prompt: ConfirmComponent;
  @ViewChild('switch') switch: SwitchButtonComponent;

  loadingReception = false;
  sidebar = false;

  promptText = '';

  version: string = environment.VERSION;

  constructor(public navigationService: NavigationService,
              public authService: AuthService,
              private qrCodeService: QrCodeService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {

    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.toggleSidebar(false);
      }
    });

  }

  toggleSidebar( open ) {
    if (open === undefined) {
      this.sidebar = !this.sidebar;
    } else {
      this.sidebar = open;
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../utils/auth.service';


@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {

  public zoom: number;

  constructor(public authService: AuthService ) {
  }

  ngOnInit() {
  }

}

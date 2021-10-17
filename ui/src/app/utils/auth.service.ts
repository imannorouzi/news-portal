import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import { map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../utils/alert.service';
import {environment} from '../../environments/environment';
import {User} from '../user';
import {CommonService} from './common.service';


@Injectable()
export class AuthService {
  redirectUrl = '/';

  loggedIn: Subject<any> = new Subject<any>();
  loggedOut: Subject<any> = new Subject<any>();
  private user: User = null;

  constructor(private localStorageService: LocalStorageService,
              private http: HttpClient,
              private alertService: AlertService,
              public commonService: CommonService) {
  }

  login(user: User): void {
    if (user.imageUrl) {
      // user.imageUrl = this.commonService.getBase() + user.imageUrl;
    }
    this.user = user;
  }

  logout(): void {
    if (this.isLoggedIn()) {
      this.localStorageService.checkOut(this.userId);
    }
    this.user = null;
    this.loggedOut.next();
  }

  get jsonWebToken(): string {
    return (this.user !== null) ? this.user.token : null;
  }

  get userId(): number {
    return (this.user !== null) ? this.user.id : null;
  }

  get username(): string {
    return (this.user !== null) ? this.user.username : null;
  }

  get name(): string {
    return (this.user !== null) ? this.user.name : null;
  }

  get imageUrl(): string {
    if (this.user !== null) {
      return this.user.imageUrl ? this.user.imageUrl : 'assets/images/user-placeholder.png';
    }
  }

  public isLoggedIn(): boolean {
    return true; // this.user !== null;
  }


  getCurrentUser() {
    return this.user;
  }

}

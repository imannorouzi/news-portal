import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../utils/alert.service';
import {SpinnerService} from '../utils/spinner.service';
import {AuthService} from '../utils/auth.service';

@Injectable()
export class AfService {
  user: Observable<firebase.User>;

  userType = 'PERSONAL';

  constructor(public afAuth: AngularFireAuth,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private spinnerService: SpinnerService) {
    this.user = afAuth.authState;

    this.user.subscribe(
      u => {
        // console.log(u);

        if (!this.user || !u) { return; }

        const user = {
          type: this.userType,
          name: u.displayName,
          username: u.email,
          email: u.email,
          uid: u.uid,
          imageUrl: u.photoURL,
          phone: u.phoneNumber
        };

        this.spinnerService.changeState(true);
        this.authService.loginWithGoogle(user)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate([ this.route.snapshot.queryParams['returnUrl'] || '/posts']);
              this.spinnerService.changeState(false);
              this.logout();
            },
            error => {
              this.spinnerService.changeState(false);
              this.alertService.error('مشکلی پیش آمده. دوباره تلاش کنید.');
            });

      }, error => {
        console.log(error);
      }
    );
  }

  loginWithGoogle(userType) {
    this.userType = userType;

    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

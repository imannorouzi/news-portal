import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from '../../utils/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  alerts: any = [];
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      const al = {message: message};
      this.alerts.push(al);

      setTimeout( () => {
        this.alerts.splice(0, 1);
      }, 4000);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

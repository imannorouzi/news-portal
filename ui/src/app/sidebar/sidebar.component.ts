import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../utils/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public navigationService: NavigationService) { }

  ngOnInit(): void {
  }

}

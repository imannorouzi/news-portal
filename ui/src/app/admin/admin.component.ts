import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminPostsComponent} from './admin-posts/admin-posts.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild( 'adminPostsComponent', { static: true }) adminPostsComponent: AdminPostsComponent;

  status = 'ALL';
  type = 'ALL';

  constructor() { }

  ngOnInit(): void {
  }


  getPosts() {
    this.adminPostsComponent.page = 0;
    this.adminPostsComponent.posts = [];
    this.adminPostsComponent.loading = true;
    this.adminPostsComponent.readPosts( this.status, this.type );
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../post';
import {take} from 'rxjs/operators';
import {DataService} from '../../utils/data.service';

@Component({
  selector: 'app-posts-by-writer',
  templateUrl: './posts-by-writer.component.html',
  styleUrls: ['./posts-by-writer.component.css']
})
export class PostsByWriterComponent implements OnInit {

  @Input() name = '';

  posts: Post[] = [];
  page = 0;
  PAGE_SIZE = 5;
  noMoreForward = false;
  loading = true;

  constructor( private dataService: DataService) { }

  ngOnInit(): void {
    this.readPosts();
  }

  readPosts() {
    this.dataService.getPosts(this.page++, this.PAGE_SIZE, 'author', 'کاوه آهنگر')
      .pipe(take(1))
      .subscribe( data => {
          if (data.msg === 'OK') {
            this.posts = [...this.posts, ...data.object];
            if ( data.object.length < this.PAGE_SIZE ) {
              this.noMoreForward = true;
            }
          }
          this.loading = false;
        },
        error => {
          console.error(error);
          this.loading = false;
        });
  }
  loadMore() {
    this.readPosts();
  }

}

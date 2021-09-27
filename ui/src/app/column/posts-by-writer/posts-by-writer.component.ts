import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Post} from '../../post';
import {take} from 'rxjs/operators';
import {DataService} from '../../utils/data.service';
import {PostModalComponent} from "../../post-modal/post-modal.component";

@Component({
  selector: 'app-posts-by-writer',
  templateUrl: './posts-by-writer.component.html',
  styleUrls: ['./posts-by-writer.component.css']
})
export class PostsByWriterComponent implements OnInit {
  @ViewChild('postModal', {static: true}) postModal: PostModalComponent;

  @Input() name = '';

  selectedPost: Post;

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

  postSelected(post: Post) {
    this.selectedPost = post;
    this.postModal.show();
  }
}

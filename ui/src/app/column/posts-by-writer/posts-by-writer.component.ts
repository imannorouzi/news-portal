import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../post";
import {DummyData} from "../../dummyData";

@Component({
  selector: 'app-posts-by-writer',
  templateUrl: './posts-by-writer.component.html',
  styleUrls: ['./posts-by-writer.component.css']
})
export class PostsByWriterComponent implements OnInit {

  @Input() name = '';

  posts: Post[];
  constructor() { }

  ngOnInit(): void {
    this.posts = DummyData.POSTS;
  }

}

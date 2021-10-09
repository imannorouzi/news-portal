import { Component, OnInit } from '@angular/core';
import {Tag} from '../../tag';
import {DataService} from '../../utils/data.service';

@Component({
  selector: 'app-create-tags',
  templateUrl: './create-tags.component.html',
  styleUrls: ['./create-tags.component.css']
})
export class CreateTagsComponent implements OnInit {

  tags: Tag[] = [];
  loadedTags: Tag[] = [];
  tag = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTags()
      .subscribe( tags => {
        if ( tags.msg === 'OK' ) {
          this.loadedTags = tags.object;
        }
      }, error => console.error(error));
  }

  insertTag() {
    if ( this.tag === '' || !this.tag) {
      return;
    }
    this.tags.push(new Tag(this.tag.split(' ').join('_')));
    this.tag = '';
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  addTag(tag: any) {
    this.tags.push(tag);
  }

  getTags() {
    return this.tags;
  }

  getTagsString() {
    let ret = '';
    this.tags.forEach( t => {
      ret += '#' + t.name + ' ';
    });
    return ret;
  }
}

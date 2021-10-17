import {Component, Input, OnInit} from '@angular/core';
import {AudioService} from '../audio-player/audio.service';
import {DateService} from '../utils/date.service';
import {Post} from '../post';
import {take} from 'rxjs/operators';
import {DataService} from '../utils/data.service';

@Component({
  selector: 'app-audio-posts',
  templateUrl: './audio-posts.component.html',
  styleUrls: ['./audio-posts.component.css']
})
export class AudioPostsComponent implements OnInit {

  posts: Post[] = [];
  page = 0;
  PAGE_SIZE = 5;
  noMoreForward = false;
  loading = true;

  playingUrl = 'no-url';
  playingIndex = -1;

  constructor( public audioService: AudioService,
               private dataService: DataService,
               public dateService: DateService) { }

  ngOnInit(): void {
    this.readPosts();
  }

  readPosts(): void {
    this.dataService.getPosts(this.page++, this.PAGE_SIZE, 'type', 'AUDIO')
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
  voiceClicked(post: Post, index: number) {
    const audio = post.postSections.find( ps => ps.type = 'AUDIO');
    if ( audio && audio.audios && audio.audios.length > 0 ) {
      this.audioService.playAudioSubject.next(audio.audios[0]);
      this.playingUrl = audio.audios[0].url;
      this.playingIndex = index;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {Post} from '../../post';
import {DummyData} from '../../dummyData';
import {AudioService} from "../../audio-player/audio.service";
import {DateService} from "../../utils/date.service";

@Component({
  selector: 'app-voice-news',
  templateUrl: './voice-news.component.html',
  styleUrls: ['./voice-news.component.css']
})
export class VoiceNewsComponent implements OnInit {

  posts: Post[];

  constructor( private audioService: AudioService,
               public dateService: DateService) { }

  ngOnInit(): void {
    this.posts = DummyData.POSTS;
  }

  onEnded($event: string) {
  }

  voiceClicked() {
    this.audioService.playAudio.next('assets/files/audios/bubble.mp3');
  }
}

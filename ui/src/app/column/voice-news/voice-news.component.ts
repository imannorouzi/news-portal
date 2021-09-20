import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';


@Component({
  selector: 'app-voice-news',
  templateUrl: './voice-news.component.html',
  styleUrls: ['./voice-news.component.css']
})
export class VoiceNewsComponent implements OnInit {

  constructor() { }

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;

// Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: 'assets/files/audio/1.mp3',
      artist: 'Audio One Artist',
      duration: 20
    },
  ];

  ngOnInit(): void {
  }

  onEnded($event: string) {

  }
}

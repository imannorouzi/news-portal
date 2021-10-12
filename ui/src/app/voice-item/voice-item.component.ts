import {Component, Input, OnInit} from '@angular/core';
import {AudioService} from '../audio-player/audio.service';
import {DateService} from '../utils/date.service';
import {AudioFile} from '../audio-file';

@Component({
  selector: 'app-voice-item',
  templateUrl: './voice-item.component.html',
  styleUrls: ['./voice-item.component.css']
})
export class VoiceItemComponent implements OnInit {

  @Input() audio: AudioFile;

  constructor( public audioService: AudioService,
               public dateService: DateService) { }

  ngOnInit(): void {
  }

  onEnded($event: string) {
  }

  voiceClicked() {
    this.audioService.playAudio(this.audio);
  }
}

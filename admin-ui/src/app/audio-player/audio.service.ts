import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AudioFile} from '../audio-file';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  url;
  // sends the url
  playAudioSubject: Subject<AudioFile> = new Subject<AudioFile>();

  playAudio(audio: AudioFile) {
    this.playAudioSubject.next(audio);
  }
  constructor() { }
}

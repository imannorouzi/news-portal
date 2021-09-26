import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  url;
  // sends the url
  playAudioSubject: Subject<string> = new Subject<string>();

  playAudio(url) {
    this.playAudioSubject.next(url);
  }
  constructor() { }
}

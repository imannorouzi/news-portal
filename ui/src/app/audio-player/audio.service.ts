import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  url = '';

  // sends the url
  playAudio: Subject<string> = new Subject<string>();
  constructor() { }
}

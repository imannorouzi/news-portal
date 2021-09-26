import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, HostListener} from '@angular/core';
import {AudioService} from './audio.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @Output() trackLengthEmitter: EventEmitter<any> = new EventEmitter();
  constructor( private audioService: AudioService) { }

  bars = new Array(255);
  analyser;
  audioDataArray;
  audio: HTMLAudioElement;
  trackLength = 0;
  trackLengthString = '';

  show = false;
  url = '';

  ngOnInit(): void {
    // this.audioElement.nativeElement.play();

    this.audioService.playAudioSubject
      .subscribe( url => {
        if ( this.isPlaying() ) {
          if (  url !== this.url ) {
            // new file has been played
            this.pause();
            this.loadAudio(url);
            this.audioService.url = url;
            this.url = url;
          } else {
            this.audioService.url = '';
            this.pause();
          }
        } else {
          if ( url === this.url ) {
            this.start();
            this.audioService.url = url;
            this.url = url;
          } else {
            this.pause();
            this.loadAudio(url);
            this.audioService.url = url;
            this.url = url;
          }
        }
        this.show = true;
      });
  }

  loadAudio(url): void {
    const context = new AudioContext();
    this.analyser = context.createAnalyser();
    this.audioDataArray = new Uint8Array(255);
    this.audio = new Audio();

    // requestAnimationFrame(this.render.bind(this));
    requestAnimationFrame(() => {
      this.render();
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.trackLength = this.audio.duration;
      this.trackLengthEmitter.emit(this.audio.duration);
      this.trackLengthString = this.timeToString(this.trackLength);
    });

    // Make a this.audios node
    this.audio.loop = false;
    this.audio.autoplay = false;
    // this.audios.crossOrigin = "anonymous";

    // call `handleCanplay` when it music can be played
    this.audio.addEventListener('canplay', () => {
      const source = context.createMediaElementSource(this.audio);
      source.connect(this.analyser);
      this.analyser.connect(context.destination);

      this.start();
    });
    this.audio.src = url;
    // this.audios.src = URL.createObjectURL(file);
    this.audio.load();
  }

  start(): void {
    if ( !this.isPlaying() ) {
      this.audio.play();
      this.audioService.url = this.url;
    }
  }

  render(): void {
    // get the current audios data
    this.analyser.getByteFrequencyData(this.audioDataArray);
    requestAnimationFrame( () => this.render());
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        break;

      case 'ArrowLeft':
        break;

      case 'ArrowRight':
        break;
    }
  }

  getBarStyle(i: number): any {
    const height = this.audioDataArray && i < this.audioDataArray.length ?
      Math.floor(this.audioDataArray[i] / 6)  : 1;
    return {
      height: height + 'px',
      marginBottom: ( height / -2) + 'px'
    };
  }

  pause(): void {
    if ( this.audio ) {
      this.audio.pause();
      this.audioService.url = '';
    }
  }

  isPlaying(): boolean {
    return this.audio && !this.audio.paused;
  }

  getCurrentTime(): number {
    return this.audio ? Math.floor(this.audio.currentTime) : 0;
  }

  get timeString(): string {
    return this.timeToString(this.getCurrentTime());
  }

  timeToString(time: number): string {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor(time / 60);
    const second = Math.floor( time % 60 );
    return (hour > 0 ? hour + ':' : '') +
      (minute > 9 ? '' + minute + ':' : '0' + minute + ':') +
      (second > 9 ? '' + second : '0' + second );
  }

  setCurrentTime(time: number): void {
    if (this.audio) { this.audio.currentTime = time; }
  }

  toggle() {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.start();
    }
  }

  hide() {
    this.pause();
    this.show = false;
  }

  timeChanged($event) {
    console.log($event.target.value);
    this.setCurrentTime($event.target.value);
  }
}

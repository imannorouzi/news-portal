import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @Output() trackLengthEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }

  bars = new Array(255);
  analyser;
  audioDataArray;
  audio: HTMLAudioElement;
  trackLength = 0;

  ngOnInit(): void {
    // this.audioElement.nativeElement.play();
    this.loadAudio('assets/files/audio/1.mp3');
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
    });

    // Make a this.audio node
    this.audio.loop = true;
    this.audio.autoplay = false;
    // this.audio.crossOrigin = "anonymous";

    // call `handleCanplay` when it music can be played
    this.audio.addEventListener('canplay', () => {
      const source = context.createMediaElementSource(this.audio);
      source.connect(this.analyser);
      this.analyser.connect(context.destination);
    });
    this.audio.src = url;
    // this.audio.src = URL.createObjectURL(file);
    this.audio.load();
  }

  start(): void {
    this.audio.play();
  }

  render(): void {
    // get the current audio data
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
    return {
      height: (this.audioDataArray && i < this.audioDataArray.length ?
        Math.floor(this.audioDataArray[i] / 6)  : 1) + 'px'
    };
  }

  pause(): void {
    this.audio.pause();
  }

  isPlaying(): boolean {
    return this.audio && !this.audio.paused;
  }

  getCurrentTime(): number {
    return this.audio ? Math.floor(this.audio.currentTime) : 0;
  }

  getTimeString(): string {
    const date = new Date(null);
    date.setSeconds(this.getCurrentTime()); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
  }

  setCurrentTime(time: number): void {
    if (this.audio) { this.audio.currentTime = time; }
  }
}

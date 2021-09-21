export class PostSection {
  type = ''; // IMAGE, FILE, VIDEO, AUDIO
  imageUrl: './assets/images/home/1.png';
  text: '';
  style: any = {};

  constructor(type: string = '') {
    this.type = type;
  }
}

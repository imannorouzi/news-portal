export class PostSection{
  type: string = ''; //IMAGE, FILE, VIDEO, AUDIO
  data: any = {
    imageUrl: './assets/images/home/1.png',
    text:''
  };
  style: any = {};

  constructor(type: string = '') {
    this.type = type;
  }
}

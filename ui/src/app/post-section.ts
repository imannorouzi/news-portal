export class PostSection {
  id = -1;
  postId = -1;
  type = 'TEXT'; // TEXT, IMAGE, FILE, VIDEO, AUDIO
  imageUrl: './assets/images/home/1.png';
  text: '<p>Hello</p>';
  style: any = {};
  status = '';
  file = '';
  filename = '';

  constructor(type: string = 'TEXT') {
    this.type = type;
  }
}

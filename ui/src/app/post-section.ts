export class PostSection {
  id = -1;
  postId = -1;
  type = 'TEXT'; // TEXT, IMAGE, FILE, VIDEO, AUDIO
  fileUrl: '';
  text: '<p>Hello</p>';
  style: any = {};
  status = '';
  file = '';
  filename = '';

  constructor(type: string = 'TEXT') {
    this.type = type;
  }
}

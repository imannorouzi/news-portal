export class Post {
  id = -1;
  title = '';
  content = '';
  link = '';
  excerpt = '';
  status = '';
  type = '';
  imageUrl = '';
  created = new Date();
  tags: string[] = [];
  style = 1;
  author = '';

  constructor(
    id: number = 0,
    title: string = '',
    excerpt: string = '',
    content: string = '',
    status: string = '',
    type: string = '',
    imageUrl: string = '',
    created: Date = new Date(),
    tags: string[] = ['برچسب'],
    style: number = 1,
    author:string = '') {

    this.id = id;
    this.title = title;
    this.content = content;
    this.excerpt = excerpt;
    this.status = status;
    this.type = type;
    this.imageUrl = imageUrl;
    this.created = created;
    this.tags = tags;
    this.style = style;
    this.author = author;
  }
}

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

  constructor(
    id: number = 0,
    title: string = '',
    excerpt: string = '',
    content: string = '',
    status: string = '',
    type: string = '',
    imageUrl: string = '',
    created: Date = new Date(),
    tags: string[] = ['برچسب']) {

    this.id = id;
    this.title = title;
    this.content = content;
    this.excerpt = excerpt;
    this.status = status;
    this.type = type;
    this.imageUrl = imageUrl;
    this.created = created;
    this.tags = tags;
  }
}

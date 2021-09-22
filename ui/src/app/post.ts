import {PostSection} from './post-section';

export class Post {
  id = -1;
  title = '';
  link = '';
  excerpt = '';
  status = '';
  type = '';
  imageUrl = '';
  created = new Date();
  tags: string[] = [];
  style = 1;
  author = '';
  categories: string[] = [];
  postSections: PostSection[] = [];
  image = '';
  filename = '';

  constructor(
    id: number = 0,
    title: string = '',
    excerpt: string = '',
    status: string = '',
    type: string = '',
    imageUrl: string = '',
    created: Date = new Date(),
    tags: string[] = ['برچسب'],
    style: number = 1,
    author: string = '',
    categories: string[] = [],
    postSections: PostSection[] = [],
    image: string = '',
    filename: string = '') {

    this.id = id;
    this.title = title;
    this.excerpt = excerpt;
    this.status = status;
    this.type = type;
    this.imageUrl = imageUrl;
    this.created = created;
    this.tags = tags;
    this.style = style;
    this.author = author;
    this.categories = categories;
    this.postSections = postSections;
    this.image = image;
    this.filename = filename;
  }
}

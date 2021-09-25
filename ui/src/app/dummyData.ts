import {Post} from './post';
import {Category} from "./category";

export class DummyData {

  static POSTS: Post[] = [
    {
      id: 1,
      title: 'در مورد افغانستان',
      excerpt: 'کاوه آهنگر ضرورت یعنی ” وحدت امکان و واقعیت ” هگل وقایع افغانستان هنوز برای ناظرین و به ویژه روشنفکران و از جمله روشنفکران جناح چپ جای تعجب دارد که چگونه حکومتی با پشتوانه مالی و نظامی، ارتشی با سیصد هزار سرباز و بیش از صد میلیارد دلار اسلحه، یک شبه فروریخت .. این سردرگمی',
      link: '',
      status: 'published',
      type: 'خبر',
      imageUrl: '../assets/images/dummy/thumbnail.jpg',
      created: new Date(),
      tags: [],
      style: '1',
      author: 'کاوه آهنگر',
      categories: [new Category()],
      postSections: [],
      image: '',
      filename: ''
    }, {
      id: 1,
      title: 'در حمایت از مبارزات زنان شجاع و جوانان دلیر افغانستان',
      excerpt: 'گسترده تر باد همبستگی و مقاومت مدنی مردم ایران و افغانستان علیه تحجر طالبانی واگذاری سرنوشت مردم افغانستان از سوی آمریکا و دولت دست نشانده اش به ریاست اشرف غنی به طالبان تاریک اندیش و ضد زن، یک فاجعه تمام عیار در منطقه خاورمیانه و آسیای مرکزی است. به دنبال تسلط این مرتجعان ضد بشر',
      link: '',
      status: 'published',
      type: 'خبر',
      imageUrl: '../assets/images/dummy/thumbnail.jpg',
      created: new Date(),
      tags: [],
      style: '2',
      author: 'کاوه آهنگر',
      categories: [new Category()],
      postSections: [],
      image: '',
      filename: ''
    }, {
      id: 1,
      title: 'نه به جمهوری اسلامی هم استراتژی هم تاکتیک!',
      excerpt: '(نقدی بر سیاستهای ما در انقلاب بهمن ۵۷) ۱- پیش گفتار: در کنار انقلاب مشروطیت، ” انقلاب بهمن” یکی از مهمترین رویدادهای اجتماعی- سیاسی قرن بیستم در ایران و منطقه بود که سیمای جغرافیای سیاسی منطقۀ خاورمیانه را دگرگون کرد. این انقلاب جنبش اجتماعی عظیمی بود که اکثریت مردم کشور ما را، از قشرها و ',
      link: '',
      status: 'published',
      type: 'خبر',
      imageUrl: '../assets/images/dummy/thumbnail.jpg',
      created: new Date(),
      tags: [],
      style: '2',
      author: 'کاوه آهنگر',
      categories: [new Category()],
      postSections: [],
      image: '',
      filename: ''
    }, {
      id: 1,
      title: 'اقتصاد سیاسی کشتار ۶۷ – راه کار سوسیالیستی',
      excerpt: 'فهم وجه اقتصاد سیاسی کشتار ۶۷ چندان دشوار نیست. در کنار حذف پست نخست‌وزیری، برای «میدان داده شدن به ایده‌ی جدید تجارت آزاد» می‌بایست باقی‌مانده‌ی نیروهای چپ در زندان به عنوان موانع احتمالی دربرابر پیشروی ایده‌ی جدید حذف شوند. آنان کسانی هستند که در دو مؤلفه با یکدیگر اشتراک دارند: ۱) خواهان برانداختن جمهوری اسلامی',
      link: '',
      status: 'published',
      type: 'خبر',
      imageUrl: '../assets/images/dummy/contact-1.png',
      created: new Date(),
      tags: [],
      style: '2',
      author: 'کاوه آهنگر',
      categories: [new Category()],
      postSections: [],
      image: '',
      filename: ''
    },
  ];

  static USER: any = {
    id: 1,
    username: 'demouser',
    password: '123456',
    name: 'Demo User',
    latitude: 25.25857,
    longitude: -99.68371,
    phone: '091211112321',
    farsiAddress1: 'تهران خیابان اول',
    imageUrl: '../assets/images/dummy/contact-3.png',
    farsiAddress2: '',
    description: 'یک انسان بسیار پاکیزه',
    role: 'owner'
  };

  static COMMENTS: any[] = [
    {
      userImageUrl: '../assets/images/dummy/contact-7.png',
      text: 'واقعا این کار بیخودیه که هی میای اینجا رو چک میکنی و میبینی که خبری نیست و هی برمیگردی دوباره',
      userName: 'گاوچرون'
    },
    {
      userImageUrl: '../assets/images/dummy/contact-6.png',
      text: 'من یکی از بزرگترین آرزوهام اینه که یه روزی گاوچرون بشم :)',
      userName: 'خرچرون'
    }
  ];

}


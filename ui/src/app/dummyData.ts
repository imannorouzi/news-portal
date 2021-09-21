import {Venue} from './archive/venue';
import {Post} from './post';

export class DummyData {

  static POSTS: Post[] = [
    {
      id: 1,
      title: 'در مورد افغانستان',
      content: 'کاوه آهنگر ضرورت یعنی ” وحدت امکان و واقعیت ” هگل وقایع افغانستان هنوز برای ناظرین و به ویژه روشنفکران و از جمله روشنفکران جناح چپ جای تعجب دارد که چگونه حکومتی با پشتوانه مالی و نظامی، ارتشی با سیصد هزار سرباز و بیش از صد میلیارد دلار اسلحه، یک شبه فروریخت .. این سردرگمی',
      excerpt: 'کاوه آهنگر ضرورت یعنی ” وحدت امکان و واقعیت ” هگل وقایع افغانستان هنوز برای ناظرین و به ویژه روشنفکران و از جمله روشنفکران جناح چپ جای تعجب دارد که چگونه حکومتی با پشتوانه مالی و نظامی، ارتشی با سیصد هزار سرباز و بیش از صد میلیارد دلار اسلحه، یک شبه فروریخت .. این سردرگمی',
      link: '',
      status: 'published',
      type: 'خبر',
      imageUrl: '../assets/images/dummy/thumbnail.jpg',
      created: new Date(),
      tags: ['برچسب'],
      style: 1,
      author: 'کاوه آهنگر',
      categories: ['خبر', 'تحلیل', 'فلسفه']
    }, {
      id: 1,
      title: 'در حمایت از مبارزات زنان شجاع و جوانان دلیر افغانستان',
      content: 'گسترده تر باد همبستگی و مقاومت مدنی مردم ایران و افغانستان علیه تحجر طالبانی واگذاری سرنوشت مردم افغانستان از سوی آمریکا و دولت دست نشانده اش به ریاست اشرف غنی به طالبان تاریک اندیش و ضد زن، یک فاجعه تمام عیار در منطقه خاورمیانه و آسیای مرکزی است. به دنبال تسلط این مرتجعان ضد بشر',
      excerpt: 'گسترده تر باد همبستگی و مقاومت مدنی مردم ایران و افغانستان علیه تحجر طالبانی واگذاری سرنوشت مردم افغانستان از سوی آمریکا و دولت دست نشانده اش به ریاست اشرف غنی به طالبان تاریک اندیش و ضد زن، یک فاجعه تمام عیار در منطقه خاورمیانه و آسیای مرکزی است. به دنبال تسلط این مرتجعان ضد بشر',
      link: '',
      status: 'published',
      type: 'خبر',
      imageUrl: '../assets/images/dummy/thumbnail.jpg',
      created: new Date(),
      tags: ['برچسب', 'افغانستان', 'طالبان'],
      style: 2,
      author: 'کاوه آهنگر',
      categories: ['خبر', 'تحلیل', 'فلسفه']
    }, {
      id: 1,
      title: 'نه به جمهوری اسلامی هم استراتژی هم تاکتیک!',
      content: '(نقدی بر سیاستهای ما در انقلاب بهمن ۵۷) ۱- پیش گفتار: در کنار انقلاب مشروطیت، ” انقلاب بهمن” یکی از مهمترین رویدادهای اجتماعی- سیاسی قرن بیستم در ایران و منطقه بود که سیمای جغرافیای سیاسی منطقۀ خاورمیانه را دگرگون کرد. این انقلاب جنبش اجتماعی عظیمی بود که اکثریت مردم کشور ما را، از قشرها و ',
      excerpt: '(نقدی بر سیاستهای ما در انقلاب بهمن ۵۷) ۱- پیش گفتار: در کنار انقلاب مشروطیت، ” انقلاب بهمن” یکی از مهمترین رویدادهای اجتماعی- سیاسی قرن بیستم در ایران و منطقه بود که سیمای جغرافیای سیاسی منطقۀ خاورمیانه را دگرگون کرد. این انقلاب جنبش اجتماعی عظیمی بود که اکثریت مردم کشور ما را، از قشرها و ',
      link: '',
      status: 'published',
      type: 'خبر',
      imageUrl: '../assets/images/dummy/thumbnail.jpg',
      created: new Date(),
      tags: ['برچسب'],
      style: 2,
      author: 'کاوه آهنگر',
      categories: ['خبر', 'تحلیل', 'فلسفه']
    }, {
      id: 1,
      title: 'اقتصاد سیاسی کشتار ۶۷ – راه کار سوسیالیستی',
      excerpt: 'فهم وجه اقتصاد سیاسی کشتار ۶۷ چندان دشوار نیست. در کنار حذف پست نخست‌وزیری، برای «میدان داده شدن به ایده‌ی جدید تجارت آزاد» می‌بایست باقی‌مانده‌ی نیروهای چپ در زندان به عنوان موانع احتمالی دربرابر پیشروی ایده‌ی جدید حذف شوند. آنان کسانی هستند که در دو مؤلفه با یکدیگر اشتراک دارند: ۱) خواهان برانداختن جمهوری اسلامی',
      content: 'فهم وجه اقتصاد سیاسی کشتار ۶۷ چندان دشوار نیست. در کنار حذف پست نخست‌وزیری، برای «میدان داده شدن به ایده‌ی جدید تجارت آزاد» می‌بایست باقی‌مانده‌ی نیروهای چپ در زندان به عنوان موانع احتمالی دربرابر پیشروی ایده‌ی جدید حذف شوند. آنان کسانی هستند که در دو مؤلفه با یکدیگر اشتراک دارند: ۱) خواهان برانداختن جمهوری اسلامی',
      link: '',
      status: 'published',
      type: 'خبر',
      imageUrl: '../assets/images/dummy/contact-1.png',
      created: new Date(),
      tags: ['برچسب'],
      style: 2,
      author: 'کاوه آهنگر',
      categories: ['خبر', 'تحلیل', 'فلسفه']
    },
  ];

  static MEETINGS: any[] = [
    {
      pointedDate:
        {
          startTime: '0900',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0930',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'پویان',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-1.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'عطیه',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-2.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'مصاحبه',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'DONE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '0930',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0930',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'قادر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-2.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'اکبر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-3.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'امیرارسلان',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-6.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'بررسی مسائل خاورمیانه',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'DONE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1100',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0900',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'مراد',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-3.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'تبلیغ اپلیکیشن شالاپ',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'GOING_ON',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1315',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0900',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'محدثه‌ سادات حسینی',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-4.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'مراسم شعرخوانی',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'CANCELLED',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1530',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'کاوه آهنگر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-5.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'توضیح مسئله‌ی الیناسیون',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'LATE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'یاور کی‌مرام',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-5.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'قمار',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'GETTING_LATE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1610',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'جعفر کفن‌پوش',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-7.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'ملیله دوزی',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'TO_BE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '0930',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0930',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'قادر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-2.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'اکبر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-3.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'امیرارسلان',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-6.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'بررسی مسائل خاورمیانه',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'DONE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1100',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0900',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'مراد',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-3.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'تبلیغ اپلیکیشن شالاپ',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'GOING_ON',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1315',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0900',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'محدثه‌ سادات حسینی',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-4.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'مراسم شعرخوانی',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'CANCELLED',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1530',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'کاوه آهنگر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-5.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'توضیح مسئله‌ی الیناسیون',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'LATE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'یاور کی‌مرام',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-5.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'قمار',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'GETTING_LATE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1610',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'جعفر کفن‌پوش',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-7.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'ملیله دوزی',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'TO_BE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '0900',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0930',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'پویان',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-1.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'عطیه',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-2.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'مصاحبه',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'DONE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '0930',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0930',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'قادر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-2.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'اکبر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-3.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'امیرارسلان',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-6.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'بررسی مسائل خاورمیانه',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'DONE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1100',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0900',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'مراد',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-3.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'تبلیغ اپلیکیشن شالاپ',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'GOING_ON',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1315',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '0900',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'محدثه‌ سادات حسینی',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-4.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'مراسم شعرخوانی',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'CANCELLED',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1530',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'کاوه آهنگر',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-5.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'توضیح مسئله‌ی الیناسیون',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'LATE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'یاور کی‌مرام',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-5.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'قمار',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'GETTING_LATE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    },
    {
      pointedDate:
        {
          startTime: '1610',
          endTime: '1030',
          date: new Date()
        },
      dates: [
        {
          startTime: '1500',
          endTime: '1030',
          date: new Date()
        }
      ],
      attendees: [
        {
          name: 'جعفر کفن‌پوش',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-7.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      title: 'ملیله دوزی',
      venue: new Venue(),
      chairId: -1,
      welcomeMessage: 'این هم سلام سلامتی',
      eventType: 'MEETING',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'TO_BE',
      chair: {
        name: 'آقای خوش‌بروخورد',
        phone: '009',
        imageUrl: '../assets/images/dummy/contact-5.png',
        id: 100,
        email: 'khoshkholgh@gmail.com',
      }
    }
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

  static CONTACTS: any[] = [
    {
      id: 1,
      name: 'قلی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'owner'
    },
    {
      id: 1,
      name: 'ممد جوشقانی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'reception'
    },
    {
      id: 1,
      name: 'داریوش اقبالی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-6.png',
      contactType: 'employee',
      role: 'user'
    },
    {
      id: 1,
      name: 'محمد توللی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-5.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'پرویز یاحقی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-2.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'گوینده روشنک',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-3.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'قلی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'owner'
    },
    {
      id: 1,
      name: 'ممد جوشقانی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'reception'
    },
    {
      id: 1,
      name: 'داریوش اقبالی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-6.png',
      contactType: 'employee',
      role: 'user'
    },
    {
      id: 1,
      name: 'محمد توللی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-5.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'پرویز یاحقی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-2.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'قلی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'owner'
    },
    {
      id: 1,
      name: 'ممد جوشقانی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'reception'
    },
    {
      id: 1,
      name: 'داریوش اقبالی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-6.png',
      contactType: 'employee',
      role: 'user'
    },
    {
      id: 1,
      name: 'محمد توللی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-5.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'پرویز یاحقی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-2.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'گوینده روشنک',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-3.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'قلی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'owner'
    },
    {
      id: 1,
      name: 'ممد جوشقانی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'reception'
    },
    {
      id: 1,
      name: 'داریوش اقبالی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-6.png',
      contactType: 'employee',
      role: 'user'
    },
    {
      id: 1,
      name: 'محمد توللی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-5.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'پرویز یاحقی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-2.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'قلی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'owner'
    },
    {
      id: 1,
      name: 'ممد جوشقانی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'reception'
    },
    {
      id: 1,
      name: 'داریوش اقبالی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-6.png',
      contactType: 'employee',
      role: 'user'
    },
    {
      id: 1,
      name: 'محمد توللی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-5.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'پرویز یاحقی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-2.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'گوینده روشنک',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-3.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'قلی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'owner'
    },
    {
      id: 1,
      name: 'ممد جوشقانی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-1.png',
      contactType: 'employee',
      role: 'reception'
    },
    {
      id: 1,
      name: 'داریوش اقبالی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-6.png',
      contactType: 'employee',
      role: 'user'
    },
    {
      id: 1,
      name: 'محمد توللی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-5.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'پرویز یاحقی',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-2.png',
      contactType: 'contact'
    },
    {
      id: 1,
      name: 'گوینده روشنک',
      phone: '09090909090',
      email: 'contact@gmail.com',
      address: 'فلکه دوم جیرفت، در سومی نرسیده به ۱۷ کیلومتری جنب بانک',
      imageUrl: '../assets/images/dummy/contact-3.png',
      contactType: 'contact'
    },
  ];

  static VENUES: any[] = [
    {
      id: 1,
      title : 'محل ملاقات آدم‌های معمولی',
      latitude : 18.5793,
      longitude : 73.8143,
      farsiAddress1: 'تهران، خیابان اول، در آبیه',
      farsiAddress2: ''
    }, {
      id: 1,
      title : 'محل ملاقات آدم‌های مهم',
      latitude : 18.5793,
      longitude : 73.8143,
      farsiAddress1: 'تهران، خیابان اول، در زرده',
      farsiAddress2: ''
    }, {
      id: 1,
      title : 'محل ملاقات آدم‌های خیلی مهم',
      latitude : 18.5793,
      longitude : 73.8143,
      farsiAddress1: 'تهران، خیابان اول، در قرمزه',
      farsiAddress2: ''
    },
  ];

  static TOKENS: any[] = [
    {
      fromDate: new Date(),
      toDate: new Date(),
      attendees: [
        {
          name: 'پویان',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-1.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
        {
          name: 'عطیه',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-2.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        }
      ],
      venue: new Venue(),
      chairId: -1,
      eventType: 'TOKEN',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'VALID',
      oneTime: true
    },
    {
      fromDate: new Date(),
      toDate: new Date(),
      attendees: [
        {
          name: 'پویان',
          email: 'ati@gmail.com',
          phone: '',
          imageUrl: '../assets/images/dummy/contact-1.png',
          image: File,
          id: 2,
          fileName: '',
          type: 'contact'
        },
      ],
      venue: new Venue(),
      chairId: -1,
      eventType: 'TOKEN',
      contactEvents: [{
        contactId: 1,
        status: ''
      }],
      status: 'EXPIRED',
      oneTime: false
    },
    ];
}


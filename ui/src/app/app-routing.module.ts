import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './utils/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ConditionsComponent} from './conditions/conditions.component';
import {FaqComponent} from './faq/faq.component';
import {PostsComponent} from './posts/posts.component';
import {PostPageComponent} from './post-page/post-page.component';
import {PostResolver} from './post.resolver';
import {PostsResolver} from './posts.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full', resolve: { pageData: PostsResolver  } },
  { path: 'posts/:attribute/:value', component: PostsComponent, resolve: { pageData: PostsResolver  }},
  { path: 'posts', component: PostsComponent, resolve: { pageData: PostsResolver  }},
  { path: 'post/:postId', component: PostPageComponent, resolve: { pageData: PostResolver  }},
  { path: 'about-us', component: AboutUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'conditions', component: ConditionsComponent },
  { path: 'contact-us', component: ContactUsComponent },

  { path: 'login', component: LoginComponent },

  // otherwise redirect to "Not Found!"
  { path: '**', component: PageNotFoundComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalComponent } from './common-components/ng-modal/modal.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor} from './error-interceptor.service';
import { JwtInterceptor} from './jwt-interceptor.service';
import { UserService} from './utils/user.service';
import { AlertService} from './utils/alert.service';
import { AuthGuard} from './utils/auth-guard.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { TimeComponent } from './common-components/time/time.component';
import {DateService} from './utils/date.service';
import { CommentsComponent } from './comments/comments.component';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment.prod';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import {AfService} from './providers/af.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ConfirmComponent } from './common-components/confirm/confirm.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FaqComponent } from './faq/faq.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { IconedInputComponent } from './common-components/iconed-input/iconed-input.component';
import { SwitchButtonComponent } from './common-components/switch-button/switch-button.component';
import {ClickOutsideDirective} from './utils/click-outside.directive';
import {AuthService} from './utils/auth.service';
import {LocalStorageService} from './utils/local-storage.service';
import {GlobalDataService} from './utils/global-data.service';
import { SlidingTextComponent } from './sliding-text/sliding-text.component';
import {GeneralPipe, KeysPipe, SanitizeHtmlPipe} from './utils/general-pipe';
import {OverlaySpinnerComponent} from './common-components/overlay-spinner/overlay.spinner.component';
import {ContentModalComponent} from './common-components/content-modal/content-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { ProfileNavbarComponent } from './profile-navbar/profile-navbar.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ColumnComponent } from './column/column.component';
import { PostsByWriterComponent } from './column/posts-by-writer/posts-by-writer.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { ChartComponent } from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import {CreatePostSectionComponent} from './admin/create-post-section/create-post-section.component';
import {CreateArticleComponent} from './admin/create-article/create-article.component';
import { AdminComponent } from './admin/admin.component';
import {AlertComponent} from './common-components/alert/alert.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {SectionSeparatorComponent} from './common-components/section-separator/section-separator.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { CreateTagsComponent } from './admin/create-tags/create-tags.component';
import {CreateCategoriesComponent} from './admin/create-categories/create-categories.component';
import {PostSectionComponent} from './post-details/post-section/post-section.component';
import { PostPageComponent } from './post-page/post-page.component';
import {AdminPostItemComponent} from './admin/admin-post-item/admin-post-item.component';
import {VoiceItemComponent} from './voice-item/voice-item.component';
import {VoicePostComponent} from './voice-post/voice-post.component';
import {InstagramPostComponent} from "./admin/instagram-post/instagram-post.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    // ImageCropperComponent,
    ModalComponent,
    LoginComponent,
    SpinnerComponent,
    ClickOutsideDirective,
    TimeComponent,
    CommentsComponent,
    FooterComponent,
    ContactUsComponent,
    ConfirmComponent,
    PageNotFoundComponent,
    FaqComponent,
    ConditionsComponent,
    AboutUsComponent,
    IconedInputComponent,
    SwitchButtonComponent,
    SlidingTextComponent,
    GeneralPipe,
    KeysPipe,
    OverlaySpinnerComponent,
    ContentModalComponent,
    ProfileNavbarComponent,
    FloatingButtonComponent,
    PostsComponent,
    PostComponent,
    PostModalComponent,
    PostDetailsComponent,
    ColumnComponent,
    PostsByWriterComponent,
    VoiceItemComponent,
    AudioPlayerComponent,
    ChartComponent,
    CreatePostSectionComponent,
    CreateArticleComponent,
    AdminComponent,
    AlertComponent,
    SectionSeparatorComponent,
    AdminPostsComponent,
    CreateTagsComponent,
    CreateCategoriesComponent,
    PostSectionComponent,
    PostPageComponent,
    AdminPostItemComponent,
    VoiceItemComponent,
    VoicePostComponent,
    InstagramPostComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDXNa76E7XTVYsZR5Q0qeOpE9LyFanBnGc',
      libraries: ['places']
    }),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ModalModule.forRoot(),
    ChartsModule,
    ColorPickerModule,
    HttpClientModule,
    CKEditorModule
  ],
  exports: [
  ],
  providers: [
    AfService,
    HttpClientModule,
    AuthGuard,
    AlertService,
    UserService,
    DateService,
    AuthService,
    LocalStorageService,
    GlobalDataService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

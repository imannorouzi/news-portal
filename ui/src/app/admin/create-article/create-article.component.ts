import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {DataService} from '../../utils/data.service';
// import {CropperSettings, ImageCropperComponent} from "ngx-img-cropper";
// import {ModalComponent} from "../common-components/ng-modal/modal.component";
import {Post} from '../../post';
import {PostSection} from '../../post-section';
import {AuthService} from '../../utils/auth.service';
import {ModalComponent} from '../../common-components/ng-modal/modal.component';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {CommonService} from '../../utils/common.service';
import {AlertService} from '../../utils/alert.service';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';
import {CreateTagsComponent} from '../create-tags/create-tags.component';
import {CreateCategoriesComponent} from '../create-categories/create-categories.component';
import {NavigationService} from '../../utils/navigation.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  @ViewChild('cropper', {static: false}) cropper: ImageCropperComponent;
  @ViewChild('imageCropperModal', {static: false}) imageCropperModal: ModalComponent;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;
  @ViewChild('tags', {static: true}) tags: CreateTagsComponent;
  @ViewChild('categories', {static: true}) categories: CreateCategoriesComponent;

  @Output() postAdded: EventEmitter<any> = new EventEmitter<any>();

  imageChangedEvent: any = '';

  /*data: any = {};
  cropperSettings: CropperSettings;*/
  // public Editor = DecoupledEditor;
  public message: string;
  post: Post = new Post();

  image = '';
  imageUrl = '';
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private commonService: CommonService,
    private navigationService: NavigationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private http: HttpClient) {
  }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('postId');
    if ( postId ) {
      this.dataService.getPost( postId )
        .pipe(take(1))
        .subscribe( data => {
          if ( data.msg === 'OK' ) {
            data.object.postSections.forEach( ps => {
              if ( !ps.style ) {
                ps.style = [];
              }
            });
            this.post = data.object;
          }
        });
    } else {
      this.post.postSections.push(new PostSection());
    }
  }

  postArticle() {
    this.dataService.addPost(this.post).subscribe((data: any) => {
        console.log('everything OK', data);
      },
      (error: any) => {
        console.error('error happened', error);
      });
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'تنها فرمت عکس مورد پذیرش است.';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.post.imageUrl = <string> reader.result;
    };
  }

  fileChanged($event) {
    const file = $event.target.files[0];
    if (file) {
      this.imageCropperModal.show();
      this.imageChangedEvent = $event;
      this.post.filename = file.name;
    }
  }

  onImageClick() {
    /*if(this.data1.image)
      this.imageCropperModal.show();
    else*/
    this.fileInput.nativeElement.click();
  }

  onImageCropperModalOk() {
    this.post.image = this.image;
    this.post.imageUrl = this.imageUrl;
    this.imageCropperModal.hide();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64;
    this.imageUrl = event.base64;
  }

  categoryClicked(message: string) {
    console.log(message);
  }

  addSection(index: number) {
    this.post.postSections.splice(index, 0, new PostSection());
  }

  removeSection(index: number) {
    if (this.post.postSections.length > 1) {
      this.post.postSections.splice(index, 1);
    }
  }

  copySection(index: number) {
    const copyPostSection = Object.assign({}, this.post.postSections[index]);
    copyPostSection.text = Object.assign({}, this.post.postSections[index].text);
    copyPostSection.fileUrl = Object.assign({}, this.post.postSections[index].fileUrl);
    copyPostSection.style = Object.assign({}, this.post.postSections[index].style);
    this.post.postSections.splice(index, 0, copyPostSection);
  }

  updatePost(status) {
    // if (!this.validateForm()) { return; }

    this.post['userId'] = this.authService.userId;
    this.post['categories'] = this.categories.getCategories();
    this.post['tags'] = this.tags.getTags();
    this.post['status'] = status;

    this.dataService.updatePost(this.post)
      .pipe(
        map(data => data),
        switchMap(
          (value) => {
            if (value.msg === 'OK') {
              return of(value.object.id);
            }
            return of(-1);
          }
        )
      )
      .subscribe(
        (postId: any) => {
          this.uploadPostSections(postId).then( () => {
            console.log('Uploaded');
            this.postAdded.emit(postId);
            this.alertService.success('ایجاد شد دوستم.');
            this.navigationService.navigate('/admin');
          });
        },
        (error: any) => {
          console.log(error);
          // this.spinner.hide();
          this.alertService.error(error.toString());
        });
  }

  loadImageFailed() {
    // show message
    console.log('failed');
  }

  public async uploadPostSections(postId) {
    // set upload progress as 0 for all files

    for (let i = 0; i < this.post.postSections.length && this.post.postSections[i].status !== 'removed'; ++i) {
      try {
        this.post.postSections[i].postId = postId;
        await this.dataService.updatePostSection( this.post.postSections[i]);
      } catch (error) {
        // This is to update file status
        console.error('Failed to upload post-section-' + (i));
        throw error;
      }
    }
  }

  uploadAll() {

    this.http.get('./assets/bbc_postmeta.json')
      .subscribe( (data: any) => {
        const posts = data.data;
        for ( let i = 0; i < posts.length; i++ ) {
          const post = new Post();
          post.excerpt = posts[i].meta_value;
          post.title = posts[i].post_title;
          post.type = 'ARTICLE';
          post.style = '2';
          post.imageUrl = posts[i].guid;
          post.status = 'PUBLISH';

          const postSection = new PostSection();
          postSection.text = posts[i].post_content;
          postSection.type = 'TEXT';

          post.postSections = [ postSection ];
          this.post = post;
          this.updatePost('PUBLISH');
        }
      }, error => console.error(error));
  }
}

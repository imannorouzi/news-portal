import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {DataService} from '../utils/data.service';
// import {CropperSettings, ImageCropperComponent} from "ngx-img-cropper";
// import {ModalComponent} from "../common-components/ng-modal/modal.component";
import {Post} from '../post';
import {PostSection} from '../post-section';
import {AuthService} from '../utils/auth.service';
import {ModalComponent} from '../common-components/ng-modal/modal.component';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {CommonService} from '../utils/common.service';
import {AlertService} from '../utils/alert.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  @ViewChild('cropper', {static: false}) cropper: ImageCropperComponent;
  @ViewChild('imageCropperModal', {static: false}) imageCropperModal: ModalComponent;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  @Output() postAdded: EventEmitter<any> = new EventEmitter<any>();

  imageChangedEvent: any = '';

  model = {
    editorData: '<p>Hello, world!</p>'
  };

  /*data: any = {};
  cropperSettings: CropperSettings;*/
  // public Editor = DecoupledEditor;
  public message: string;
  post: Post = new Post();

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private commonService: CommonService,
  private alertService: AlertService) {
  }

  ngOnInit() {
    this.post.postSections.push(new PostSection());
  }

  editorReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  onFileChanged(event: Event) {

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
    this.imageCropperModal.hide();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.post.image = event.base64;
    this.post.imageUrl = event.base64;
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
    copyPostSection.imageUrl = Object.assign({}, this.post.postSections[index].imageUrl);
    copyPostSection.style = Object.assign({}, this.post.postSections[index].style);
    this.post.postSections.splice(index, 0, copyPostSection);
  }

  updatePost() {


    // if (!this.validateForm()) { return; }

    this.post['userId'] = this.authService.userId;

    this.dataService.updatePost(this.post).subscribe(
      (value: any) => {
        if (value.msg === 'OK') {
          if (value.object.imageUrl && this.commonService.getBase()) {
            value.object.imageUrl = this.commonService.getBase() + value.object.imageUrl;
          }
          this.postAdded.emit(value.object);
        } else if (value.msg === 'CONTACT_EXISTS') {
          this.alertService.warn('مخاطبی با این ایمیل قبلا ثبت شده است.');
        } else if (value.msg === 'USER_EXISTS') {
          this.alertService.warn('همکاری با این ایمیل ثبت شده است.');
        }
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
}

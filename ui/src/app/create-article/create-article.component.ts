import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {DataService} from '../utils/data.service';
// import {CropperSettings, ImageCropperComponent} from "ngx-img-cropper";
// import {ModalComponent} from "../common-components/ng-modal/modal.component";
import {Post} from '../post';
import {PostSection} from '../post-section';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  /*  @ViewChild('modal', {static: false}) modal: ContentModalComponent*/
  // @ViewChild('cropper', {static: false}) cropper:ImageCropperComponent;
  // @ViewChild('imageCropperModal', {static: false}) imageCropperModal:ModalComponent;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  model = {
    editorData: '<p>Hello, world!</p>'
  };

  /*data: any = {};
  cropperSettings: CropperSettings;*/
  // public Editor = DecoupledEditor;
  public message: string;
  post: Post = new Post();

  constructor( private dataService: DataService) {
    /*this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 600;
    this.cropperSettings.height = 300;

    this.cropperSettings.croppedWidth = 600;
    this.cropperSettings.croppedHeight = 300;

    this.cropperSettings.canvasWidth = 470;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = true;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;*/
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
      // this.imageCropperModal.show();
      // this.cropper.fileChangeListener($event);
      // this.post.imageUrl = file.name;
    }
  }

  onImageClick() {
    /*if(this.data1.image)
      this.imageCropperModal.show();
    else*/
    this.fileInput.nativeElement.click();
  }

  onImageCropperModalOk() {
    // this.imageCropperModal.hide();
    // this.post.imageUrl = this.data.image;
    // this.user.imageUrl = this.data1.image;
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
    copyPostSection.data = Object.assign({}, this.post.postSections[index].data);
    copyPostSection.style = Object.assign({}, this.post.postSections[index].style);
    this.post.postSections.splice(index, 0, copyPostSection);
  }
}

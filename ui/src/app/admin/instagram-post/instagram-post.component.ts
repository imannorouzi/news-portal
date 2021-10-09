import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as htmlToImage from 'html-to-image';


import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {CKEditor5} from '@ckeditor/ckeditor5-angular/ckeditor';
import {ModalComponent} from '../../common-components/ng-modal/modal.component';

@Component({
  selector: 'app-instagram-post',
  templateUrl: './instagram-post.component.html',
  styleUrls: ['./instagram-post.component.css']
})
export class InstagramPostComponent implements OnInit {

  @ViewChild('imageCropperModal', {static: false}) imageCropperModal: ModalComponent;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  public message: string;
  @Input() imageUrl = '';
  data: any = {};
  title = '';
  text = '';
  fontSize = 20;

  // public Editor = ClassicEditor;
  public Editor = DecoupledEditor;

  constructor() {
  }


  ngOnInit(): void {
  }


  preview(files): void {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'تنها فرمت عکس مورد پذیرش است.';
      return;
    }
  }

  onImageCropperModalOk(): void {
    this.imageCropperModal.hide();
    this.imageUrl = this.data.image;
    // this.user.imageUrl = this.data1.image;
  }

  download(): void {
    const node = document.getElementById('capture');

    htmlToImage.toPng(node)
      .then( (dataUrl) => {
        const link = document.createElement('a');
        link.download = 'ax.png';
        link.href = dataUrl;
        link.click();
      })
      .catch( (error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  adjustTextArea(textArea: HTMLElement): void {
    textArea.style.height = '';
    textArea.style.height = (textArea.style as any).scrollHeight + 'px';
  }

  public onReady( editor ): void {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }
}




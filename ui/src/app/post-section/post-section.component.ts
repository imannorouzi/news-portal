import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../utils/data.service';
import {PostSection} from '../post-section';

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {CKEditor5} from '@ckeditor/ckeditor5-angular/ckeditor';

@Component({
  selector: 'app-post-section',
  templateUrl: './post-section.component.html',
  styleUrls: ['./post-section.component.css']
})
export class PostSectionComponent implements OnInit, AfterViewInit {
  constructor(private dataService: DataService) { }

  borderDropDownOpened = false;
  @Input() postSection: PostSection = new PostSection('TEXT');
  @Output() removeClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() copyClicked: EventEmitter<any> = new EventEmitter<any>();


  public Editor = DecoupledEditor;

  config: CKEditor5.Config =
    {
      toolbar: {
        items: [
          'heading', '|',
          'fontfamily', 'fontsize', '|',
          'alignment', '|',
          'fontColor', 'fontBackgroundColor', '|',
          'bold', 'italic', 'strikethrough', 'underline', '|',
          'link', '|',
          'outdent', 'indent', '|',
          'bulletedList', 'numberedList', '|',
          'insertTable', '|',
          'uploadImage', 'blockQuote', '|',
          'undo', 'redo'
        ],
      }
    };


  ngOnInit() {
  }

  borderChanged(borderWidth, event: MouseEvent) {
    this.postSection.style.borderWidth = borderWidth;
    this.borderDropDownOpened = false;
    event.stopPropagation();
  }

  clickOutside(inside: boolean ) {
    this.borderDropDownOpened = inside;
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );

    editor.plugins.get ('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, this.dataService);
    };
  }

  ngAfterViewInit(): void {
    /*  DecoupledEditor
        .create( document.querySelector( '#editor' ), {
          language: 'es'
        } )
        .then( editor => {
          const toolbarContainer = document.querySelector( '#toolbar-container' );

          toolbarContainer.appendChild( editor.ui.view.toolbar.element );
        } )
        .catch( error => {
          console.error( error );
        } );*/
  }
}

class UploadAdapter {
  loader;

  constructor( loader,
               private dataService: DataService) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file
      .then( file => new Promise( ( resolve, reject ) => {

        console.log(file);
        this.dataService.uploadFile(file)
          .subscribe( (data: any) => {
              console.log(data);
              resolve( {
                default: data.msg === 'OK' ? data.object : '/assets/images/home/1.png'
              } );
            },
            error => {
              console.error(error);
            });
      }));
  }

  // Aborts the upload process.
  abort() {

  }

}


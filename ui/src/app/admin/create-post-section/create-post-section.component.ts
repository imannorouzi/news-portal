import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from '../../utils/data.service';
import {PostSection} from '../../post-section';

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {CKEditor5} from '@ckeditor/ckeditor5-angular/ckeditor';

@Component({
  selector: 'app-create-post-section',
  templateUrl: './create-post-section.component.html',
  styleUrls: ['./create-post-section.component.css']
})
export class CreatePostSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('audioElement', {static: false}) audioElement: ElementRef;
  constructor(private dataService: DataService) { }

  borderDropDownOpened = false;
  @Input() postSection: PostSection = new PostSection('TEXT');
  @Output() removeClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() copyClicked: EventEmitter<any> = new EventEmitter<any>();

  audios: any[] = [];

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

  audioFileChanged($event) {
    const file = $event.target.files[0];
    if (file) {
      this.audios.push({
        name: file.name,
        file: file
      });
      setTimeout ( () => {
        const audioEle = (<HTMLAudioElement>document.getElementById('audio-' + ( this.audios.length - 1 ) ));
        audioEle.src = URL.createObjectURL(file);
        audioEle.load();
      }, 100);

      /*$event.target.innerHTML = '';
      this.audioElement.nativeElement.src = URL.createObjectURL(file);
      this.audioElement.nativeElement.load();*/
    }
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


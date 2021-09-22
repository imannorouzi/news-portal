import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../utils/data.service';
import {PostSection} from '../post-section';
import {AngularEditorConfig} from '@kolkov/angular-editor';


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

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: '/uploadFile/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
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
          });
      }));
  }

  // Aborts the upload process.
  abort() {

  }

}

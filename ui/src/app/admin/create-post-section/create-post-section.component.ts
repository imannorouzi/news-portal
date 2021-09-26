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
      this.postSection.audios.push({
        filename: file.name,
        file: file,
        status: 'DRAFT',
        id: -1,
        postSectionId: -1,
        url: '',
        title: ''
      });
      setTimeout ( () => {
        const audioEle = (<HTMLAudioElement>document.getElementById('audio-' + ( this.postSection.audios.length - 1 ) ));
        audioEle.src = URL.createObjectURL(file);
        audioEle.load();
      }, 100);

      /*$event.target.innerHTML = '';
      this.audioElement.nativeElement.src = URL.createObjectURL(file);
      this.audioElement.nativeElement.load();*/
    }
  }

  async uploadAudioFiles() {
    // set upload progress as 0 for all files

    for (let i = 0; i < this.postSection.audios.length; ++i) {
      try {
        await (this.dataService.uploadFile(this.postSection.audios[i].file))
          .subscribe( url => {
            if ( url.msg === 'OK' ) {
              this.postSection.audios[i].url = url.object;
              this.postSection.audios[i].status = 'UPLOADED';
            } else {
              this.postSection.audios[i].status = 'FAILED';
            }
            console.log(url);
          } );
      } catch (error) {
        // This is to update file status
        console.error('Failed to upload post-section-audio-' + (i));
        this.postSection.audios[i].status = 'FAILED';
        throw error;
      }
    }
  }

  remove(index: number) {
    this.postSection.audios.splice(index, 1);
  }

  move(from: number, upDown: number) {
    if ( ( from === 0 && upDown === -1 ) ||
      ( from === this.postSection.audios.length && upDown === 1 ) ) {
      return;
    }
    const audio = this.postSection.audios.splice(from, 1)[0];
    // insert stored item into position `to`
    this.postSection.audios.splice(from + upDown, 0, audio);
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


import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-modal',
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.css']
})
export class ContentModalComponent implements OnInit, OnDestroy {

  @ViewChild('searchModal') rootModal;
  @ViewChild('closeButton') closeButton;
  @ViewChild('scrollPane') scrollPane: ElementRef;
  @ViewChild('inputField') inputField;

  @Input() modalTitle = '';
  @Input() size = ' lg ';
  @Input() expand = false;
  @Input() maximizable = false;
  @Input() zIndex = 10;
  @Input() width = 10;
  @Output() onShown: EventEmitter<any> = new EventEmitter();
  @Output() onHidden: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  show() {
      return this.rootModal.show();
  }

  hide() {
    return this.rootModal.hide();
  }

  @HostListener('document:keydown', ['$postSection'])
  keyboardInput(e: KeyboardEvent) {
    if (this.rootModal.isShown) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.rootModal.hide();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  onHide(event) {
    this.onHidden.emit(event);
    // This is added to fix a bug, backdrop is not removed when modal is closed
    // this.removeElements( document.querySelectorAll(".modal-backdrop") );
  }

  removeElements = (elms) => elms.forEach(el => el.remove());

  onShow($event: ModalDirective) {
    this.onShown.emit($event);
  }

  ngOnDestroy(): void {
    // this.removeElements( document.querySelectorAll(".modal-backdrop") );
  }
}

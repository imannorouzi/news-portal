import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalComponent} from '../common-components/ng-modal/modal.component';
import {ReceptionService} from '../archive/reception/reception.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnInit {
  @ViewChild('childModal', {static: true}) public childModal: ModalComponent;
  @Input() post: any;

  constructor(private receptionService: ReceptionService) {
  }


  ngOnInit() {
    this.receptionService.receptionItemClick
      .subscribe( () => {
        this.hide();
      });
  }

  show() {
    this.childModal.show();
  }

  hide() {
    this.childModal.hide();
  }

}

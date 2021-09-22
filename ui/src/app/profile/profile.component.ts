import {Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../common-components/ng-modal/modal.component';
import {DataService} from '../utils/data.service';
import {SpinnerComponent} from '../spinner/spinner.component';
import {AlertService} from '../utils/alert.service';
import {User} from '../user';
import {MapsAPILoader} from '@agm/core';
import {AuthService} from '../utils/auth.service';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('cropper', {static: true}) cropper: ImageCropperComponent;
  @ViewChild('imageCropperModal', {static: true}) imageCropperModal: ModalComponent;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;
  @ViewChild('spinner', {static: true}) spinner: SpinnerComponent;
  @ViewChild('searchBox', {static: true}) searchInput: ElementRef;


  @Output() onContactAdded: EventEmitter<any> = new EventEmitter();

  user: User;
  submitted = false;


  imageChangedEvent: any = '';

  public zoom: number;

  constructor(private dataService: DataService,
              private alertService: AlertService,
              private authService: AuthService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, ) {
  }

  ngOnInit() {
    this.user = Object.assign({}, this.authService.getCurrentUser());

    this.zoom = 12;


  }


  fileChanged($event) {
    const file = $event.target.files[0];
    if (file) {
      this.imageCropperModal.show();
      this.imageChangedEvent = $event;
      this.user.fileName = file.name;
    }

    // $post.target.value = '';
  }

  imageCropped(event: ImageCroppedEvent) {
    this.user.imageUrl = event.base64;
    this.user.image = event.base64;
  }
  loadImageFailed() {
    // show message
    console.log('failed');
  }

  onImageClick() {
    /*if(this.data1.image)
      this.imageCropperModal.show();
    else*/
    this.fileInput.nativeElement.click();
  }

  private validateForm() {
    return true;
  }

  updateUser() {

    this.submitted = true;
    if (!this.validateForm()) { return; }

    this.user.farsiAddress1 = this.searchInput.nativeElement.value;

    this.dataService.updateUser(this.user).subscribe(
      (data: any) => {
        if (data && data.msg === 'OK') {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          data.object.token = this.authService.getCurrentUser().token;
          this.authService.login(data.object);

          this.alertService.success('تغییرات ذخیره شد.');
        } else {
          this.alertService.error('لطفا دوباره تلاش کنید.');
        }
      },
      (error: any) => {
        console.log(error);
        this.alertService.error(error.toString());
      });
  }

  onImageCropperModalOk() {
    this.imageCropperModal.hide();
  }

}

import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../user';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {catchError, map} from 'rxjs/operators';
import {Post} from '../post';
import {PostSection} from '../post-section';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  get jwtHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.jsonWebToken
    });
  }

  private extractData(res: Response) {
    const retVal =  (<any>res).data || (<any>res).entity || (<any>res).object;

    return retVal ? JSON.parse(retVal) : null;

  }

  private handleError(error: Response | any) {
    const message = error.error || error || '';
    return throwError(message);
  }
  getTokens(date: Date):  Observable<any> {
    const apiURL = environment.baseUrl + '/get-tokens';
    return this.http.get(apiURL, {
      params: {date: date.toUTCString()}
    }).pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getUsers( hint: string = ''):  Observable<any> {
    const apiURL = environment.baseUrl + '/get-users';
    return this.http.get(apiURL, {
      params: {hint: hint}
    }).pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User) {
    const apiURL = environment.baseUrl + '/update-user';

    const formData: FormData = new FormData();
    if (user.image ) {
      formData.append('file', this.dataURItoBlob(user.image), user.fileName);
      user.image = null;
      formData.append('filename', user.fileName);
    }

    formData.append('user', JSON.stringify(user));

    const hdrs = new HttpHeaders();
    hdrs.append('Content-Type', 'multipart/form-data');
    hdrs.append('Accept', 'application/json');
    return this.http.post(`${apiURL}`, formData, {headers: hdrs})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getComments(eventId, page):  Observable<any> {
    const apiURL = environment.baseUrl + '/get-comments/' + eventId + '/' + page;
    return this.http.get(apiURL, {}).pipe(map(this.extractData))
      .pipe(catchError(this.handleError));

  }
  getCommentsGuest(eventId, page, uuid):  Observable<any> {
    // It is a guest user
    const apiURL = environment.baseUrl + '/get-comments-guest';
    return this.http.get(apiURL, {
      params: {event_id: eventId, page: page, uuid: uuid}
    });
  }

  deleteComment(comment: any) {
    const apiURL = environment.baseUrl + '/delete-comment';
    const headers = new HttpHeaders({
      'Content-Type': 'text/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${apiURL}`, comment.id, {headers: headers})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  postComment(comment: any) {
    let apiURL;
    const headers = new HttpHeaders({
    });
    if (comment.uuid) {
      apiURL = environment.baseUrl + '/create-comment-guest';
      return this.http.post(`${apiURL}`, JSON.stringify(comment), {headers: headers}).pipe(map(this.extractData))
        .pipe(catchError(this.handleError));
    } else {
      apiURL = environment.baseUrl + '/create-comment';
      return this.http.post(`${apiURL}`, JSON.stringify(comment), {headers: headers}).pipe(map(this.extractData))
        .pipe(catchError(this.handleError));
    }


  }

  contactUs(message: { name: any; email: any; title: any; message: any }) {
    const apiURL = environment.baseUrl + '/contact-us';

    const headers = new HttpHeaders({
      'Content-Type': 'text/json',
      'Accept': 'application/json'
    });

    return this.http.post(`${apiURL}`, JSON.stringify(message), {headers: headers})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  addPost(post: Post): Observable<Post> {
    const apiURL = environment.baseUrl + '/new-post';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${apiURL}`, post, {headers: headers})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getPosts(page: number, pageLimit: number, attribute: string, value: string, status = 'PUBLISH'): Observable<any> {
    const url =  environment.baseUrl + '/get-posts/';
    return this.http.get(url, {
        params: {
          page: page.toString(),
          size: pageLimit.toString(),
          attribute: attribute,
          value: value,
          status: status,
        }
      })
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getPost(postId: string): Observable<any> {
    const url = environment.baseUrl + '/get-post/' + postId;
    return this.http.get(url)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  copyArticle(copyUrl: string): Observable<any> {
    const url = environment.baseUrl + '/copy-article/';
    return this.http.get(url, {
      params: {
        url: copyUrl
      }
    })
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  uploadFile(file: File) {
    const apiURL = environment.baseUrl + '/upload-file';

    const formData: FormData = new FormData();
    if (file) {
      formData.append('file', (file), file.name);
      formData.append('filename', file.name);
    } else {
      formData.append('file', null);
      formData.append('filename', '');
    }
    const hdrs = new HttpHeaders();
    hdrs.append('Content-Type', 'multipart/form-data');
    hdrs.append('Accept', 'application/json');
    return this.http.post(`${apiURL}`, formData, {headers: hdrs})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  updatePost(con: any) {
    const apiURL = environment.baseUrl + '/update-post';

    const contact = Object.assign({}, con);
    const formData: FormData = new FormData();
    if (contact.image ) {
      formData.append('file', this.dataURItoBlob(contact.image), contact.fileName);
      formData.append('filename', contact.filename);
      contact.image = null;
      contact.imageUrl = null;
    } else {
      formData.append('file', null);
      formData.append('filename', '');
    }

    formData.append('post', JSON.stringify(contact));

    const hdrs = new HttpHeaders();
    hdrs.append('Content-Type', 'multipart/form-data');
    hdrs.append('Accept', 'application/json');
    return this.http.post(`${apiURL}`, formData, {headers: hdrs})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  updatePostAttribute(postId: number, postAttribute: any) {
    const apiURL = environment.baseUrl + '/update-post-attribute/' + postId;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${apiURL}`, postAttribute, {headers: headers})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  updatePostSection(ps: PostSection): Promise<any> {
    const apiURL = environment.baseUrl + '/update-post-section';

    const postSection = Object.assign({}, ps);
    const formData: FormData = new FormData();

    return new Promise((resolve, reject) => {

      if (postSection.file ) {
        formData.append('file', this.dataURItoBlob(postSection.file), postSection.filename);
        formData.append('filename', postSection.filename);
        postSection.file = null;
      } else {
        formData.append('file', null);
        formData.append('filename', '');
      }

      formData.append('postSection', JSON.stringify(postSection));

      const hdrs = new HttpHeaders();
      hdrs.append('Content-Type', 'multipart/form-data');
      hdrs.append('Accept', 'application/json');
      return this.http.post(`${apiURL}`, formData, {headers: hdrs})
        .pipe(map(this.extractData))
        .pipe(catchError(this.handleError))
        .subscribe( () => {
          resolve();
        });
    });
  }

  getTags() {
    const url = environment.baseUrl + '/get-tags';
    return this.http.get(url)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getCategories() {
    const url = environment.baseUrl + '/get-categories';
    return this.http.get(url)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

}

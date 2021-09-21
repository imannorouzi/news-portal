import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../user';
import {environment} from '../../environments/environment';
import {Venue} from '../archive/venue';
import {AuthService} from './auth.service';
import {catchError, map} from 'rxjs/operators';
import {Post} from '../post';

const serverUrl = environment.serverUrl;


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
    const apiURL = serverUrl + '/get-tokens';
    return this.http.get(apiURL, {
      params: {date: date.toUTCString()}
    }).pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getUsers( hint: string = ''):  Observable<any> {
    const apiURL = serverUrl + '/get-users';
    return this.http.get(apiURL, {
      params: {hint: hint}
    }).pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User) {
    const apiURL = serverUrl + '/update-user';

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
      const apiURL = serverUrl + '/get-comments/' + eventId + '/' + page;
      return this.http.get(apiURL, {}).pipe(map(this.extractData))
        .pipe(catchError(this.handleError));

  }
  getCommentsGuest(eventId, page, uuid):  Observable<any> {
      // It is a guest user
      const apiURL = serverUrl + '/get-comments-guest';
      return this.http.get(apiURL, {
        params: {event_id: eventId, page: page, uuid: uuid}
      });
  }

  deleteComment(comment: any) {
    const apiURL = serverUrl + '/delete-comment';
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
      apiURL = serverUrl + '/create-comment-guest';
      return this.http.post(`${apiURL}`, JSON.stringify(comment), {headers: headers}).pipe(map(this.extractData))
        .pipe(catchError(this.handleError));
    } else {
      apiURL = serverUrl + '/create-comment';
      return this.http.post(`${apiURL}`, JSON.stringify(comment), {headers: headers}).pipe(map(this.extractData))
        .pipe(catchError(this.handleError));
    }


  }

  contactUs(message: { name: any; email: any; title: any; message: any }) {
    const apiURL = serverUrl + '/contact-us';

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
    const apiURL = serverUrl + '/new-post';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${apiURL}`, post, {headers: headers})
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getPost(id: string): Observable<any> {
    const url = '/assets/data/post.json';
    // const url = '/api/' + id;
    // const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getPosts(): Observable<any> {
    const url = '/assets/data/post.json';
    return this.http.get(url)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  uploadFile(file: File) {
    const apiURL = serverUrl + '/uploadFile';

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

}

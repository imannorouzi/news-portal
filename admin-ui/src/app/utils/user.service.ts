import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User} from '../user';
import {environment} from '../../environments/environment.prod';


@Injectable()
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(environment.baseUrl + '/users');
  }

  getById(id: number) {
    return this.http.get(environment.baseUrl + '/users' + id);
  }



  update(user: User) {
    return this.http.put(environment.baseUrl + '/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(environment.baseUrl + '/users/' + id);
  }
}

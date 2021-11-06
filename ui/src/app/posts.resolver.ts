import { Injectable } from '@angular/core';
import {Post} from './post';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {take} from "rxjs/operators";
import {DataService} from "./utils/data.service";

interface IReturn {
  records: Post[];
  dynamicTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<IReturn> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReturn> {
    const attribute = route.params['attribute'];
    const value = route.params['value'];
    return this.dataService.getPosts(0, 15, attribute ? attribute : null, value ? value : null);
  }
}

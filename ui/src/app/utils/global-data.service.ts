import {Injectable, OnDestroy, OnInit} from '@angular/core';

@Injectable()
export class GlobalDataService implements OnInit, OnDestroy {
  // cachedData: Observable<any>;

  private cleanUpKeys = new Set();
  private realTimeKeys = new Set();
  private data: any = {};

  cleanUp() {

    this.cleanUpKeys.forEach( (k: string) => {
      this.deleteData(k);
    });

    this.cleanUpKeys.clear();
  }

  getData(key: string = undefined) {
    if (!key) {
      // return it all
      return this.data;
    }
    return this.data[key];
  }

  hasData(key: string) {
    return key in this.data;
  }

  deleteData(key: string) {
    if (key in this.data) {
      delete this.data[key];
    }
  }

  /*
  * key is the key!
  * obj is what should be saved
  * cleanUp is used for temporary saved data, like filters in edit fault page which should be cleared after coming to main page
  * realtime is for the data which get obsoleted after some time, so they shouldn't be stored in storage session
  **/
  putData(key: string, obj: any, cleanUp: boolean = false, realTime = false) {
    // The key is component name
    if (key) {

      if (cleanUp) {
        this.cleanUpKeys.add(key);
      }

      if (realTime) {
        this.realTimeKeys.add(key);
      }

      // Should update the object based on the inner objects coz
      // different elements are coming from different sources
      // means we could have ( {k1: v1}, component ) and ( {k2, v2), component )
      // which both k1, k2 should be stored for component

      if (this.data[key]) {
        for (const k in obj) {
          if (obj.hasOwnProperty(k)) {
            this.data[key][k] = obj[k];
          }
        }
      } else {
        this.data[key] = obj;
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  reset(userId = 'ro'): void {
    this.data = {};
    this.cleanUpKeys = new Set();
    this.realTimeKeys = new Set();

    // Maybe not needed
    this.saveToLocalStorage(userId);
  }

  public saveToLocalStorage(userId = 'ro') {

      this.realTimeKeys.forEach( (k: string) => {
        this.deleteData(k);
      });

      if (this.data) {
        localStorage.setItem('global-data-' + userId, JSON.stringify(this.data));
      }
  }

  public loadFromLocalStorage(userId = 'ro') {
    const d = localStorage.getItem('global-data-' + userId);
    if (d) {
      this.data = JSON.parse(d);
    }
  }

}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  _loadingMap: { [key: string]: boolean } = {};
  private _feeder: Subject<boolean>;

  constructor() {
    this._feeder = new Subject<boolean>();
  }

  setLoading(key: any, status: boolean) {
    if (status) {
      this._loadingMap[key] = true;
    } else {
      delete this._loadingMap[key];
    }
    this.updateValue();
  }

  updateValue() {
    console.log('update loading value');
    let isLoading = false;
    for (let loading of Object.values(this._loadingMap)) {
      isLoading = isLoading || loading;
    }
    console.log('loading value: ', isLoading, this._loadingMap);
    this._feeder.next(isLoading);
  }

  getSubscription() {
    return this._feeder.asObservable();
  }
}

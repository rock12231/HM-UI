import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private updateSubject = new BehaviorSubject<boolean>(false);
  public update$ = this.updateSubject.asObservable();

  triggerUpdate() {
    this.updateSubject.next(true);
  }
}

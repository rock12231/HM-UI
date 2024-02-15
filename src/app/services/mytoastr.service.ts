import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MytoastrService {

  constructor(private toastr: ToastrService) { }

  showError(message: string, title: string = '') {
    this.toastr.error(message, title, { positionClass: 'toast-bottom-left'});
  }

  showSuccess(message: string, title: string = '') {
    this.toastr.success(message, title, { positionClass: 'toast-bottom-left'});
  }

  showInfo(message: string, title: string = '') {
    this.toastr.info(message, title, { positionClass: 'toast-bottom-left'});
  }

  showWarning(message: string, title: string = '') {
    this.toastr.warning(message, title, { positionClass: 'toast-bottom-left'});
  }

  showCustom(message: string, title: string = '') {
    this.toastr.show(message, title, { positionClass: 'toast-bottom-left'});
  }


  // toast-top-right: Toasts appear in the top right corner of the screen.
  // toast-top-left: Toasts appear in the top left corner of the screen.
  // toast-bottom-right: Toasts appear in the bottom right corner of the screen.
  // toast-bottom-left: Toasts appear in the bottom left corner of the screen.
  // toast-top-full-width: Toasts span the full width of the top of the screen.
  // toast-bottom-full-width: Toasts span the full width of the bottom of the screen.
  // toast-center: Toasts appear in the center of the screen.

}

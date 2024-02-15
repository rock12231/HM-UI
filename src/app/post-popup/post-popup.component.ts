import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-post-popup',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './post-popup.component.html',
  styleUrl: './post-popup.component.css'
})
export class PostPopupComponent {

  @Input() postData: any;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  token: string | null | undefined;

  constructor(private authService: AuthenticationService,
    private spinnerService: SpinnerService) {
    this.spinnerService.show();
    this.token = this.authService.getToken();
  }

  ngOnInit() {
    setTimeout(() => {
      this.spinnerService.hide();
    }, 300);
    this.showSinglePost();
  }

  showSinglePost() {
    this.authService.showHackPosts(this.postData).subscribe(
      (response) => {
        console.log("Response : >>>>>", response);
        this.postData = response;
      },
      (error) => {
        console.log("Error : >>>>>", error);
      }
    );

  }

  closePopup() {
    this.close.emit();
  }

}

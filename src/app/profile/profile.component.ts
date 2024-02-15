import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopnavComponent } from '../topnav/topnav.component';
import { LeftnavComponent } from '../leftnav/leftnav.component';
import { SpinnerService } from '../services/spinner.service';
import { MytoastrService } from '../services/mytoastr.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TopnavComponent, LeftnavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileData: any = [];
  token: string | null | undefined;
  photo: any;

  constructor(private authService: AuthenticationService,private spinnerService: SpinnerService,
    private toastrService : MytoastrService
  ) {
    this.spinnerService.show();
    this.token = this.authService.getToken();
    if (this.token) {
      this.profile();
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.spinnerService.hide();
    }, 300);
  }

  profile() {
    this.authService.getProfile().subscribe(
      (response) => {
        this.profileData = response;
        this.showProfilePhoto();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  showProfilePhoto() {
    this.authService.getProfilePhoto().subscribe(
      (response) => {
        console.log(response);
        this.photo = response.avatar;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
  updateProfile() {
    this.authService.updateProfile(this.profileData).subscribe(
      (response) => {
        console.log(response);
        this.profile();
        this.toastrService.showSuccess('Profile Updated', 'Success');
      },
      (error) => {
        console.log(error);
        this.toastrService.showError('Enter Name', 'Error');
      }
    );
  }

  uploadPhoto(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    this.authService.postProfilePhoto(formData).subscribe(
      (response) => {
        console.log(response);
        this.toastrService.showSuccess('Profile Photo Updated', 'Success');
        this.profile();
      },
      (error) => {
        console.log(error);
      }
    );
  }




}

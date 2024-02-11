import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopnavComponent } from '../topnav/topnav.component';
import { LeftnavComponent } from '../leftnav/leftnav.component';
import { SpinnerService } from '../services/spinner.service';

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

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService
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
        console.log(response, "<<<< profile data");
        this.profileData = JSON.parse(JSON.stringify(response));
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
      },
      (error) => {
        console.log(error);
      }
    );
  }


}

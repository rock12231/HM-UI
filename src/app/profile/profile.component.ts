import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopnavComponent } from '../topnav/topnav.component';
import { LeftnavComponent } from '../leftnav/leftnav.component';

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
    private profileService: ProfileService) {
    this.token = this.authService.getToken();
  }

  ngOnInit() {
    if (this.token) {
      // console.log("Profile Token : >>>>>", this.token);
      this.profile();
    }
  }

  profile() {
    this.profileService.getProfile().subscribe(
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
    this.profileService.updateProfile(this.profileData).subscribe(
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

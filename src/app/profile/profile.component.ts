import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileData: any = [];

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private profileService: ProfileService) {

    if (this.authService.isAuthenticated()) {
      console.log("Authenticated HackpostComponent");
    } else {
      this.router.navigate(['/login']);
    }

  }

  ngOnInit() {
    this.profile();
  }
  
  profile() {
    this.profileService.getProfile().subscribe(
      (response) => {
        console.log(response, "<<<< profile data");
        // Convert response to JSON
        this.profileData = JSON.parse(JSON.stringify(response));
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

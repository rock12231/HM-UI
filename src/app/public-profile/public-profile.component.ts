import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent {

  profile: any = [];


  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    const token = this.authService.getToken();
    if (token) {
      this.getProfile();
    } else {
      this.router.navigate(['/login']);
    }

  }

  getProfile() {
    this.authService.getProfile().subscribe((response) => {
      this.profile = response;
    });
  }

}

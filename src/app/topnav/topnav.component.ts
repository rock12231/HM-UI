import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {
  token: string | null | undefined;
  username: string | null | undefined;

  constructor(private router: Router, private authService: AuthenticationService) { 
    if (typeof localStorage !== 'undefined') {
    this.username = localStorage.getItem('username');
    }
  }

  logout() {

    // // Replace with the actual refresh token
    // const refreshToken = localStorage.getItem('refresh') ?? '';
    // this.authService.logout(refreshToken).subscribe(
    //   () => {
    //     console.log('Logout successful');
    //     // Handle any additional logic after successful logout
    //   },
    //   error => {
    //     console.error('Logout failed', error);
    //     // Handle error, if any
    //   }
    // );
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      this.router.navigate(['/login']);
    }
  }

}

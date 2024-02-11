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

  username: string | null | undefined='';
  constructor(private authService: AuthenticationService,private router: Router) { 
    this.username = this.authService.getUsername();
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      this.router.navigate(['/login']);
    }
  }

}

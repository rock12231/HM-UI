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

  constructor(private router: Router, private authService: AuthenticationService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}

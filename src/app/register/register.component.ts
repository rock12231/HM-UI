import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router,private authService: AuthenticationService) {
    console.log("RegisterComponent");
  }
  register(): void {
    this.authService.register(this.email, this.password).subscribe(
      (response) => {
        console.log(response);
        this.authService.setToken(response.access, response.refresh);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

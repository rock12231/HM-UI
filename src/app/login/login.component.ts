import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  isLoading: boolean = false; 
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router,private authService: AuthenticationService) {
    console.log("LoginComponent");
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false; 
    }, 1000); 
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log(response);
        this.authService.setToken(response.access, response.refresh);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // login(): void {
  //   console.log(this.email);
  //   console.log(this.password);
  //   const credentials = { username: this.email, password:this.password };
  //   this.http.post(this.apiUrl+'/token/', credentials)
  //     .subscribe(
  //       (response:any) => {
  //         localStorage.setItem('token', response['access']);
  //         localStorage.setItem('refresh', response['refresh'] as string);
  //         console.log("Token :",localStorage.getItem('token'));
  //         console.log("refresh :",localStorage.getItem('refresh'));
  //         this.router.navigate(['/']);
  //         // this.http.get(this.apiUrl+'/users/me/', {headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}})
  //         //   .subscribe(
  //         //     (response) => {
  //         //       console.log(response);
  //         //       localStorage.setItem('user', JSON.stringify(response));
  //         //       window.location.href = '/';
  //         //     },
  //         //     (error) => {
  //         //       console.log(error);
  //         //     }
  //         //   );

  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }
}
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private http: HttpClient) {
    // this.login("user","user");
    console.log("LoginComponent");
  }
  private apiUrl = 'http://127.0.0.1:8000/api';


  isLoading: boolean = true; 
  email: string = '';
  password: string = '';
  isUser:any;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false; 
    }, 1000); 
  }

  login(): void {
    console.log(this.email);
    console.log(this.password);
    const credentials = { username: this.email, password:this.password };
    this.http.post(this.apiUrl+'/token/', credentials)
      .subscribe(
        (response:any) => {
          console.log(response);
          localStorage.setItem('token', response['access']);
          localStorage.setItem('refresh', response['refresh'] as string);
          // this.http.get(this.apiUrl+'/users/me/', {headers:{'Authorization': 'Bearer '+localStorage.getItem('token')}})
          //   .subscribe(
          //     (response) => {
          //       console.log(response);
          //       localStorage.setItem('user', JSON.stringify(response));
          //       window.location.href = '/';
          //     },
          //     (error) => {
          //       console.log(error);
          //     }
          //   );
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
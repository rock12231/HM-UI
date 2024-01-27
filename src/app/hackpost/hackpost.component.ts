import { Component } from '@angular/core';
import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import e from 'express';

@Component({
  selector: 'app-hackpost',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './hackpost.component.html',
  styleUrl: './hackpost.component.css'
})
export class HackpostComponent {
  
  title = 'HM-UI';
  ip: string | undefined;
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    // const token = localStorage.getItem('token');
    // this.getIPAddress();
    // // Check if user is logged in othere wise redirect to login page
    // if (token === null) {
    //   // window.location.href = '/login';
    //   this.router.navigate(['/login']);
    // }
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`,
    // });

    // this.http.get(this.apiUrl+'/token/verify/', { headers }).subscribe(response => {
    //   console.log(response,"<< Token verified");
    // });
    if(authService.isAuthenticated()){
      console.log("Authenticated");
    }else{
      console.log("Not Authenticated");
      authService.logout();
      this.router.navigate(['/login']);
    }
  }


  // Get ip address
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ip = res.ip;
      console.log(this.ip);
    });
  }

  // Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}

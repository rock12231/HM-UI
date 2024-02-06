import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // private apiUrl = 'http://localhost:8000/api/user';
  // private jwtHelper: JwtHelperService = new JwtHelperService();

  // constructor(private http: HttpClient) { }

  // getToken(): string | null | undefined {
  //   if (typeof localStorage !== 'undefined') {
  //     return localStorage.getItem('token');
  //   }
  //   return undefined;
  // }
  
  // createHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders().set('Authorization', `Bearer ${token}`).append('Content-Type', 'application/json');
  // }


}

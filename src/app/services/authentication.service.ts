import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // for local development environment set apiUrl to 'http://localhost:8000/api'

  private apiUrl = 'http://localhost:8000/api/user';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/`, { username, password });
  }

  setToken(access: string, refresh: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);
    }
  }

  getToken(): string | null | undefined {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return undefined;
  }

  clearToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    console.log("Token : >>>>>", token);
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  isAuthenticated(): boolean {
    // check status of data is 200 or not
    this.http.get(`${this.apiUrl}/token/verify/`, { headers: this.createHeaders() }).subscribe(data => {
      console.log(data);
    });
    if (this.isTokenExpired()) {
      return false;
    }
    else {
      return true;
    }
    // return !!this.getToken();
  }

  createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
    }
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, { username, password });
  }

}

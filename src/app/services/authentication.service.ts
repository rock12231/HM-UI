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
      const decodedToken = this.jwtHelper.decodeToken(access);
      // set username and email to local storage
      localStorage.setItem('username', decodedToken.username);
      localStorage.setItem('email', decodedToken.email);
      // console.log("Decoded Token : >>>>>", decodedToken);
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

  logout(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout/`, { refresh: refreshToken });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, { username, email, password });
  }

  getGithubId(gid: string): Observable<any> {
    return this.http.get<any>(`https://api.github.com/users/${gid}`);
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/`, { headers: this.createHeaders() });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/`, data, { headers: this.createHeaders() });
  }

  getHackPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/`, { headers: this.createHeaders() });
  }

  postHackPosts(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post/`, data, { headers: this.createHeaders() });
  }

  updateHackPosts(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/post/${id}/`, data, { headers: this.createHeaders() });
  }

  deleteHackPosts(id: number, data: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/post/${id}/`, { headers: this.createHeaders(), body: data });
  }

  hackeathonData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hackeathon/`, { headers: this.createHeaders() });
  }

}

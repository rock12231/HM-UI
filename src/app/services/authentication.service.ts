import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // for local development environment set apiUrl to 'http://localhost:8000/api'

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/`, { username, password });
  }

  setToken(access: string,refresh:string): void {
    localStorage.setItem('token', access);
    localStorage.setItem('refresh', refresh);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    this.http.get(`${this.apiUrl}/token/verify/`, {headers: this.createHeaders()}).subscribe(data => {
        console.log(data);
      });
    return !!this.getToken();
  }

  createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  }
}

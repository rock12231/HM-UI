import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import e from 'express';

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
      // const decodedToken = this.jwtHelper.decodeToken(access);
      // // set username and email to local storage
      // localStorage.setItem('username', decodedToken.username);
      // localStorage.setItem('email', decodedToken.email);
      // console.log("Decoded Token : >>>>>", decodedToken);
    }
  }

  getUsername(): string | null | undefined {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.username;
      }
    }
    return undefined;
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

  createParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('page', '1');
    params = params.append('page_size', '10');
    return params;
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

  getHackPosts(page: number = 1, pageSize: number = 10): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('page_size', pageSize.toString());
    return this.http.get<any>(`${this.apiUrl}/post/`, { headers: this.createHeaders(), params: params });
  }

  searchHackPosts(search: string, types: string): Observable<any> {
    search = search.replace(/#/g, '%23');
    search = search.replace(/@/g, '%40');
    return this.http.get<any>(`${this.apiUrl}/post/search/?search=${search}&types=${types}`, { headers: this.createHeaders() });
  }

  postHackPosts(page: number = 1, pageSize: number = 10, data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('page_size', pageSize.toString());
    return this.http.post<any>(`${this.apiUrl}/post/`, data, { headers: this.createHeaders(), params: params });
  }

  updateHackPosts(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/post/${id}/`, data, { headers: this.createHeaders(), params: this.createParams() });
  }

  showHackPosts(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/show/${id}/`, { headers: this.createHeaders() });
  }

  deleteHackPosts(id: number, data: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/post/${id}/`, { headers: this.createHeaders(), body: data,params: this.createParams()});
  }

  hackeathonData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hackeathon/`, { headers: this.createHeaders() });
  }

  postLike(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post/like/${id}/`, {}, { headers: this.createHeaders() });
  }



}

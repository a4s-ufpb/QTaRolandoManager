import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequestModel } from '../models/UserRequestModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_API = `${environment.API}/auth/`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'login', {
      email,
      password: password
    });
  }

  register(user: UserRequestModel): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  logout(): Observable<any> {
    return this.http.post(this.AUTH_API + 'signout', {});
  }

}

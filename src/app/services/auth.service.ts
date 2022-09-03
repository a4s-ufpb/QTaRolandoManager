import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequestModel } from '../models/UserRequestModel';

const AUTH_API = 'http://localhost:8080/api/auth/';

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + btoa(`${email}:${password}`) })
    }
    return this.http.post(AUTH_API + 'login', null, options);
  }

  register(user: UserRequestModel): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

}

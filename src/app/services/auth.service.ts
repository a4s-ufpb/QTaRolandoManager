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
    httpOptions.headers.append('Authorization', 'Basic ' + btoa(`${email}:${password}`));
    console.log(httpOptions.headers.get('Content-Type'));
    return this.http.post(AUTH_API + 'login', null, httpOptions);
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

  // private baseUrlLogin = "http://localhost:8080/api/users/login";
  // private baseUrlRegister = "http://localhost:8080/api/users";

  // private userSubject!: BehaviorSubject<UserModel>;
  // public user: Observable<UserModel>;

  // constructor(private httpClient: HttpClient) {
  //   this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user')!));
  //   this.user = this.userSubject.asObservable();
  // }

  // public get userValue(): UserModel {
  //   return this.userSubject.value;
  // }

  // loginUser(email: string, password: string): Observable<object> {
  //   let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(email + ':' + password) });
  //   console.log(email, password);
  //   return this.httpClient.post(`${this.baseUrlLogin}`, null, { headers });
  // }

  // registerUser(name: string, email: string, password: string): Observable<object> {
  //   return this.httpClient.post<UserModel>(`${this.baseUrlRegister}`, { name, email, password });
  // }
}

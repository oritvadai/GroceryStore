import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>("http://localhost:3000/api/auth/login", { username, password });
  }

  public register(user: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/api/auth/register", user);
  }
}

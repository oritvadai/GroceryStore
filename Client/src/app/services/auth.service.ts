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
        return this.http.post<any>("http://localhost:3000/api/auth/login",
            { username, password });
    }

    public register(user: User): Observable<any> {
        return this.http.post<any>("http://localhost:3000/api/auth/register", user);
    }

    public userIDExists(ID): Observable<boolean> {
        return this.http.get<boolean>("http://localhost:3000/api/auth/" + ID);
    }

    //   public getCaptcha(): Observable<string> {
    //     return this.http.get<string>("http://localhost:3000/api/auth/captcha");
    //   }
}

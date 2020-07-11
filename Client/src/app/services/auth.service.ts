import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { serverBaseUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public login(username: string, password: string): Observable<any> {
        return this.http.post<any>(
            serverBaseUrl + "/auth/login", { username, password });
    }

    public register(user: User): Observable<any> {
        return this.http.post<any>(
            serverBaseUrl + "/auth/register", user);
    }

    public userIDExists(ID: number): Observable<boolean> {
        return this.http.get<boolean>(
            serverBaseUrl + "/auth/" + ID);
    }

    //   public getCaptcha(): Observable<string> {
    //     return this.http.get<string>("serverBaseUrl + "/auth/captcha");
    //   }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public user = new User();

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        if (this.user.username && this.user.password) {

            this.authService
                .login(this.user.username, this.user.password)
                .subscribe(response => {
                    sessionStorage.setItem("user", JSON.stringify(response.user));
                    sessionStorage.setItem("token", response.token);

                    const action = { type: ActionType.Login, payload: response.user };
                    store.dispatch(action);

                    if (response.user.role == "user") {
                        this.router.navigateByUrl("/store");
                    } else if (response.user.role == "admin") {
                        this.router.navigateByUrl("/admin");
                    }
                },
                    err => alert(err.message));
        }
    }
}

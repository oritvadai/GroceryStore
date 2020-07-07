import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { InfoService } from 'src/app/services/info.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public credentials = new User();
    public user = new User();
    public hasToken: boolean;
    public unsubscribe: Function;

    constructor(
        private authService: AuthService, 
        private infoService: InfoService, 
        private router: Router) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.user = store.getState().user;
            this.hasToken = store.getState().hasToken;
        });

        this.user = store.getState().user;
        this.hasToken = store.getState().hasToken;
    }

    login() {
        if (this.credentials.username && this.credentials.password) {

            this.authService
                .login(this.credentials.username, this.credentials.password)
                .subscribe(response => {
                    sessionStorage.setItem("user", JSON.stringify(response.user));
                    sessionStorage.setItem("token", response.token);

                    const action = { type: ActionType.Login, payload: response.user };
                    store.dispatch(action);

                    if (response.user.role == "admin") {
                        this.router.navigateByUrl("/admin");
                    } 
                    else if (response.user.role == "user") {
                        this.infoService
                        .getOpenCartInfo(this.user._id);
                        this.infoService
                        .getLastOrderInfo(this.user._id);
                    }
                },
                    err => alert(err.message));
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

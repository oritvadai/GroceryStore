import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GroceryService } from 'src/app/services/grocery.service';
import { Cart } from 'src/app/models/cart';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public user = new User();
    public confirmPass: string;
    public userIDExists: boolean;
    public step1complete: boolean;
    public token = "";
    // public captcha = "";

    ngOnInit(): void {

        this.step1complete = false;
        // this.authService
        // 	.getCaptcha()
        // 	.subscribe(captcha => this.captcha = captcha,
        // 		err => alert(err.message));
    }

    constructor(private authService: AuthService, private groceryService: GroceryService, private router: Router) { }

    validateUserID() {
        this.authService
            .userIDExists(this.user.ID)
            .subscribe(userIDExists => {
                this.userIDExists = userIDExists;
                if (userIDExists) {
                    alert("ID already exists in the db")
                    this.step1complete = false;
                } else {
                    this.step1complete = true;
                }
            },
                err => alert(err.message));
    }

    register() {
        if (this.user) {
            this.authService
                .register(this.user)
                .subscribe(response => {
                    sessionStorage.setItem("user", JSON.stringify(response.user));
                    sessionStorage.setItem("token", response.token);

                    const action = { type: ActionType.Login, payload: response.user };
                    store.dispatch(action);

                    this.router.navigateByUrl("/home");
                },
                    err => alert(err.message));
        }
    }

    // confirmPassword() {
    //     if (this.user.password != this.confirmPass) {
    //         return false;
    //     }
    // }
}


import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { GroceryService } from 'src/app/services/grocery.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public credentials = new User();
    public user = new User();
    public hasToken: boolean;

    public lastOrder: Date;
    public openCartDate: Date;

    public unsubscribe: Function;

    constructor(
        private authService: AuthService,
        private groceryService: GroceryService,
        private router: Router) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            const storeState = store.getState();

            this.user = storeState.user;
            this.hasToken = storeState.hasToken;

            this.lastOrder = storeState.lastOrder;
            if (storeState.openCartInfo) {
                this.openCartDate = storeState.openCartInfo.date;
            }
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
                        this.getUserInfo();
                    }
                },
                    err => alert(err.message));
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    };

    getUserInfo() {
        //  Get open cart info
        this.groceryService
            .getCartInfoByUser(this.user._id)
            .subscribe(openCartInfo => {

                console.log("login openCartInfo", openCartInfo);

                const action = { type: ActionType.GetOpenCartInfo, payload: openCartInfo };
                store.dispatch(action);

                console.log("redux openCartInfo", store.getState().openCartInfo);

            }, err => alert(err.message));

        //  Get last order info
        this.groceryService
            .getLastOrderByUser(this.user._id)
            .subscribe(lastOrder => {

                const action = { type: ActionType.GetLastOrderByUser, payload: lastOrder.orderDate };
                store.dispatch(action);

            }, err => alert(err.message));
    }
}

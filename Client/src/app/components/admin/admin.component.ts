import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public products: Product[];
    public unsubscribe: Function;


    constructor(private adminService: AdminService, private router: Router) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.products = store.getState().products;
        });

        const user = store.getState().user;
        const hasToken = store.getState().hasToken;

        if (user.role != "admin") {
            alert("Access Denied");
            this.router.navigateByUrl("/home");
            return;
        }

        if (!hasToken) {
            alert("Please Login");
            this.router.navigateByUrl("/home");
            return;
        }

        console.log("store.getState().products.length =")
        console.log(store.getState().products.length);

        if (store.getState().products.length === 0) {
            this.adminService
                .getAllProducts()
                .subscribe(products => {
                    this.products = products

                    const action = { type: ActionType.GetAllProducts, payload: products };
                    store.dispatch(action);
                    console.log("Admin network activity");
                },
                    err => {
                        alert(err.message)
                        this.router.navigateByUrl("/logout");
                    }
                );
        }
        else {
            this.products = store.getState().products;
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

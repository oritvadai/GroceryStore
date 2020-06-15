import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public isLoggedIn: boolean;
    public products: Product[];
    public unsubscribe: Function;


    constructor(private adminService: AdminService, private router: Router) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.products = store.getState().products;
            this.isLoggedIn = store.getState().isLoggedIn;
        });

        this.isLoggedIn = store.getState().isLoggedIn;

        if (!this.isLoggedIn) {
            alert("You are not logged in");
            this.router.navigateByUrl("/home");
            return;
        }

        if (store.getState().products.length === 0) {

            this.adminService
                .getAllProducts()
                .subscribe(products => {
                    this.products = products

                    const action = { type: ActionType.GetAllProducts, payload: products };
                    store.dispatch(action);
                },
                    err => alert(err.message));
        }
        else {
            this.products = store.getState().products;
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

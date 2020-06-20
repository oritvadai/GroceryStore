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

    public hasToken: boolean;
    public products: Product[];
    public unsubscribe: Function;


    constructor(private adminService: AdminService, private router: Router) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.hasToken = store.getState().hasToken;
            this.products = store.getState().products;
        });

        this.hasToken = store.getState().hasToken;

        if (!this.hasToken) {
            alert("Please Login");
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

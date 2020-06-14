import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public products: Product[];
    public unsubscribe: Function;

    constructor(private adminService: AdminService) { }

    ngOnInit(): void {
        this.unsubscribe = store.subscribe(() => {
            this.products = store.getState().products;
            console.log("redux subscribe");
            console.log(this.products);
        });

        console.log(store.getState().products.length)
        
        if (store.getState().products.length === 0) {

            this.adminService
                .getAllProducts()
                .subscribe(products => {
                    this.products = products

                    const action = { type: ActionType.GetAllProducts, payload: products };
                    store.dispatch(action);

                    console.log("Get All Products");

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

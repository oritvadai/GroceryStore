import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { GroceryService } from 'src/app/services/grocery.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public categories: Category[]; 
    public products: Product[];
    public url: string;
    public unsubscribe: Function;

    constructor(
        private groceryService: GroceryService,
        private router: Router) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.categories = store.getState().categories;
        });

        this.url = "http://localhost:3000/api/products/uploads/"

        const user = store.getState().user;
        const hasToken = store.getState().hasToken;

        if (user.role != "admin") {
            alert("Access Denied");
            this.router.navigateByUrl("/home");
            return;
        }

        if (!hasToken) {
            alert("Please Login");
            this.router.navigateByUrl("/logout");
            return;
        }

        if (store.getState().categories.length === 0) {
            this.groceryService
                .getAllCategories()
                .subscribe(categories => {
                    this.categories = categories;

                    const action = { type: ActionType.GetAllCategories, payload: categories };
                    store.dispatch(action);
                },
                    err => {
                        alert(err.message);
                        this.router.navigateByUrl("/logout");
                    }
                );

        } else {
            this.categories = store.getState().categories;
        }

        // if (store.getState().allProducts.length === 0) {
        //     this.adminService
        //         .getAllProducts()
        //         .subscribe(products => {
        //             this.products = products

        //             const action = { type: ActionType.AdminGetAllProducts, payload: products };
        //             store.dispatch(action);
        //             console.log("Admin network activity");
        //         },
        //             err => {
        //                 alert(err.message)
        //                 this.router.navigateByUrl("/logout");
        //             }
        //         );
        // }
        // else {
        //     this.products = store.getState().allProducts;
        // }
    }

    public async getProductsByCategory(categoryId: string) {
        this.groceryService
            .getProductsByCategory(categoryId)
            .subscribe(products => {
                this.products = products;

                const action = { type: ActionType.GetProductsView, payload: products };
                store.dispatch(action);
            },
                err => alert(err.message));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

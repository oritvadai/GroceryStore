import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { serverBaseUrl } from 'src/environments/environment';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public categories: Category[];
    public productsView: Product[];

    public url: string;
    public addOpened = true;
    public editOpened = false;
    
    public unsubscribe: Function;

    constructor(
        private productsService: ProductsService,
        private router: Router) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.categories = store.getState().categories;
            this.productsView = store.getState().productsView;
        });

        this.url = serverBaseUrl + "/products/uploads/"

        if (store.getState().categories.length === 0) {
            this.productsService
                .getAllCategories()
                .subscribe(categories => {
                    this.categories = categories;

                    const action = { type: ActionType.GetAllCategories, payload: categories };
                    store.dispatch(action);
                },
                    err => {
                        alert(err.message);
                        this.router.navigateByUrl("/logout");
                    });
        } else {
            this.categories = store.getState().categories;
        }
    }

    public async getProductsByCategory(categoryId: string) {
        this.productsService
            .getProductsByCategory(categoryId)
            .subscribe(products => {
                this.productsView = products;

                const action = { type: ActionType.GetProductsView, payload: products };
                store.dispatch(action);
            },
                err => alert(err.message));
    }

    public editProductId(id: string) {
        const action = { type: ActionType.AdminUpdateProductId, payload: id };
        store.dispatch(action);
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

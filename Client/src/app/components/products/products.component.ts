import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { Router, ActivatedRoute } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Cart } from 'src/app/models/cart';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    public hasToken: boolean;
    public unsubscribe: Function;

    public categories: Category[];
    public products: Product[];
    public cart = new Cart();
    public item = new Item();

    constructor(
        private groceryService: GroceryService, 
        private router: Router,
        private activatedRoute: ActivatedRoute
        ) { }

    ngOnInit(): void {

        const id = this.activatedRoute.snapshot.params.categoryId;
        console.log(id)

        this.unsubscribe = store.subscribe(() => {
            this.hasToken = store.getState().hasToken;
            this.categories = store.getState().categories;
            this.cart = store.getState().cart;
        });

        this.hasToken = store.getState().hasToken;
        this.cart = store.getState().cart;

        if (!this.hasToken) {
            alert("Please Login");
            this.router.navigateByUrl("/home");
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
                    err => alert(err.message));
        } else {
            this.categories = store.getState().categories;
        }
    }

    public async getProductsByCategory(categoryId: string) {
        this.groceryService
            .getProductsByCategory(categoryId)
            .subscribe(products => this.products = products,
                err => alert(err.message));
    }

    public async addToCart(productId, productPrice, productName) {
        this.item.cartId = this.cart._id;
        this.item.productId = productId;
        this.item.quantity = 1;
        this.item.product = { "price": productPrice, "productName": productName };

        this.groceryService
            .addItem(this.item)
            .subscribe(item => {
                const action = { type: ActionType.AddItem, payload: item };
                store.dispatch(action);

                alert("Item Added")
            },
                err => alert(err.message));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

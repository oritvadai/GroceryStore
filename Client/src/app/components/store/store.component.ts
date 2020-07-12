import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Cart } from 'src/app/models/cart';
import { MatDialog } from '@angular/material/dialog';
import { QuantityDialogComponent } from '../quantity-dialog/quantity-dialog.component';
import { serverBaseUrl } from 'src/environments/environment';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

    public categories: Category[];
    public productsView: Product[];

    public cart = new Cart();
    public item = new Item();

    public url: string;
    public opened = true;
    
    public unsubscribe: Function;

    constructor(
        private productsService: ProductsService,
        private cartService: CartService,

        private router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.categories = store.getState().categories;
            this.productsView = store.getState().productsView;
            this.cart = store.getState().cart;
        });

        this.cart = store.getState().cart;
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

    // Pop-up dialog for item quantity
    openDialog(p): void {

        const dialogRef = this.dialog.open(QuantityDialogComponent, {
            width: '250px',
            data: { quantity: this.item.quantity, isConfirmed: false }
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result && result.isConfirmed) {
                this.item.quantity = result.quantity;
                this.addToCart(p);
            }
        });
    }

    public async addToCart(p) {
        this.item.cartId = this.cart._id;
        this.item.productId = p._id;

        this.cartService
            .addItem(this.item)
            .subscribe(item => {

                const action = { type: ActionType.AddItem, payload: item };
                store.dispatch(action);

                this.updateTotalPrice();
            },
                err => alert(err.message));
    }

    // Update totalPrice when items are added
    updateTotalPrice() {
        this.cartService
            .getTotalPriceByCart(this.cart._id)
            .subscribe(totalPrice => {

                const action = { type: ActionType.GetTotalPrice, payload: totalPrice };
                store.dispatch(action);
            },
                err => alert(err.message));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

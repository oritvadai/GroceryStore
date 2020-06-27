import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { Router, ActivatedRoute } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Cart } from 'src/app/models/cart';
import { MatDialog } from '@angular/material/dialog';
import { QuantityDialogComponent } from '../quantity-dialog/quantity-dialog.component';

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
    public unsubscribe: Function;

    constructor(
        private groceryService: GroceryService,
        private router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.categories = store.getState().categories;
            this.productsView = store.getState().productsView
            this.cart = store.getState().cart;
        });

        this.cart = store.getState().cart;

        const user = store.getState().user;
        const hasToken = store.getState().hasToken;

        if (user.role != "user") {
            alert("Access Denied");
            this.router.navigateByUrl("/home");
            return;
        }

        if (!hasToken) {
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
                    err => {
                        alert(err.message);
                        this.router.navigateByUrl("/logout");
                    }
                );

        } else {
            this.categories = store.getState().categories;
        }
    }

    public async getProductsByCategory(categoryId: string) {
        this.groceryService
            .getProductsByCategory(categoryId)
            .subscribe(products => {
                this.productsView = products;

                const action = { type: ActionType.GetProductsView, payload: products };
                store.dispatch(action);
            },
                err => alert(err.message));
    }

    // Pop-up Dialog for item quantity
    openDialog(p): void {

        const dialogRef = this.dialog.open(QuantityDialogComponent, {
            width: '250px',
            data: { quantity: this.item.quantity, isConfirmed: false }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);

            if (result && result.isConfirmed) {
                this.item.quantity = result.quantity;
                this.addToCart(p);
            }
        });
    }

    public async addToCart(p) {
        this.item.cartId = this.cart._id;
        this.item.productId = p._id;

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

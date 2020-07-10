import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { Cart } from 'src/app/models/cart';
import { CartInfo } from 'src/app/models/cart-info';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public user = new User();
    public hasToken: boolean;

    public openCartInfo = new CartInfo();
    public cart = new Cart();
    // public totalPrice: number;

    public unsubscribe: Function;

    constructor(
        private groceryService: GroceryService,
        public router: Router) { }

    async ngOnInit() {

        this.unsubscribe = store.subscribe(() => {
            this.user = store.getState().user;
            this.hasToken = store.getState().hasToken;

            this.openCartInfo = store.getState().openCartInfo;
            this.cart = store.getState().cart;
            // this.totalPrice = store.getState().totalPrice;
        });

        this.user = store.getState().user;
        this.hasToken = store.getState().hasToken;

        if (this.user.role != "user") {
            alert("Access Denied");
            this.router.navigateByUrl("/home");
            return;
        }

        if (!this.hasToken) {
            alert("Please Login");
            this.router.navigateByUrl("/logout");
            return;
        }

        console.log(store.getState());

        // Get open cart info
        if (!store.getState().openCartInfo || !store.getState().openCartInfo._id) {
            this.groceryService
                .getCartInfoByUser(this.user._id)
                .subscribe(openCartInfo => {

                    this.openCartInfo = openCartInfo;

                    const action = { type: ActionType.GetOpenCartInfo, payload: openCartInfo };
                    store.dispatch(action);

                    if (openCartInfo.hasOpenCart) {
                        this.getCartItems(openCartInfo._id);
                    }
                }, err => alert(err.message));
        } else {
            this.openCartInfo = store.getState().openCartInfo;

            if (this.openCartInfo.hasOpenCart) {
                this.getCartItems(this.openCartInfo._id);
            }
        }
    }

    // Get openCart items
    getCartItems(openCartId) {
        if (!this.cart || !this.cart._id) {
            this.groceryService
                .getCartById(openCartId)
                .subscribe(cart => {

                    this.cart = cart;
                    // this.totalPrice = cart.totalPrice;

                    const actionCart = { type: ActionType.GetCartContent, payload: cart };
                    store.dispatch(actionCart);

                    // const actionPrice = { type: ActionType.GetTotalPrice, payload: cart.totalPrice };
                    // store.dispatch(actionPrice);

                }, err => alert(err.message));
        } else {
            this.cart = store.getState().cart;
        }
    }

    public async removeItem(itemId) {
        this.groceryService
            .removeItem(itemId)
            .subscribe(() => {

                const action = { type: ActionType.RemoveItem, payload: itemId };
                store.dispatch(action);

                this.updateTotalPrice();
            },
                err => alert(err.message));
    }

    // Update totalPrice when items are removed
    updateTotalPrice() {
        this.groceryService
            .getTotalPriceByCart(this.cart._id)
            .subscribe(totalPrice => {
                // this.totalPrice = totalPrice;
                this.cart.totalPrice = totalPrice;

                const actionPrice = { type: ActionType.GetTotalPrice, payload: totalPrice };
                store.dispatch(actionPrice);
            },
                err => alert(err.message));
    }

    emptyCart() {
        this.groceryService
            .removeItemsByCart(this.cart._id)
            .subscribe(() => {

                const action = { type: ActionType.ClearCart };
                store.dispatch(action);
            },
                err => alert(err.message));
    }

    addCart() {
        const cart = new Cart();
        cart.userId = this.user._id;
        cart.date = new Date();

        this.groceryService
            .addCart(cart)
            .subscribe(cart => {

                this.getCartItems(cart._id);

            }, err => alert(err.message));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

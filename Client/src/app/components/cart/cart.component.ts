import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartInfo } from 'src/app/models/cart-info';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';

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

    public unsubscribe: Function;

    constructor(
        private cartService: CartService,
        public router: Router) { }

    async ngOnInit() {

        this.unsubscribe = store.subscribe(() => {
            this.user = store.getState().user;
            this.hasToken = store.getState().hasToken;

            this.openCartInfo = store.getState().openCartInfo;
            this.cart = store.getState().cart;
        });

        this.user = store.getState().user;
        this.hasToken = store.getState().hasToken;

        // Check for role and token
        if (!this.hasToken || this.user.role != "user") {
            alert("Access Denied, Please Login");
            this.router.navigateByUrl("/logout");
            return;
        }

        // Get open cart info from db if not on redux
        if (!store.getState().openCartInfo || !store.getState().openCartInfo._id) {
            this.cartService
                .getCartInfoByUser(this.user._id)
                .subscribe(openCartInfo => {
                    this.openCartInfo = openCartInfo;
                    // Save to redux
                    const action = { type: ActionType.GetOpenCartInfo, payload: openCartInfo };
                    store.dispatch(action);

                    // Get cart if there's an open one
                    if (openCartInfo.hasOpenCart) {
                        this.getCartItems(openCartInfo._id);
                    }
                }, err => alert(err.message));
        } else {
            // Get cart info from redux
            this.openCartInfo = store.getState().openCartInfo;
            // Get cart if there's an open one
            if (this.openCartInfo.hasOpenCart) {
                this.getCartItems(this.openCartInfo._id);
            }
        }
    }

    // Get openCart items
    getCartItems(openCartId) {
        if (!store.getState().cart || !store.getState().cart._id) {
            this.cartService
                .getCartById(openCartId)
                .subscribe(cart => {

                    this.cart = cart;

                    const actionCart = { type: ActionType.GetCartContent, payload: cart };
                    store.dispatch(actionCart);

                }, err => alert(err.message));
        } else {
            this.cart = store.getState().cart;
        }
    }
    
    // Remove item from cart and update redux
    public async removeItem(itemId) {
        this.cartService
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
        this.cartService
            .getTotalPriceByCart(this.cart._id)
            .subscribe(totalPrice => {
                this.cart.totalPrice = totalPrice;

                const actionPrice = { type: ActionType.GetTotalPrice, payload: totalPrice };
                store.dispatch(actionPrice);
            },
                err => alert(err.message));
    }

    // Empty cart and update redux
    emptyCart() {
        this.cartService
            .removeItemsByCart(this.cart._id)
            .subscribe(() => {

                const action = { type: ActionType.ClearCart };
                store.dispatch(action);
            },
                err => alert(err.message));
    }

    // Open new cart
    addCart() {
        const cart = new Cart();
        cart.userId = this.user._id;
        cart.date = new Date();

        this.cartService
            .addCart(cart)
            .subscribe(cart => {

                this.getCartItems(cart._id);

            }, err => alert(err.message));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

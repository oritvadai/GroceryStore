import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { Cart } from 'src/app/models/cart';
import { CartInfo } from 'src/app/models/cart-info';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public user = new User();
    public hasToken: boolean;

    public openCart = new CartInfo();
    public cart = new Cart();
    public totalPrice: number;

    public unsubscribe: Function;

    constructor(
        private groceryService: GroceryService,
        private infoService: InfoService,
        public router: Router) { }

    async ngOnInit() {

        this.unsubscribe = store.subscribe(() => {
            this.user = store.getState().user;
            this.hasToken = store.getState().hasToken;

            this.openCart = store.getState().openCart;
            this.cart = store.getState().cart;
            this.totalPrice = store.getState().totalPrice;
        });

        this.user = store.getState().user;
        this.hasToken = store.getState().hasToken;

        if (this.user.role != "user") {
            alert("Access Denied");
            this.router.navigateByUrl("/home");
            return;
        };

        if (!this.hasToken) {
            alert("Please Login");
            this.router.navigateByUrl("/logout");
            return;
        };

        // Get openCart info
        if (!store.getState().openCart || !store.getState().openCart._id) {
            this.infoService
                .getOpenCartInfo(this.user._id);
        } else {
            this.openCart = store.getState().openCart;
        }
        
        this.getCartItems(this.openCart._id);

        console.log(store.getState());

        // if (!store.getState().openCart || !store.getState().openCart._id) {
        //     this.groceryService
        //         .getCartDateByUser(this.user._id)
        //         .subscribe(openCart => {
        //             this.openCart = openCart;

        //             const action = { type: ActionType.GetOpenCartInfo, payload: openCart };
        //             store.dispatch(action);

        //             this.getCartItems(openCart._id);

        //         }, err => alert(err.message));
        // } else {

        //     this.openCart = store.getState().openCart;

            // this.getCartItems(this.openCart._id);
        // };
    };

    // Get openCart items
    getCartItems(openCartId) {
        this.groceryService
            .getCartById(openCartId)
            .subscribe(cart => {

                this.cart = cart;
                this.totalPrice = cart.totalPrice;

                const actionCart = { type: ActionType.GetCartContent, payload: cart };
                store.dispatch(actionCart);

                const actionPrice = { type: ActionType.GetTotalPrice, payload: cart.totalPrice };
                store.dispatch(actionPrice);

            }, err => alert(err.message));
    };

    public async removeItem(itemId) {
        this.groceryService
            .removeItem(itemId)
            .subscribe(result => {

                const action = { type: ActionType.RemoveItem, payload: itemId };
                store.dispatch(action);
                // alert("Item Removed");
            },
                err => alert(err.message));
    };

    // Update totalPrice
    // updateTotalPrice() {
    //     this.groceryService
    //         .getTotalPriceByCart(this.cart._id)
    //         .subscribe(totalPrice => {
    //             this.totalPrice = +totalPrice;

    //             const actionPrice = { type: ActionType.GetTotalPrice, payload: this.totalPrice };
    //             store.dispatch(actionPrice);
    //         },
    //             err => alert(err.message));
    // }

    emptyCart() {
        this.groceryService
            .removeItemsByCart(this.cart._id)
            .subscribe(result => {

                const action = { type: ActionType.ClearCart };
                store.dispatch(action);
                // alert("Cart Cleared");
            },
                err => alert(err.message));
    };

    ngOnDestroy() {
        this.unsubscribe();
    };
};

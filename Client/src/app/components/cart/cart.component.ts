import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { Cart } from 'src/app/models/cart';
import { CartInfo } from 'src/app/models/cart-info';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public openCart = new CartInfo();
    public cart = new Cart();
    public totalPrice: number;
    public unsubscribe: Function;

    constructor(private groceryService: GroceryService, public router: Router) { }

    async ngOnInit() {

        this.unsubscribe = store.subscribe(() => {
            this.openCart = store.getState().openCart;
            this.cart = store.getState().cart;
            this.totalPrice = store.getState().totalPrice;
        });

        this.openCart = store.getState().openCart;

        console.log("cart openCart");
        console.log(this.openCart);


        const user = store.getState().user;
        const hasToken = store.getState().hasToken;

        if (user.role != "user") {
            alert("Access Denied");
            this.router.navigateByUrl("/home");
            return;
        }

        if (!hasToken) {
            alert("Please Login");
            this.router.navigateByUrl("/logout");
            return;
        }

        // Get openCart info for _id
        // if (!store.getState().openCart) {
        //     this.groceryService
        //         .getCartDateByUser(user._id)
        //         .subscribe(openCart => {
        //             // if (!open cart) {
        //             // } else {}
        //             this.openCart = openCart;

        //             const action = { type: ActionType.GetOpenCartInfo, payload: openCart };
        //             store.dispatch(action);

        //         }, err => alert(err.message));
        // }
        // else {
        //     // const openCart = store.getState().openCart;
        //     // if(openCart) {
        //     this.openCart = store.getState().openCart;
        //     // }
        // };

        // Get openCart items
        if (!store.getState().cart._id) {

            this.groceryService
                .getCartById(this.openCart._id)
                .subscribe(cart => {
                    this.cart = cart;

                    console.log(cart);
                    console.log(cart.items);

                    this.totalPrice = cart.totalPrice;

                    const actionCart = { type: ActionType.GetCartContent, payload: cart };
                    store.dispatch(actionCart);

                    const actionPrice = { type: ActionType.GetTotalPrice, payload: cart.totalPrice };
                    store.dispatch(actionPrice);

                }, err => alert(err.message));
        }
        else {
            this.cart = store.getState().cart;
        }
    }

    public async removeItem(itemId) {
        this.groceryService
            .removeItem(itemId)
            .subscribe(result => {

                const action = { type: ActionType.RemoveItem, payload: itemId };
                store.dispatch(action);
                // alert("Item Removed");
            },
                err => alert(err.message));
    }

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
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

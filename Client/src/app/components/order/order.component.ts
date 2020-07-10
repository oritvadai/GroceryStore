import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { GroceryService } from 'src/app/services/grocery.service';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Order } from 'src/app/models/order';
import { CartInfo } from 'src/app/models/cart-info';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    public cart = new Cart();
    public openCart = new Cart();
    public order = new Order();
    public minDate: Date;

    constructor(private groceryService: GroceryService, public router: Router) { }

    async ngOnInit() {

        this.cart = store.getState().cart;
        this.openCart = store.getState().openCartInfo;

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

        if (!store.getState().cart || !store.getState().cart._id) {
            this.groceryService
                .getCartById(this.openCart._id)
                .subscribe(cart => {
                    this.cart = cart;

                    const action = { type: ActionType.GetCartContent, payload: cart };
                    store.dispatch(action);

                }, err => alert(err.message));
        }
        else {
            this.cart = store.getState().cart;
        }
    }

    commitOrder() {

        this.order.cartId = this.cart._id;
        this.order.userId = this.cart.userId;

        this.groceryService
            .addOrder(this.order)
            .subscribe(response => {

                // clear ordered cart from redux
                const cart = new Cart();
                const actionCart = { type: ActionType.GetCartContent, payload: cart };
                store.dispatch(actionCart);

                // clear previous cart info from redux
                const cartInfo = new CartInfo();
                const actionInfo = { type: ActionType.GetOpenCartInfo, payload: cartInfo };
                store.dispatch(actionInfo);

                alert("Order confirmed")
                this.router.navigateByUrl("/home");
            },
                err => alert(err.message));
    }
}

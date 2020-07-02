import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Cart } from 'src/app/models/cart';
import { GroceryService } from 'src/app/services/grocery.service';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Order } from 'src/app/models/order';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    public cart = new Cart();
    public order = new Order();
    public minDate = new Date();

    constructor(private groceryService: GroceryService, public router: Router) { }

    async ngOnInit() {

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

        if (!store.getState().cart._id) {
            this.groceryService
                .getCartByUser(user._id)
                .subscribe(cart => {
                    this.cart = cart;

                    const cartAction = { type: ActionType.GetCart, payload: cart };
                    store.dispatch(cartAction);

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
                alert("Order confirmed")
                this.router.navigateByUrl("/home");
            },
                err => alert(err.message));
    }
}

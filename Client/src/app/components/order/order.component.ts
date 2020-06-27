import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item';
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
    public items: Item[];
    public order = new Order();
    // public unsubscribe: Function;

    constructor(private groceryService: GroceryService, public router: Router) { }

    async ngOnInit() {

        // this.unsubscribe = store.subscribe(() => {
        //     this.cart = store.getState().cart;
        //     this.items = store.getState().items;
        // });

        this.cart = store.getState().cart;
        this.items = store.getState().items;

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

                    const action = { type: ActionType.GetCart, payload: cart };
                    store.dispatch(action);

                    this.groceryService
                        .getItemsByCart(cart._id)
                        .subscribe(items => {
                            this.items = items;

                            const action = { type: ActionType.GetItems, payload: items };
                            store.dispatch(action);
                        },
                            err => alert(err.message));
                }, err => alert(err.message));
        }
        else {
            this.cart = store.getState().cart;
            this.items = store.getState().items;
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

    // ngOnDestroy() {
    //     this.unsubscribe();
    // }
}

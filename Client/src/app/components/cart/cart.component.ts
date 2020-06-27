import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { Cart } from 'src/app/models/cart';
import { store } from 'src/app/redux/store';
import { User } from 'src/app/models/user';
import { Item } from 'src/app/models/item';
import { ActionType } from 'src/app/redux/action-type';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public cart = new Cart();
    public items: Item[];
    public unsubscribe: Function;

    constructor(private groceryService: GroceryService, public router: Router) { }

    async ngOnInit() {

        this.unsubscribe = store.subscribe(() => {
            this.cart = store.getState().cart;
            this.items = store.getState().items;
        });

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

    public async removeItem(itemId) {
        this.groceryService
            .removeItem(itemId)
            .subscribe(result => {

                const action = { type: ActionType.RemoveItem, payload: itemId };
                store.dispatch(action);
                alert("Item Removed");
            },
                err => alert(err.message));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

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

    public user = new User();
    public cart = new Cart();
    public items: Item[];
    public unsubscribeUser: Function;
    public unsubscribeCart: Function;

    constructor(private groceryService: GroceryService, public router: Router) { }

    async ngOnInit() {

        this.unsubscribeUser = store.subscribe(() => {
            this.user = store.getState().user;
        });

        // this.unsubscribeCart = store.subscribe(() => {
        //     this.cart = store.getState().cart;
        // });

        this.user = store.getState().user;

        // if (!store.getState().cart) {

        this.groceryService
            .getCartByUser(this.user._id)
            .subscribe(cart => {
                this.cart = cart;

                // const action = { type: ActionType.GetCart, payload: cart };
                // store.dispatch(action);

                this.groceryService
                    .getItemsByCart(cart._id)
                    .subscribe(items => this.items = items,
                        err => alert(err.message));
            },
                err => {
                    alert("You are not logged in");
                    this.router.navigateByUrl("/home");
                }
            );
        // }
        // else {
        //     this.cart = store.getState().cart;
        // }
    }

    public async getItems() {
        this.groceryService
            .getItemsByCart(this.cart._id)
            .subscribe(items => this.items = items,
                err => alert(err.message));
    }

    public async removeItem(itemId) {
        this.groceryService
            .removeItem(itemId)
            .subscribe(result => console.log(result),
                err => alert(err.message));
    }
    // ngOnDestroy() {
    //     this.unsubscribeUser();
    //     this.unsubscribeCart();
    // }
}

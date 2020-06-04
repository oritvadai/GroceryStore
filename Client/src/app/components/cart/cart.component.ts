import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { Cart } from 'src/app/models/cart';
import { store } from 'src/app/redux/store';
import { User } from 'src/app/models/user';
import { Item } from 'src/app/models/item';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public user = new User();
    public cart = new Cart();
    public items: Item[];

    constructor(private groceryService: GroceryService) { }

    ngOnInit(): void {

        // store.subscribe(() => {
        this.user = store.getState().user;
        // });

        this.groceryService
            .getCartByUser(this.user._id)
            .subscribe(cart => this.cart = cart,
                err => alert(err.message));
    }

    public getItems() {
        this.groceryService
            .getItemsByCart(this.cart._id)
            .subscribe(items => this.items = items,
                err => alert(err.message));
    }

}

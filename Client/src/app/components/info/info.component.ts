import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { User } from 'src/app/models/user';
import { Cart } from 'src/app/models/cart';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

    public productsNum: number;
    public ordersNum: number;

    public user = new User();
    public hasToken: boolean;

    public lastOrder = new Date();
    public openCart = new Cart();

    public unsubscribe: Function;


    constructor(private groceryService: GroceryService) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.productsNum = store.getState().productsNum;
            this.ordersNum = store.getState().ordersNum;

            this.user = store.getState().user;
            this.hasToken = store.getState().hasToken;

            this.lastOrder = store.getState().lastOrder;
            this.openCart = store.getState().openCart;

            this.getUserInfo();
        });

        this.user = store.getState().user;
        this.hasToken = store.getState().hasToken;

        if (store.getState().productsNum === 0) {
            this.groceryService
                .getNumProducts()
                .subscribe(productsNum => {
                    this.productsNum = productsNum;

                    const action = { type: ActionType.GetNumProducts, payload: productsNum };
                    store.dispatch(action);
                },
                    err => alert(err.message));

            this.groceryService
                .getNumOrders()
                .subscribe(ordersNum => {
                    this.ordersNum = ordersNum

                    const action = { type: ActionType.GetNumOrders, payload: ordersNum };
                    store.dispatch(action);
                },
                    err => alert(err.message));
        } else {
            this.productsNum = store.getState().productsNum;
            this.ordersNum = store.getState().ordersNum;
        };

    }

    getUserInfo(){
        if (this.hasToken && !store.getState().lastOrder) {
            this.groceryService
                .getLastOrderByUser(this.user._id)
                .subscribe(lastOrder => {
                    console.log(lastOrder);
                    this.lastOrder = lastOrder.orderDate;

                    const action = { type: ActionType.GetLastOrderByUser, payload: this.lastOrder };
                    store.dispatch(action);

                }, err => alert(err.message));
        }
        else {
            this.lastOrder = store.getState().lastOrder;
d        }

        if (this.hasToken && !store.getState().openCart) {
            this.groceryService
                .getCartDateByUser(this.user._id)
                .subscribe(openCart => {
                    console.log(openCart);
                    this.openCart = openCart;

                    const action = { type: ActionType.GetOpenCart, payload: openCart };
                    store.dispatch(action);

                }, err => alert(err.message));
        }
        else {
            this.openCart = store.getState().openCart;
        };
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

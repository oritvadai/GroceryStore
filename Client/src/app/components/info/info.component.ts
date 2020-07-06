import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { User } from 'src/app/models/user';

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

    public lastOrder: Date;
    public openCart: Date;

    public unsubscribe: Function;


    constructor(private groceryService: GroceryService) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            const storeState = store.getState();

            this.productsNum = storeState.productsNum;
            this.ordersNum = storeState.ordersNum;

            this.user = storeState.user;
            this.hasToken = storeState.hasToken;

            this.lastOrder = storeState.lastOrder;

            if (storeState.openCart) {
                this.openCart = storeState.openCart.date;
            }

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

    getUserInfo() {
        if (this.hasToken && !store.getState().lastOrder) {
            this.groceryService
                .getLastOrderByUser(this.user._id)
                .subscribe(lastOrder => {
                    console.log(lastOrder);
                    if (lastOrder.noOrders) {
                        this.lastOrder = null;
                        console.log("No orders")                
                    }
                    this.lastOrder = lastOrder.orderDate;

                    const action = { type: ActionType.GetLastOrderByUser, payload: this.lastOrder };
                    store.dispatch(action);

                }, err => alert(err.message));
        }
        else {
            this.lastOrder = store.getState().lastOrder;
        }

        if (this.hasToken && !store.getState().openCart) {
            this.groceryService
                .getCartDateByUser(this.user._id)
                .subscribe(openCart => {
                    // if !open cart => 
                    // else -
                    console.log(openCart);
                    this.openCart = openCart.date;

                    const action = { type: ActionType.GetOpenCartInfo, payload: openCart };
                    store.dispatch(action);

                }, err => alert(err.message));
        }
        else {
            const openCart = store.getState().openCart;
            if(openCart) {
                this.openCart = store.getState().openCart.date;
            }
        };
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

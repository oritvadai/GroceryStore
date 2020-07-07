import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { User } from 'src/app/models/user';
import { InfoService } from 'src/app/services/info.service';

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


    constructor(
        private groceryService: GroceryService,
        private infoService: InfoService) { }

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

        if (this.user && this.hasToken) {
            if (!store.getState().lastOrder) {
                this.infoService
                    .getOpenCartInfo(this.user._id);
            } else {
                this.lastOrder = store.getState().lastOrder;
            };

            if (!store.getState().openCart) {
                this.infoService
                    .getLastOrderInfo(this.user._id);
            } else {
                const openCart = store.getState().openCart;
                if (openCart) {
                    this.openCart = store.getState().openCart.date;
                };
            };
        };
    };

    ngOnDestroy() {
        this.unsubscribe();
    };

};


    // getUserInfo() {
        //     // Last order
        //     if (this.hasToken && !store.getState().lastOrder) {
        //         this.groceryService
        //             .getLastOrderByUser(this.user._id)
        //             .subscribe(lastOrder => {
        //                 if (lastOrder.noOrders) {
        //                     this.lastOrder = null;
        //                 }
        //                 this.lastOrder = lastOrder.orderDate;

        //                 const action = { type: ActionType.GetLastOrderByUser, payload: this.lastOrder };
        //                 store.dispatch(action);

        //             }, err => alert(err.message));
        //     }
        //     else {
        //         this.lastOrder = store.getState().lastOrder;
        //     }

        //     // Open Cart
        //     if (this.hasToken && !store.getState().openCart) {
        //         this.groceryService
        //             .getCartDateByUser(this.user._id)
        //             .subscribe(openCart => {

        //                 console.log("info openCart");
        //                 console.log(openCart);

        //                 // if !open cart => 
        //                 // else -
        //                 this.openCart = openCart.date;

        //                 const action = { type: ActionType.GetOpenCartInfo, payload: openCart };
        //                 store.dispatch(action);

        //             }, err => alert(err.message));
        //     }
        //     else {
        //         const openCart = store.getState().openCart;
        //         if (openCart) {
        //             this.openCart = store.getState().openCart.date;
        //         }
        //     };
        // }

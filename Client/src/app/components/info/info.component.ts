import { Component, OnInit } from '@angular/core';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

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
    public openCartDate: Date;

    public unsubscribe: Function;

    constructor(
        private productsService: ProductsService,
        private orderService: OrderService,
        public cartService: CartService) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            const storeState = store.getState();

            this.productsNum = storeState.productsNum;
            this.ordersNum = storeState.ordersNum;

            this.user = storeState.user;
            this.hasToken = storeState.hasToken;

            this.lastOrder = storeState.lastOrder;

            if (storeState.openCartInfo) {
                this.openCartDate = storeState.openCartInfo.date;
            }
        });

        this.user = store.getState().user;
        this.hasToken = store.getState().hasToken;

        if (store.getState().productsNum === 0) {
            this.productsService
                .getNumProducts()
                .subscribe(productsNum => {
                    this.productsNum = productsNum;

                    const action = { type: ActionType.GetNumProducts, payload: productsNum };
                    store.dispatch(action);
                },
                    err => alert(err.message));

            this.orderService
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
        }

        //  Get last order info
        if (this.hasToken && !store.getState().lastOrder) {
            this.getLastOrderInfo();
        } else {
            this.lastOrder = store.getState().lastOrder;
        }

        //  Get open cart info
        if (this.hasToken && !store.getState().openCartInfo) {
            this.getOpenCartInfo();
        } else {
            const openCart = store.getState().openCartInfo;
            if (openCart) {
                this.openCartDate = store.getState().openCartInfo.date;
            }
        }
    }

    getLastOrderInfo() {
        this.orderService
            .getLastOrderByUser(this.user._id)
            .subscribe(lastOrder => {
                if (lastOrder.noOrders) {
                    this.lastOrder = null;
                }
                this.lastOrder = lastOrder.orderDate;
                const action = { type: ActionType.GetLastOrderByUser, payload: this.lastOrder };
                store.dispatch(action);

            }, err => alert(err.message));
    }

    getOpenCartInfo() {
        this.cartService
            .getCartInfoByUser(this.user._id)
            .subscribe(openCartInfo => {
                
                this.openCartDate = openCartInfo.date;

                const action = { type: ActionType.GetOpenCartInfo, payload: openCartInfo };
                store.dispatch(action);

            }, err => alert(err.message));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

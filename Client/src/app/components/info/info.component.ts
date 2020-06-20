import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';
import { Order } from 'src/app/models/order';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

    public unsubscribe: Function;

    public productsNum: number;
    public ordersNum: number;


    constructor(private groceryService: GroceryService) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.productsNum = store.getState().productsNum;
            this.ordersNum = store.getState().ordersNum;
        });

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
        }
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}

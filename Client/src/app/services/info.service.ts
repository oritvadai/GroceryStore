import { Injectable } from '@angular/core';
import { GroceryService } from './grocery.service';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    constructor(private groceryService: GroceryService) { }

    public getOpenCartInfo(userId: string) {
        this.groceryService
            .getCartDateByUser(userId)
            .subscribe(openCart => {

                const action = { type: ActionType.GetOpenCartInfo, payload: openCart };
                store.dispatch(action);

            }, err => alert(err.message));
    };

    public getLastOrderInfo(userId: string) {
        this.groceryService
            .getLastOrderByUser(userId)
            .subscribe(lastOrderInfo => {
                let lastOrder;
                if (lastOrderInfo.noOrders) {
                    lastOrder = null;
                } else {
                    lastOrder = lastOrderInfo.orderDate;
                }

                const action = { type: ActionType.GetLastOrderByUser, payload: lastOrder };
                store.dispatch(action);

            }, err => alert(err.message));
    };
};

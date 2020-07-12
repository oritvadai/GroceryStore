import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Order } from 'src/app/models/order';
import { CartInfo } from 'src/app/models/cart-info';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    public user = new User();
    public hasToken: boolean;

    public openCartInfo = new CartInfo();
    public cart = new Cart();

    public minDate = new Date;
    public order = new Order();

    public unsubscribe: Function;

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        public router: Router,
        public dialog: MatDialog) { }

    async ngOnInit() {


        this.unsubscribe = store.subscribe(() => {
            this.user = store.getState().user;
            this.hasToken = store.getState().hasToken;

            this.openCartInfo = store.getState().openCartInfo;
            this.cart = store.getState().cart;

        });

        this.user = store.getState().user;
        this.hasToken = store.getState().hasToken;

        // Check for role and token
        if (!this.hasToken || this.user.role != "user") {
            alert("Access Denied, Please Login");
            this.router.navigateByUrl("/home");
            return;
        }

        // Get open cart info
        if (!store.getState().openCartInfo || !store.getState().openCartInfo._id) {
            this.cartService
                .getCartInfoByUser(this.user._id)
                .subscribe(openCartInfo => {

                    this.openCartInfo = openCartInfo;

                    const action = { type: ActionType.GetOpenCartInfo, payload: openCartInfo };
                    store.dispatch(action);

                    if (openCartInfo.hasOpenCart) {
                        this.getCartItems(openCartInfo._id);
                    }
                }, err => alert(err.message));
        } else {
            this.openCartInfo = store.getState().openCartInfo;

            if (this.openCartInfo.hasOpenCart) {
                this.getCartItems(this.openCartInfo._id);
            }
        }
        // this.getUserAddress();
    }

    // Get user's address
    // getUserAddress() {
    //     this.orderService
    //         .getUserInfo(this.user._id)
    //         .subscribe(userInfo => {
    //             this.user.city = userInfo.city;
    //             this.user.street = userInfo.street;
    //         }, err => alert(err.message));
    // }

    // Get openCart items
    getCartItems(openCartId) {
        if (!store.getState().cart || !store.getState().cart._id) {
            this.cartService
                .getCartById(openCartId)
                .subscribe(cart => {

                    this.cart = cart;

                    const actionCart = { type: ActionType.GetCartContent, payload: cart };
                    store.dispatch(actionCart);

                }, err => alert(err.message));
        } else {
            this.cart = store.getState().cart;
        }
    }

    commitOrder() {

        this.order.cartId = this.cart._id;
        this.order.userId = this.cart.userId;
        this.order.deliveryDate = new Date(this.order.deliveryDate.getTime() + 12 * 60 * 60 * 1000);

        this.orderService
            .addOrder(this.order)
            .subscribe(order => {

                if (order && order.dateFullError) {
                    alert("The delivery date you choose is already full, please choose another");
                    return;
                }

                this.openDialog(order._id);

                // clear ordered cart from redux
                const cart = new Cart();
                const actionCart = { type: ActionType.GetCartContent, payload: cart };
                store.dispatch(actionCart);

                // clear old openCartInfo from redux
                const cartInfo = new CartInfo();
                const actionInfo = { type: ActionType.GetOpenCartInfo, payload: cartInfo };
                store.dispatch(actionInfo);
            },
                err => alert(err.message));
    }

    // Pop-up dialog for receipt
    openDialog(orderId: string): void {

        const dialogRef = this.dialog.open(ReceiptDialogComponent, {
            width: '300px',
            data: { orderId: orderId },
            disableClose: true
        });
    }

}

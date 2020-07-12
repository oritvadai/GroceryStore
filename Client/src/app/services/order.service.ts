import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { User } from '../models/user';
import { serverBaseUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    public getHeaders() {
        return { Authorization: "Bearer " + sessionStorage.getItem("token") };
    }

    // Get number of orders in the store
    public getNumOrders(): Observable<number> {
        return this.http.get<number>(serverBaseUrl + "/orders/num");
    }

    // Get last order info
    public getLastOrderByUser(userId: string): Observable<any> {
        return this.http.get<any>(
            serverBaseUrl + "/orders/by-user/" + userId,
            { headers: this.getHeaders() });
    }

    // Submit new order
    public addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(
            serverBaseUrl + "/orders", order,
            { headers: this.getHeaders() });
    }

    // Get user info for order form
    public getUserInfo(userId: string): Observable<User> {
        return this.http.get<User>(
            serverBaseUrl + "/users/" + userId,
            { headers: this.getHeaders() });
    }

    // Get receipt for closed order
    public getOrderReceipt(orderId: string): Observable<any> {
        return this.http.get<any>(
            serverBaseUrl + "/orders/receipt/" + orderId,
            { headers: this.getHeaders() });
    }
}

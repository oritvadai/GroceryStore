import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { Category } from '../models/category';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { User } from '../models/user';
import { CartInfo } from '../models/cart-info';
import { serverBaseUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GroceryService {

    public getHeaders() {
        return { Authorization: "Bearer " + sessionStorage.getItem("token") };
    }

    constructor(private http: HttpClient) { }

    // Home
    public getNumProducts(): Observable<number> {
        return this.http.get<number>(
            serverBaseUrl + "/products/num");
    }

    public getNumOrders(): Observable<number> {
        return this.http.get<number>(serverBaseUrl + "/orders/num");
    }

    // Products
    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(
            serverBaseUrl + "/categories", { headers: this.getHeaders() });
    }

    public getProductsByCategory(categoryId: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            serverBaseUrl + "/products/by-category/" + categoryId,
            { headers: this.getHeaders() });
    }

    public getProductsByName(productName: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            serverBaseUrl + "/products/by-name/" + productName,
            { headers: this.getHeaders() });
    }

    // Cart & Items
    public getCartInfoByUser(userId: string): Observable<CartInfo> {
        return this.http.get<CartInfo>(
            serverBaseUrl + "/carts/date/" + userId,
            { headers: this.getHeaders() });
    }

    public getCartById(_id: string): Observable<Cart> {
        return this.http.get<Cart>(
            serverBaseUrl + "/carts/" + _id,
            { headers: this.getHeaders() });
    }

    public addCart(cart: Cart): Observable<Cart> {
        return this.http.post<Cart>(
            serverBaseUrl + "/carts", cart,
            { headers: this.getHeaders() })
    }

    // Items
    public addItem(item: Item): Observable<Item> {
        return this.http.post<Item>(
            serverBaseUrl + "/items", item,
            { headers: this.getHeaders() });
    }

    public removeItem(itemId: string): Observable<string> {
        return this.http.delete<string>(
            serverBaseUrl + "/items/" + itemId,
            { headers: this.getHeaders() });
    }

    public removeItemsByCart(cartId: string): Observable<string> {
        return this.http.delete<string>(
            serverBaseUrl + "/items/by-cart/" + cartId,
            { headers: this.getHeaders() });
    }

    public getTotalPriceByCart(cartId: string): Observable<number> {
        return this.http.get<number>(
            serverBaseUrl + "/items/totalPrice/" + cartId,
            { headers: this.getHeaders() });
    }

    // Order
    public getLastOrderByUser(userId: string): Observable<any> {
        return this.http.get<any>(
            serverBaseUrl + "/orders/by-user/" + userId,
            { headers: this.getHeaders() });
    }

    public addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(
            serverBaseUrl + "/orders", order,
            { headers: this.getHeaders() });
    }

    public getUserInfo(userId: string): Observable<User> {
        return this.http.get<User>(
            serverBaseUrl + "/users/" + userId,
            { headers: this.getHeaders() });
    }

    public getOrderReceipt(orderId: string): Observable<any> {
        return this.http.get<any>(
            serverBaseUrl + "/orders/receipt/" + orderId,
            { headers: this.getHeaders() });
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { CartInfo } from '../models/cart-info';
import { serverBaseUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) { }

    public getHeaders() {
        return { Authorization: "Bearer " + sessionStorage.getItem("token") };
    }

    // Get open cart info
    public getCartInfoByUser(userId: string): Observable<CartInfo> {
        return this.http.get<CartInfo>(
            serverBaseUrl + "/carts/date/" + userId,
            { headers: this.getHeaders() });
    }

    // Get cart with items
    public getCartById(_id: string): Observable<Cart> {
        return this.http.get<Cart>(
            serverBaseUrl + "/carts/" + _id,
            { headers: this.getHeaders() });
    }

    // Open new cart
    public addCart(cart: Cart): Observable<Cart> {
        return this.http.post<Cart>(
            serverBaseUrl + "/carts", cart,
            { headers: this.getHeaders() })
    }

    // Add item to cart
    public addItem(item: Item): Observable<Item> {
        return this.http.post<Item>(
            serverBaseUrl + "/items", item,
            { headers: this.getHeaders() });
    }

    // Remove item from cart
    public removeItem(itemId: string): Observable<string> {
        return this.http.delete<string>(
            serverBaseUrl + "/items/" + itemId,
            { headers: this.getHeaders() });
    }

    // Empty cart
    public removeItemsByCart(cartId: string): Observable<string> {
        return this.http.delete<string>(
            serverBaseUrl + "/items/by-cart/" + cartId,
            { headers: this.getHeaders() });
    }

    // Get total cart price
    public getTotalPriceByCart(cartId: string): Observable<number> {
        return this.http.get<number>(
            serverBaseUrl + "/items/totalPrice/" + cartId,
            { headers: this.getHeaders() });
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { Category } from '../models/category';
import { Cart } from '../models/cart';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})
export class GroceryService {

    public getHeaders() {
        return { Authorization: "Bearer " + sessionStorage.getItem("token") };
    }

    constructor(private http: HttpClient) { }

    public getNumProducts(): Observable<number> {
        return this.http.get<number>("http://localhost:3000/api/products/num");
    }

    public getNumOrders(): Observable<number> {
        return this.http.get<number>("http://localhost:3000/api/orders/num");
    }

    // public getAllProducts(): Observable<Product[]> {
    // 	return this.http.get<Product[]>("http://localhost:3000/api/products", { headers: this.getHeaders() });
    // }

    // public getAllOrders(): Observable<Order[]> {
    // 	return this.http.get<Order[]>("http://localhost:3000/api/orders");
    // }

    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>("http://localhost:3000/api/categories");
    }

    public getProductsByCategory(categoryId): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3000/api/products/by-category/" + categoryId, { headers: this.getHeaders() });
    }

    public getProductsByName(productName): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3000/api/products/by-name/" + productName, { headers: this.getHeaders() });
    }

    public getCartByUser(userId): Observable<Cart> {
        return this.http.get<Cart>("http://localhost:3000/api/carts/by-user/" + userId, { headers: this.getHeaders() });
    }

    public getItemsByCart(cartId): Observable<Item[]> {
        return this.http.get<Item[]>("http://localhost:3000/api/items/by-cart/" + cartId, { headers: this.getHeaders() });
    }

    public addItem(item): Observable<Item> {
        return this.http.post<Item>("http://localhost:3000/api/items", item, { headers: this.getHeaders() })
    }

    public removeItem(itemId): Observable<string> {
        return this.http.delete<string>("http://localhost:3000/api/items/"+ itemId, { headers: this.getHeaders() })
    }

    public addOrder(order): Observable<Order> {
        return this.http.post<Order>("http://localhost:3000/api/orders", order, { headers: this.getHeaders() })
    }
    
}

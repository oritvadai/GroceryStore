import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { Category } from '../models/category';

@Injectable({
	providedIn: 'root'
})
export class GroceryService {

	public getHeaders() {
		return { Authorization: "Bearer " + sessionStorage.getItem("token") };
	}

	constructor(private http: HttpClient) { }

	public getNumProducts(): Observable<number> {
		return this.http.get<number>("http://localhost:3000/api/products/sum");
	}

	public getNumOrders(): Observable<number> {
		return this.http.get<number>("http://localhost:3000/api/orders/sum");
	}

	public getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>("http://localhost:3000/api/products", { headers: this.getHeaders() });
	}

	public getAllOrders(): Observable<Order[]> {
		return this.http.get<Order[]>("http://localhost:3000/api/orders");
	}

	public getAllCategories(): Observable<Category[]> {
		return this.http.get<Category[]>("http://localhost:3000/api/categories");
	}

	public getProductsByCategory(categoryId): Observable<Product[]> {
		return this.http.get<Product[]>("http://localhost:3000/api/products/by-category/" + categoryId, { headers: this.getHeaders() });
	}
}

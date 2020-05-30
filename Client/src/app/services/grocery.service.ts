import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  
  constructor(private http: HttpClient) { }

	public getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>("http://localhost:3000/api/products");
	}

	public getAllOrders(): Observable<Order[]> {
		return this.http.get<Order[]>("http://localhost:3000/api/orders");
	}
}

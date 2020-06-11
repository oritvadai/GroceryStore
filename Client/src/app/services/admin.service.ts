import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
	providedIn: 'root'
})
export class AdminService {

	public getHeaders() {
		return { Authorization: "Bearer " + sessionStorage.getItem("token") };
	}
	constructor(private http: HttpClient) { }

	public getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>("http://localhost:3000/api/products", { headers: this.getHeaders() });
	}

	public addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>("http://localhost:3000/api/products", product, { headers: this.getHeaders() });
	}
}

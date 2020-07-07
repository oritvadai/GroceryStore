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

    public getProductById(productId): Observable<Product> {
    	return this.http.get<Product>("http://localhost:3000/api/products/" + productId, { headers: this.getHeaders() });
    }

    // public getAllProducts(): Observable<Product[]> {
    //     return this.http.get<Product[]>(
    //         "http://localhost:3000/api/products", 
    //         { headers: this.getHeaders() });
    // }

    public addProduct(productForm: FormData): Observable<FormData> {
        return this.http.post<FormData>(
            "http://localhost:3000/api/products", productForm, 
            { headers: this.getHeaders() });
    }

    public updateProduct(productId: string ,productForm: FormData): Observable<FormData> {
        return this.http.put<FormData>(
            "http://localhost:3000/api/products/" + productId, productForm, 
            { headers: this.getHeaders() });
    }
}

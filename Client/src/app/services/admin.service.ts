import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { serverBaseUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    public getHeaders() {
        return { Authorization: "Bearer " + sessionStorage.getItem("token") };
    }

    constructor(private http: HttpClient) { }

    // Get product by id for edit form
    public getProductById(productId): Observable<Product> {
        return this.http.get<Product>(
            serverBaseUrl + "/products/" + productId,
            { headers: this.getHeaders() });
    }

    // Add new product
    public addProduct(productForm: FormData): Observable<Product> {
        return this.http.post<Product>(
            serverBaseUrl + "/products/", productForm,
            { headers: this.getHeaders() });
    }

    // Edit product
    public updateProduct(productId: string, productForm: FormData): Observable<any> {
        return this.http.put<any>(
            serverBaseUrl + "/products/" + productId, productForm,
            { headers: this.getHeaders() });
    }
}

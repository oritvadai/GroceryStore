import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { serverBaseUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    public getHeaders() {
        return { Authorization: "Bearer " + sessionStorage.getItem("token") };
    }

    // Get number of available products in the store
    public getNumProducts(): Observable<number> {
        return this.http.get<number>(
            serverBaseUrl + "/products/num");
    }

    // Get all product categories
    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(
            serverBaseUrl + "/categories", { headers: this.getHeaders() });
    }

    // Get products by category
    public getProductsByCategory(categoryId: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            serverBaseUrl + "/products/by-category/" + categoryId,
            { headers: this.getHeaders() });
    }

    // Get products by name - for search
    public getProductsByName(productName: string): Observable<Product[]> {
        return this.http.get<Product[]>(
            serverBaseUrl + "/products/by-name/" + productName,
            { headers: this.getHeaders() });
    }
}

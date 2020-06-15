import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    public categories: Category[];
    public products: Product[];
    public item = new Item();

    constructor(private groceryService: GroceryService, private router: Router) { }

    ngOnInit(): void {
        this.groceryService
            .getAllCategories()
            .subscribe(
                categories => this.categories = categories,
                err => {
                    alert("You are not logged in");
                    this.router.navigateByUrl("/home");
                }
            );
    }

    public async getProductsByCategory(categoryId: string) {
        this.groceryService
            .getProductsByCategory(categoryId)
            .subscribe(products => this.products = products,
                err => alert(err.message));
    }

    // public async addToCart(productId) {

    //     this.item.cartId = "?",
    //     this.item.productId = productId,
    //     // this.item.quantity = 

    //     this.groceryService
    //     .addItem(this.item)
    //     .subscribe(item => this.item = item,
    //         err => alert(err.message));
    // }
}

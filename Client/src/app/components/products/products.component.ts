import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';
import { Category } from 'src/app/models/category';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	public products: Product[];
	public categories: Category[];
	public productsByCat: Product[];

	constructor(private groceryService: GroceryService) { }

	ngOnInit(): void {
		// this.groceryService
		// 	.getAllProducts()
		// 	.subscribe(products => this.products = products,
		// 		err => alert(err.message));

		this.groceryService
			.getAllCategories()
			.subscribe(categories => this.categories = categories,
				err => alert(err.message));
	}

	public async getProductsByCategory(categoryId: string) {
		this.groceryService
			.getProductsByCategory(categoryId)
			.subscribe(productsByCat => this.productsByCat = productsByCat,
				err => alert(err.message));
	}
}

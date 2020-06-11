import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { GroceryService } from 'src/app/services/grocery.service';
import { Category } from 'src/app/models/category';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

	public product = new Product();
	public categories: Category[];

	constructor(private adminService: AdminService, private groceryService: GroceryService) { }

	ngOnInit(): void {
		this.groceryService
			.getAllCategories()
			.subscribe(categories => this.categories = categories,
				err => alert(err.message));
	}

	add() {
		console.log(this.product);
		if (this.product) {
			this.adminService
				.addProduct(this.product)
				.subscribe(product => {
					console.log("Product Added " + product)
					// this.router.navigateByUrl("/products");
				},
					err => alert(err.message));
		}
	}
}

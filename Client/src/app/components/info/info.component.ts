import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';
import { Order } from 'src/app/models/order';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

	public productsNum: number;
	public ordersNum: number;


	constructor(private groceryService: GroceryService) { }

	ngOnInit(): void {
		this.groceryService
			.getNumProducts()
			.subscribe(productsNum => this.productsNum = productsNum,
				err => alert(err.message));

		this.groceryService
			.getNumOrders()
			.subscribe(ordersNum => this.ordersNum = ordersNum,
				err => alert(err.message));
	}
}

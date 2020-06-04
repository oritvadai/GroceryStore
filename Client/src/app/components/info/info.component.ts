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

  public products: Product[];
  public orders: Order[];


  constructor(private groceryService: GroceryService) { }

  ngOnInit(): void {
    // this.groceryService
    //   .getAllProducts()
    //   .subscribe(products => this.products = products,
    //     err => alert(err.message));

    // this.groceryService
    //   .getAllOrders()
    //   .subscribe(orders => this.orders = orders,
    //     err => alert(err.message));
  }
}

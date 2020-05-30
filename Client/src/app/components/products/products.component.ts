import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Product[];

  constructor(private groceryService: GroceryService) { }

  ngOnInit(): void {
    this.groceryService
      .getAllProducts()
      .subscribe(products => this.products = products,
        err => alert(err.message));
  }
}

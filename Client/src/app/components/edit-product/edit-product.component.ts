import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { AdminService } from 'src/app/services/admin.service';
import { GroceryService } from 'src/app/services/grocery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public product = new Product();
  public categories: Category[];

  constructor(
      private adminService: AdminService, 
      private groceryService: GroceryService,
      private activatedRoute: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.productId;
    this.product = store.getState().products.find(p => p._id === id);

    this.groceryService
      .getAllCategories()
      .subscribe(categories => this.categories = categories,
        err => alert(err.message));
  }

  edit() {
    console.log(this.product);
    if (this.product) {
      this.adminService
        .updateProduct(this.product)
        .subscribe(product => {
          console.log("Product Edited: " + product.productName)
          this.router.navigateByUrl("/admin");
        },
          err => alert(err.message));
    }
  }
}

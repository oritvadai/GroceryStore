import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  public products: Product[];

	constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService
			.getAllProducts()
			.subscribe(products => this.products = products,
				err => alert(err.message));
  }
}

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { GroceryService } from 'src/app/services/grocery.service';
import { Category } from 'src/app/models/category';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    public categories: Category[];
    public product = new Product();
    public image: File;
    public url: string;

    constructor(
        private adminService: AdminService,
        private groceryService: GroceryService,
        private router: Router,
    ) { }

    ngOnInit(): void {

        const user = store.getState().user;
        const hasToken = store.getState().hasToken;

        if (user.role != "admin") {
            alert("Access Denied");
            this.router.navigateByUrl("/home");
            return;
        }

        if (!hasToken) {
            alert("Please Login");
            this.router.navigateByUrl("/logout");
            return;
        }

        this.groceryService
            .getAllCategories()
            .subscribe(categories => this.categories = categories,
                err => alert(err.message));

    }

    public onFileSelect(event) {
        console.log(event);

        if (event.target.files.length > 0) {
            this.image = event.target.files[0];

            console.log("this.image:", this.image);

            // Preview Image
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (urlEvent) => {
                this.url = urlEvent.target.result.toString();
            }
        }
    }

    public addProduct() {

        const productForm = new FormData();
        productForm.append("productName", this.product.productName);
        productForm.append("categoryId", this.product.categoryId);
        productForm.append("unitPrice", this.product.unitPrice.toString());
        productForm.append("image", this.image, this.image.name);

        console.log(productForm.get("productName"));
        console.log(productForm.get("image"));

        this.adminService
            .addProduct(productForm)
            .subscribe(product => {
                // const action = { type: ActionType.AdminAddProduct, payload: product };
                // store.dispatch(action);

                alert(this.product.productName + " has been added");
                this.router.navigateByUrl("/admin");
            },
                err => alert(err.message));
    }
}

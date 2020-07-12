import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { Category } from 'src/app/models/category';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ActionType } from 'src/app/redux/action-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    public user = new User();
    public hasToken: boolean;

    public categories: Category[];
    public product = new Product();

    public image: File;
    public url: string;
    // public uploadBtnClicked = false;

    constructor(
        private productsService: ProductsService,
        private adminService: AdminService,
        private router: Router,
    ) { }

    ngOnInit(): void {

        this.user = store.getState().user;
        this.hasToken = store.getState().hasToken;

        // Check for role and token
        if (!this.hasToken || this.user.role != "admin") {
            alert("Access Denied, Please Login");
            this.router.navigateByUrl("/logout");
            return;
        }

        this.productsService
            .getAllCategories()
            .subscribe(categories => this.categories = categories,
                err => alert(err.message));
    }

    public onFileSelect(event) {

        if (event.target.files.length > 0) {
            this.image = event.target.files[0];

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

        this.adminService
            .addProduct(productForm)
            .subscribe(product => {

                const action = { type: ActionType.AdminAddProduct, payload: product };
                store.dispatch(action);

                alert(this.product.productName + " has been added");
            },
                err => alert(err.message));
    }
}

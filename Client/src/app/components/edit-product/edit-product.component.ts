import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { AdminService } from 'src/app/services/admin.service';
import { GroceryService } from 'src/app/services/grocery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

    public product = new Product();
    public categories: Category[];
    public image: File;
    public url: string;

    constructor(
        private adminService: AdminService,
        private groceryService: GroceryService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

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

        const id = this.activatedRoute.snapshot.params.productId;
        // this.product = store.getState().allProducts.find(p => p._id === id);

        this.adminService
            .getProductById(id)
            .subscribe(product => this.product = product,
                err => alert(err.message));

        this.groceryService
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

    editProduct() {

        const productForm = new FormData();
        productForm.append("productName", this.product.productName);
        productForm.append("categoryId", this.product.categoryId);
        productForm.append("unitPrice", this.product.unitPrice.toString());
        if (this.image) {
            productForm.append("image", this.image, this.image.name);
        }

        this.adminService
            .updateProduct(this.product._id, productForm)
            .subscribe(product => {
                // const action = { type: ActionType.AdminUpdateProduct, payload: product };
                // store.dispatch(action);

                alert(this.product.productName + " has been edited");
                this.router.navigateByUrl("/admin");
            },
                err => alert(err.message));
    }

}

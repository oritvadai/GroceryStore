import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { GroceryService } from 'src/app/services/grocery.service';
import { Category } from 'src/app/models/category';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';

// import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    public categories: Category[];
    public product = new Product();
    // public image: File;
    public url: string;

    @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
    fileUploadForm: FormGroup;
    fileInputLabel: string;


    constructor(
        private adminService: AdminService,
        private groceryService: GroceryService,
        private router: Router,
        private formBuilder: FormBuilder
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

        this.fileUploadForm = this.formBuilder.group({
            image: ['']
        });
    }

    public onFileSelect(event) {

        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            this.fileInputLabel = file.name;
            this.fileUploadForm.get("image").setValue(file);
        }

        // if (event.target.files.length > 0) {
        //     this.image = event.target.files[0];
        //     console.log(this.image);
        //     var reader = new FileReader();

        //     console.log(event);

        //     reader.readAsDataURL(event.target.files[0]);
        //     reader.onload = (urlEvent) => {
        //         this.url = urlEvent.target.result.toString();
        //     }
        // }
    }

    public addProduct() {
        // if (this.product) {

        // var reader = new FileReader();
        // reader.readAsArrayBuffer(this.image);
        // reader.onload = (arrEvent) => {
        //     // this.image = arrEvent.target.result;
        //     console.log(arrEvent.target.result);
        // }

        const productForm = new FormData();
        productForm.append("productName", this.product.productName);
        productForm.append("categoryId", this.product.categoryId);
        productForm.append("unitPrice", this.product.unitPrice.toString());
        // productForm.append("image", this.image, this.image.name);

        productForm.append("image", this.fileUploadForm.get("image").value);


        console.log(productForm.get("productName"))
        console.log(productForm.get("image"))

        // console.log(productForm)

        this.adminService
            .addProduct(productForm)
            .subscribe(product => {
                const action = { type: ActionType.AdminAddProduct, payload: product };
                store.dispatch(action);

                alert(this.product.productName + " has been added");
                this.router.navigateByUrl("/admin");
            },
                err => alert(err.message));

    }
    // }
}

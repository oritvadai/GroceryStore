import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public productName = "";
    public products: Product[];

    constructor(private groceryService: GroceryService) { }

    ngOnInit(): void {
    }

    public async search() {
        this.groceryService
            .getProductsByName(this.productName)
            .subscribe(products => this.products = products,
                err => alert(err.message));
    }

}

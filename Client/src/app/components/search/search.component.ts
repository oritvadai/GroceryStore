import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public productName = "";
    // public products: Product[];

    constructor(private groceryService: GroceryService) { }

    ngOnInit(): void {
    }

    public async search() {
        this.groceryService
            .getProductsByName(this.productName)
            .subscribe(products => {
                // this.products = products;

                const action = { type: ActionType.GetProductsView, payload: products };
                store.dispatch(action);
            },
                err => alert(err.message));
    }
}

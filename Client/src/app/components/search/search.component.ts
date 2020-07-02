import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { GroceryService } from 'src/app/services/grocery.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public productName = "";

    constructor(private groceryService: GroceryService, private router: Router) { }

    ngOnInit(): void {
    }

    public async search() {
        this.groceryService
            .getProductsByName(this.productName)
            .subscribe(products => {

                const action = { type: ActionType.GetProductsView, payload: products };
                store.dispatch(action);

                this.router.navigateByUrl("/store");
            },
                err => alert(err.message));
    }
}

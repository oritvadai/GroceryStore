import { Component, OnInit } from '@angular/core';
import { GroceryService } from 'src/app/services/grocery.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public user = new User();
    public productName = "";
    public unsubscribe: Function;

    constructor(private groceryService: GroceryService, private router: Router) { }

    ngOnInit(): void {

        this.unsubscribe = store.subscribe(() => {
            this.user = store.getState().user;
        });
    }

    public async search() {
        this.groceryService
            .getProductsByName(this.productName)
            .subscribe(products => {

                const action = { type: ActionType.GetProductsView, payload: products };
                store.dispatch(action);

                if (this.user.role == "user") {
                    this.router.navigateByUrl("/store");
                } else if (this.user.role == "admin") {
                    this.router.navigateByUrl("/admin");
                }
            },
                err => alert(err.message));
    }
}

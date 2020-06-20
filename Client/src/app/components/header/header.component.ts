import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { store } from 'src/app/redux/store';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    public user = new User();
    public hasToken: boolean;

	constructor() { }

	ngOnInit(): void {

		store.subscribe(() => {
            this.user = store.getState().user;
            this.hasToken = store.getState().hasToken;
        });
        // this.user = store.getState().user;
	}
}

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

	constructor() { }

	ngOnInit(): void {
		console.log("subscribing to store");

		store.subscribe(() => {
			this.user = store.getState().user;
			console.log("msg");
			console.log(this.user);

		});

	}
}

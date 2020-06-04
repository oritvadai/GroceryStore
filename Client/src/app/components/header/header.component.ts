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
    // store.subscribe(() => {
    //   this.user = store.getState().user;
    // });
  }

  logout() {
	sessionStorage.clear();
	console.log("logged out")
  }
}

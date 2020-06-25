import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        
        sessionStorage.clear();

        const action = { type: ActionType.Logout };
        store.dispatch(action);
        
        this.router.navigateByUrl("/home");
    }
}

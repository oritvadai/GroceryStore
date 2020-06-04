import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user = new User();
  public token = "";

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    console.log(this.user);
    if (this.user) {
      this.authService
        .register(this.user)
        .subscribe(response => {
          sessionStorage.setItem("user", JSON.stringify(response.user));
          sessionStorage.setItem("token", response.token);
          this.router.navigateByUrl("/products");
        },
          err => alert(err.message));
    }
  }
}

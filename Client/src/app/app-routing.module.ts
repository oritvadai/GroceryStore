import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "products", component: ProductsComponent },
  { path: "logout", component: LogoutComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  // { path: "**", component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

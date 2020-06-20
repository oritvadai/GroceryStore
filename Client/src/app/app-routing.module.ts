import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SearchComponent } from './components/search/search.component';
import { StoreComponent } from './components/store/store.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "store", component: StoreComponent },
//   { path: "products", component: ProductsComponent },
//   { path: "cart", component: CartComponent },
//   { path: "search", component: SearchComponent },
  { path: "admin", component: AdminComponent },
  { path: "add-product", component: AddProductComponent },
  { path: "edit-product/:productId", component: EditProductComponent },
  { path: "logout", component: LogoutComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  // { path: "**", component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

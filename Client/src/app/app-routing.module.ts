import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AdminComponent } from './components/admin/admin.component';
import { StoreComponent } from './components/store/store.component';
import { OrderComponent } from './components/order/order.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
    // Guest
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    // User
    { path: "store", component: StoreComponent },
    { path: "order", component: OrderComponent },
    // Admin
    { path: "admin", component: AdminComponent },
    // User and Admin
    { path: "logout", component: LogoutComponent },
    // Redirect
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  // { path: "**", component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

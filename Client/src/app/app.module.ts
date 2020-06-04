import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { InfoComponent } from './components/info/info.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component'

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    AboutComponent,
    InfoComponent,
    RegisterComponent,
    ProductsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

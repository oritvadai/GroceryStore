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
import { ProductsComponent } from './components/products/products.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SearchComponent } from './components/search/search.component';
import { StoreComponent } from './components/store/store.component';
import { OrderComponent } from './components/order/order.component';
import { QuantityDialogComponent } from './components/quantity-dialog/quantity-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



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
        LogoutComponent,
        CartComponent,
        AdminComponent,
        AddProductComponent,
        EditProductComponent,
        SearchComponent,
        StoreComponent,
        OrderComponent,
        QuantityDialogComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [LayoutComponent]
})
export class AppModule { }

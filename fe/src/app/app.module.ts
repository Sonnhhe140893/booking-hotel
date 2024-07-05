import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './module-products/product/product.component';
import { GallaryComponent } from './gallary/gallary.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './module-products/product-details/product-details.component';

import { CategoriesComponent } from './module-products/categories/categories.component';
import { CategoriesByIdComponent } from './module-products/categories-by-id/categories-by-id.component';
import { SimilarProductComponent } from './module-products/similar-product/similar-product.component';
import { LoginComponent } from './module-authencation/login/login.component';
import { OrderProductsComponent } from './module-order/order-products/order-products.component';
import { PaymentProductsComponent } from './module-order/payment-products/payment-products.component';
import { OrderDetailComponent } from './module-order/order-detail/order-detail.component';

import { RegisterComponent } from './module-authencation/register/register.component';
import { ForgotPasswordComponent } from './module-authencation/forgot-password/forgot-password.component';
import { AuthInterceptor } from './auth.interceptor';
import { UsersComponent } from './module-authencation/users/users.component';
import { SearchComponent } from './seach-rooms/search/search.component';
import { ManagerSystemComponent } from './admin-module/manager-system/manager-system.component';
import { ManagerProductsComponent } from './admin-module/manager-products/manager-products.component';
import { ManagerUsersComponent } from './admin-module/manager-users/manager-users.component';
import { UpdateProductComponent } from './admin-module/update-product/update-product.component';
import { UpdateUserComponent } from './admin-module/update-user/update-user.component';
import { CreateRoomComponent } from './admin-module/create-room/create-room.component';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        AboutComponent,
        MenuComponent,
        ProductComponent,
        UsersComponent,
        GallaryComponent,
        BlogsComponent,
        ContactComponent,
        ProductDetailsComponent,
        CategoriesComponent,
        CategoriesByIdComponent,
        SimilarProductComponent,
        LoginComponent,
        OrderProductsComponent,
        PaymentProductsComponent,
        OrderDetailComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        SearchComponent,

        // admin
        ManagerSystemComponent,
        ManagerProductsComponent,
        ManagerUsersComponent,
        UpdateProductComponent,
        UpdateUserComponent,
        CreateRoomComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

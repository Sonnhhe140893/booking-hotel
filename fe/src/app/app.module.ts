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
import { ProductHotComponent } from './module-products/product-hot/product-hot.component';
import { CategoriesComponent } from './module-products/categories/categories.component';
import { CategoriesByIdComponent } from './module-products/categories-by-id/categories-by-id.component';
import { SimilarProductComponent } from './module-products/similar-product/similar-product.component';
import { LoginComponent } from './module-authencation/login/login.component';
import { OrderProductsComponent } from './module-order/order-products/order-products.component';
import { PaymentProductsComponent } from './module-order/payment-products/payment-products.component';
import { OrderDetailComponent } from './module-order/order-detail/order-detail.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './module-authencation/register/register.component';
import { ForgotPasswordComponent } from './module-authencation/forgot-password/forgot-password.component';
import { AuthInterceptor } from './auth.interceptor';
import { UsersComponent } from './module-authencation/users/users.component';

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
        ProductHotComponent,
        CategoriesComponent,
        CategoriesByIdComponent,
        SimilarProductComponent,
        LoginComponent,
        OrderProductsComponent,
        PaymentProductsComponent,
        OrderDetailComponent,
        SearchComponent,
        RegisterComponent,
        ForgotPasswordComponent,
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

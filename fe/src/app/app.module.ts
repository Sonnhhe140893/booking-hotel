import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


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
import { ResigterComponent } from './module-authencation/resigter/resigter.component';
import { OrderProductsComponent } from './module-order/order-products/order-products.component';
import { PaymentProductsComponent } from './module-order/payment-products/payment-products.component';
import { OrderDetailComponent } from './module-order/order-detail/order-detail.component';
import { CartComponent } from './module-order/cart/cart.component';
import { UsersComponent } from './users-manager/users/users.component';
import { UpdateUserComponent } from './users-manager/update-user/update-user.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AboutComponent,
    MenuComponent,
    ProductComponent,
    GallaryComponent,
    BlogsComponent,
    ContactComponent,
    ProductDetailsComponent,
    ProductHotComponent,
    CategoriesComponent,
    CategoriesByIdComponent,
    SimilarProductComponent,
    LoginComponent,
    ResigterComponent,
    OrderProductsComponent,
    PaymentProductsComponent,
    OrderDetailComponent,
    CartComponent,
    UsersComponent,
    UpdateUserComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

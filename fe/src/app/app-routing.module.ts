import { CategoriesComponent } from './module-products/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './module-products/product/product.component';
import { GallaryComponent } from './gallary/gallary.component';
import { ContactComponent } from './contact/contact.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProductHotComponent } from './module-products/product-hot/product-hot.component';
import { ProductDetailsComponent } from './module-products/product-details/product-details.component';
import { CategoriesByIdComponent } from './module-products/categories-by-id/categories-by-id.component';
import { PaymentProductsComponent } from './module-order/payment-products/payment-products.component';
import { OrderDetailComponent } from './module-order/order-detail/order-detail.component';
import { LoginComponent } from './module-authencation/login/login.component';
import { RegisterComponent } from './module-authencation/register/register.component';
import { UsersComponent } from './module-authencation/users/users.component';

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'product', component: ProductComponent },
    { path: 'hot', component: ProductHotComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:id', component: CategoriesByIdComponent },
    { path: 'gallary', component: GallaryComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'blogs', component: BlogsComponent },
    { path: 'booking', component: PaymentProductsComponent },
    { path: 'orderdetail', component: OrderDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UsersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

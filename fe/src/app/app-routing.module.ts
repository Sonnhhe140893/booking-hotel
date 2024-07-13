import { UpdateUserComponent } from './admin-module/update-user/update-user.component';
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
import { ProductDetailsComponent } from './module-products/product-details/product-details.component';
import { CategoriesByIdComponent } from './module-products/categories-by-id/categories-by-id.component';
import { PaymentProductsComponent } from './module-order/payment-products/payment-products.component';
import { OrderDetailComponent } from './module-order/order-detail/order-detail.component';
import { LoginComponent } from './module-authencation/login/login.component';
import { RegisterComponent } from './module-authencation/register/register.component';
import { UsersComponent } from './module-authencation/users/users.component';
import { ManagerSystemComponent } from './admin-module/manager-system/manager-system.component';
import { ManagerProductsComponent } from './admin-module/manager-products/manager-products.component';
import { ManagerUsersComponent } from './admin-module/manager-users/manager-users.component';
import { UpdateProductComponent } from './admin-module/update-product/update-product.component';
import { CreateRoomComponent } from './admin-module/create-room/create-room.component';
import { ManagerBookingComponent } from './admin-module/manager-booking/manager-booking.component';
import { ManagerCategoryComponent } from './admin-module/manager-category/manager-category.component';
import { CreateAccountComponent } from './admin-module/create-account/create-account.component';
import { CreateCategoryComponent } from './admin-module/create-category/create-category.component';
import { UpdateCategoryComponent } from './admin-module/update-category/update-category.component';


const routes: Routes = [
    //User
    { path: '', component: HomepageComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'product', component: ProductComponent },
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
    // admin
    { path: 'manager/admin', component: ManagerSystemComponent },

    { path: 'managerproducts/admin', component: ManagerProductsComponent },
    { path: 'managerusers/admin', component: ManagerUsersComponent },
    { path: 'managerbooking/admin', component: ManagerBookingComponent },
    { path: 'managercategory/admin', component: ManagerCategoryComponent },


    { path: 'managerproducts/admin/create-room', component: CreateRoomComponent },
    { path: 'manageruseradmin/admin/create-account', component: CreateAccountComponent },
    { path: 'managercategory/admin/create-category', component: CreateCategoryComponent },

    { path: 'managerproducts/admin/:id/edit', component: UpdateProductComponent },
    { path: 'managerusers/admin/:id/edit', component: UpdateUserComponent },
    { path: 'managercategory/admin/:id/edit', component: UpdateCategoryComponent  },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

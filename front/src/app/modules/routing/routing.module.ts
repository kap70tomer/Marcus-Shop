import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { ShopComponent } from '../../components/shop/shop.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ShopGuard } from "../../Gurds/shop.guard";
import { ProductsComponent } from 'src/app/components/products/products.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { UploadFilesComponent } from 'src/app/components/upload-files/upload-files.component';
// import { AdminGuard } from 'src/app/Gurds/admin.guard';

// Array of Routes for router to navigate by url to components path.
const routes: Routes = [
  //Path's url: '', Redirect to '/home/'
  { path: "", redirectTo: "home", pathMatch: "full" },
  //Path's url: '/home/', Apps Home page.
  { path: "home", component: HomeComponent,
  children:[
    { path: "", component: LoginComponent },  
  ]},
  //Path's url: '/shop/',Navigates to shop component.
  { path: "shop", 
    canActivate: [ShopGuard], component: ShopComponent,
  // @property {array} canActive - An array of dependency-injection tokens used to look up, and determine if user can activate the component.
  // @property {class} ShopGuard - Verify Users authentication before directind to the shop component.
  children:[
    { path: "cart", component: CartComponent},
    { path: "products", component: ProductsComponent},
  ] },
  //Path's url: '/admin/', Admin \ Manager's Dashboard component.
  { path: "admin", 
    // canActivate: [AdminGuard], 
    component: AdminComponent ,
 children:[
   {path: "", component: UploadFilesComponent }
  ]},
  //Path's url: '/signup/', Sign up component.
  { path: "signup", component: SignUpComponent },
  //Path's url: '/checkout/', Checkout component.
  { path: "checkout", component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }

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


const routes: Routes = [

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent ,
  children:[//url:/home/
    { path: "", component: LoginComponent },  
  ]},
  { path: "shop", canActivate: [ShopGuard], component: ShopComponent,
  children:[//url:/shop/
    { path: "cart", component: CartComponent},
    { path: "products", component: ProductsComponent},
  ] },
  { path: "admin", component: AdminComponent ,
 children:[//url:/admin/
   {path: "", component: UploadFilesComponent }
  ]},
  { path: "signup", component: SignUpComponent},
  { path: "checkout", component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }

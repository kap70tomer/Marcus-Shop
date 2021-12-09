import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component'
import { RoutingModule } from './modules/routing/routing.module';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { AboutComponent } from './components/about/about.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserService } from './services/users.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthenticationInterceptor } from './interseptors/AuthenticationInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CategoryPipe } from './pipes/category.pipe';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HighlightSearch } from './pipes/highlight-text.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';


@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ShopComponent,
    AboutComponent,
    NotificationsComponent,
    SignUpComponent,
    AdminComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    CategoryPipe,
    NameFilterPipe,
    CheckoutComponent,
    HighlightSearch,
    UploadFilesComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    RouterModule,
    HttpClientModule,
      ],
  providers: [UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

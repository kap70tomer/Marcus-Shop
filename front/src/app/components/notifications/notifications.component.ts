import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public amountOfOrders:number;
  public amountOfProducts:number;
  public lastCarts: Cart[];
  public cart:Cart;
  public isLoggedIn:boolean;
  public isNewUser:boolean;
  public name:string;

  constructor(private ordersService:OrdersService, public userService:UserService, public cartService:CartService,private shoppingCartService:ShoppingCartService, private productsService:ProductsService) {
    this.name = this.userService.name;
    this.productsService;
    this.cartService;
    this.ordersService;
    this.amountOfOrders;
    this.amountOfProducts;
    this.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    this.isNewUser = JSON.parse(localStorage.getItem("isNewUser"));
  }
  
  ngOnInit(): void {
    // this.name = localStorage.getItem("name");
    if(this.isLoggedIn){

      let userOb = this.userService.getByUser();
      userOb.subscribe(user => {
        this.name = user.name +" "+ user.last_name }
        ,error=>{
          console.log(error.message + error.status)
        });
        
      }
    let pCounterObservable = this.productsService.counterPro();
    
    pCounterObservable.subscribe(data =>{
      this.amountOfProducts = data;
    },
    serverErrorResponse => {
      console.log("error! status: " + serverErrorResponse.status +
      " ,message " + serverErrorResponse.message);
    })
    
    let oCounterObservable = this.ordersService.counterOrders();
    
    oCounterObservable.subscribe(data =>{
      this.amountOfOrders = data
    }, serverErrorResponse => {
      console.log("error! status: " + serverErrorResponse.status 
      + " ,message " + serverErrorResponse.message);
    })

    if(this.isLoggedIn && !this.isNewUser){
        let cartsObservable = this.cartService.getUserLastCarts();    
        cartsObservable.subscribe(data =>{
          this.lastCarts = data;
          console.log(data);
        },
        serverErrorResponse => {
          console.log("error! status: " + serverErrorResponse.status +
          " ,message " + serverErrorResponse.message);
        })
      }

    let isNew = sessionStorage.getItem("isNewUser");
    if(isNew == "true") {
      this.isNewUser = true;
      return;
    }
    let isLogged = sessionStorage.getItem("isLoggedIn");
    if(isLogged == "true") {
      this.isLoggedIn = true;
      return;
    }  
  
}
  
resumeShopping(cart_id:number){

  this.shoppingCartService.cart_id = cart_id;
  //localStorage.setItem("cart_id",JSON.stringify(cart_id));
  }
}

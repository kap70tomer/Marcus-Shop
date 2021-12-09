import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { CartItemService } from 'src/app/services/cart-item.service';
import { TextFilesService } from 'src/app/services/text-files.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public text:string;
  public deliveryForm: FormGroup;
  public city: FormControl;
  public address: FormControl;
  public date: FormControl;
  public credit: FormControl;
  public total_price: number;
  public user_id: number;
  public cart_id: number;
  public userInfo:User;

  public item: Item;
  public cart_items: Item[] = [];
  public searchTerm:string;
  public order: Order


  constructor(public textFiles:TextFilesService, public userService:UserService, public shoppingCart: ShoppingCartService, private cartService: CartService, private cartItemService: CartItemService, private orderService: OrdersService) {
    this.shoppingCart.counter = this.cart_items.length;
    this.cart_id = this.shoppingCart.cart_id;
  
    this.userService.getByUser().subscribe(userInfo =>{ 
      console.log(userInfo);
      this.userService.name = userInfo.name+" "+userInfo.last_name,
      this.userService.city = userInfo.city,
      this.userService.street = userInfo.street});
    
    this.order = new Order();
    
    this.city = new FormControl("", Validators.required);
    this.address = new FormControl("", Validators.required);
    this.date = new FormControl("", Validators.required);
    this.credit = new FormControl("", [Validators.required, Validators.pattern(/^5[1-5][0-9]{14}$/)]);
    
    this.deliveryForm = new FormGroup({
      
      city: this.city,
      address: this.address,
      date: this.date,
      credit: this.credit,
      
    });
  }
  
  ngOnInit(): void {
    
    let totalObservable = this.cartItemService.getTotalOrderSum(this.cart_id);
    console.log("checkout "+ this.cart_id +" "+ this.userService.id);
    totalObservable.subscribe(total => { this.total_price = total;
    },
      error => { console.log(error)
      });

    let cartObservable = this.cartItemService.getAllCartItems();
    cartObservable.subscribe(itemsList => { this.cart_items = itemsList },
      error => { console.log(error) 
      });
      
   
  };

  onSubmit() {

    this.order = {
      cart_id: this.shoppingCart.cart_id,
      total_price: this.total_price,
      date_delivery: this.date.value,
      city_delivery: this.city.value,
      street_delivery: this.address.value,
      credit: this.credit.value.substr(this.credit.value.length - 4)
    }
    
    let orderObservable = this.orderService.createOrder(this.order);
    orderObservable.subscribe(data => {
      console.log(data);
      this.shoppingCart.cart_id = null;
    },error=>{
      alert("oops dont leave yet, order is not set: "+JSON.stringify(error.error.error));
      console.log(error);
    });
  }

  updateSearch(e) {
    this.text = e.target.value;
  }
  download(){
    this.textFiles.downloadFile(this.cart_items, 'jsontocsv',this.total_price);
  }
}

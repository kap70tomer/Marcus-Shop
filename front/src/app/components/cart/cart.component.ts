import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Item } from 'src/app/models/item';
import { CartItemService } from 'src/app/services/cart-item.service';
import { Subscription } from 'rxjs';
import { error } from 'protractor';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public cartView: Boolean = false;
  public cartItems: Subscription;
  public cart_items: Item[];
  public cart_id: number;
  public total: Subscription;
  public cost: number

  constructor(private cartService: CartService, public cartItemService: CartItemService, public shoppingCart: ShoppingCartService) {
    this.cart_id = this.shoppingCart.cart_id;
    }
  
  ngOnInit(): void {
    // check if cartService has ID for this session, load carts items or insert new cart?.
    if(!this.cart_id) {
      let observable = this.cartService.insertCart();
      observable.subscribe(data => {
        console.log(data);
        this.shoppingCart.cart_id = data;
        this.cart_id = data;
        this.cartItemService.id = data;
        this.cartItemService.refresh_needed.next();
      }, 
      errorResponse => {
        console.log("[DBG] Cart service action got Error response: ", errorResponse);
      });
    };

    this.cartItems = this.shoppingCart.cart_items.subscribe(
      itemsList => {
        this.cart_items = itemsList 
      }),
      error=>{
        console.log("[DBG]Shopping cart service failed, retriving cart's items list got error: " + error);
      };
      this.cartItems = this.cartItemService.refresh_needed.subscribe(() => {
      this.loadCartItems();
    });
    this.loadCartItems();
     
    let totalObservable = this.cartItemService.getTotalOrderSum(this.cart_id);
    totalObservable.subscribe(total => {
      this.cost = total;
      this.shoppingCart.setTotal(total);
      console.log(total);
      
    },
    error => 
    { console.log(error);
      this.shoppingCart.setTotal(0);
    });
    
    this.total = this.shoppingCart.getTotal().subscribe(total_price => {
      this.cost = total_price;
      console.log(total_price);
      
    }, error => {
      console.log(error.message);
    });
  };
  
  public loadCartItems() {
    if(!this.cart_id){ return }

    let cartItemsObservable = this.cartItemService.getAllCartItems(this.cart_id);
    cartItemsObservable.subscribe(itemsList => {
      this.shoppingCart.setCartItems(itemsList);
      console.log(itemsList);
    }, error => {
      this.shoppingCart.setCartItems([]);
      console.log(error);
    });
  }
  
  public onHideCartViewClicked(): void {
    this.cartView = !this.cartView;
  };

  public updateItem(item: Item) {
    let updateItemObservable = this.cartItemService.updateItem(item);
    updateItemObservable.subscribe(data => {
      this.shoppingCart.setTotal(data);
      // this.cart_items.push(item);
      console.log(this.cart_items);
      this.shoppingCart.setCartItems(this.cart_items);
      this.cartItemService.refresh_needed.next();
    }, error => {
      console.log(error)
    });
  };

  public removeCartItem(id, index) {
    console.log(id, index);
    this.cart_items.splice(index, 1);

    let deleteOb = this.cartItemService.removeProductFromCart(id);
    // location.reload();
    deleteOb.subscribe(data => {
      console.log(data);
      this.shoppingCart.setTotal(data)
      this.shoppingCart.setCartItems(this.cart_items);
      this.cartItemService.refresh_needed.next();
      // location.reload();
    }, error => {
      console.log(error);
    });
  };

  public clearCart() {
    let deleteOb = this.cartService.clearCart();
    deleteOb.subscribe(data => {
      
      console.log("clear cart"+ data);
      this.cartItemService.refresh_needed.next();
      // this.shoppingCart.setTotal(0);
      location.reload();
    }, error => {
      console.log(error)
    });
  };

  ngOnDestroy(): void {
    this.shoppingCart.cart_items.unsubscribe;
    
    if (this.cart_items.length === 0) {
      this.cartService.deleteCart()
      .subscribe(data => {
        this.shoppingCart.cart_id = null;
        console.log("cart is deleted !");
          console.log(data);
        }, error => {
          console.log(error)
        });
      // this.cartItems.unsubscribe();
    };
  };
};

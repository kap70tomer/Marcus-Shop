import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Cart } from '../models/cart';
import { Subject, BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements Cart {
  
  public cart_id:number;
  public user_id:number;
  public counter:number;
  public cart_items: Subject<Item[]>  ;
  public total_price: BehaviorSubject<number>;

 
  constructor() {  
  this.cart_id=0;
  this.total_price = new BehaviorSubject<number>(0);
  this.cart_items = new BehaviorSubject<Item[]>([]);
  }

  public setCartItems(cart_items){
    return this.cart_items.next(cart_items);
  }
  public clearCartItems(){
    return this.cart_items.next();
  }
  public getCartItems(){
    return this.cart_items.asObservable();
  }
  public getTotal(){
    return this.total_price.asObservable();
  }
  public setTotal(total:number){
    return this.total_price.next(total);
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  constructor(private http:HttpClient, private shoppingCart:ShoppingCartService) { 
  }
 
  public getUserLastCarts():Observable<any[]>{
    return this.http.get<any[]>(`api/carts/`);
  }
  public insertCart():Observable<number>{
    return this.http.post<number>("api/carts/add","");
  }
  public clearCart() {
    return this.http.delete(`/api/carts/clear/`+ this.shoppingCart.cart_id);
  }
  public deleteCart(){
    return this.http.delete('api/carts/'+this.shoppingCart.cart_id);
  }
  
}

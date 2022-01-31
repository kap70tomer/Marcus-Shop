import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { Item } from '../models/item';
import { tap } from 'rxjs/operators';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  public id:number;
  public refresh_needed= new Subject<void>();

  constructor(private shoppingCart:ShoppingCartService, private http:HttpClient) {
 
  }

  get refreshNeeded(){
    return this.refresh_needed;
  }

  public removeProductFromCart(item:Item): Observable<number> {
    return this.http.post<number>(`/api/items/delete`,item)
    .pipe(
      tap(()=>{
        this.refresh_needed.next()
      })
    )
  }

  public addProductToCart(cartItem: Item): Observable<number> {
    return this.http.post<number>("/api/items/add", cartItem)
    .pipe(
      tap(()=>{
        this.refresh_needed.next()
      })
    )
  }

  public getTotalOrderSum(cart_id): Observable<number> {
    return this.http.get<number>(`/api/items/total/${cart_id}`);
  }

  public updateItem(item):Observable<number>{
    return this.http.put<number>(`api/items/${item.product_id}`,item)
    .pipe(
      tap(()=>{
        this.refresh_needed.next})
        )
  }
  public getAllCartItems(cart_id): Observable<Item[]> {
    return this.http.get<Item[]>(`/api/items/${cart_id}`);
  }

}

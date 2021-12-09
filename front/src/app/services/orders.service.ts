import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
    

constructor(private http:HttpClient) { }

  public counterOrders():Observable<number>{
    return this.http.get<number>("api/orders/counter/total");
  }
  public createOrder(order:Order): Observable<void> {        
    return this.http.post<void>("api/orders/add", order);
  }

  // public changeOrder(order:Order):Observable<void>{
  //   return this.http.put<void>("api/orders/"+ order.id, order);
  // }

  // public deleteOrder(id:number):Observable<void>{
  //   return this.http.delete<void>("api/users/"+id);
  // }
}

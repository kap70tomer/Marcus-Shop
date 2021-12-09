import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(private http:HttpClient) {  }
  //Client
  public counterPro():Observable<number>{
    return this.http.get<number>("api/products/counter/total");
  }
  public getAll():Observable<Product[]>{
     return this.http.get<Product[]>("api/products");
   }
  
  //Admin
  public updateProductDetails(product:Product):Observable<void>{
     return this.http.put<void>("api/products/"+ product.id, product);
   }
  public addProduct(product:Product):Observable<void>{
     return this.http.post<void>("api/products/add", product);
   }
}

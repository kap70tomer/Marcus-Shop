import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) {
  
  }
  public getAll():Observable<Category[]>{
    return this.http.get<Category[]>("api/categories");
  }
}

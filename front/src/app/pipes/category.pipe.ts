import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';


@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipe implements PipeTransform {
 
  transform(products:Product[], categoryId: number): any {
    if(!categoryId){
      return products;
    }
    
    return products.filter(product => product.category_id == categoryId);
  }

}
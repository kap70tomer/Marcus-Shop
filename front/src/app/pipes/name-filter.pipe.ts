import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilterPipe'
})
export class NameFilterPipe implements PipeTransform {
  
  transform(products: any[], text: string=""): any[] {
   if(!products){
     return;
   }
   
    return products.filter(product => product.name.includes(text));
  };
};


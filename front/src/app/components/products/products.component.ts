import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Item } from 'src/app/models/item';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public currentProduct: Product;
  public products: Product[];
  public product: Product;
  public counter:number;
  public categories: Category[];
  public category: Category;
  public isShowAll: boolean;
  public quantity: number;
  public categoryId: number;
  public text: string;
  public total_price: number;

  constructor(private productsService: ProductsService, private cartItemService: CartItemService, public shoppingCart: ShoppingCartService, private categoriesService: CategoriesService) {
    this.categoriesService;
    this.productsService;
    this.categories = [];
    this.quantity = 1;
    this.categoryId = 0;
    this.total_price;
    this.currentProduct = new Product(0,"",0,0,"");
  }

  ngOnInit() {
    this.isShowAll = true;

    let observableP = this.productsService.getAll();
    observableP.subscribe(productsList => {
      this.products = productsList;
      console.log(this.products);
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
    let observableC = this.categoriesService.getAll();
    observableC.subscribe(categoriesList => {
      this.categories = categoriesList;
      console.log(this.categories);
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  }

  public showDetailed(product: Product) {
    //open modal 
    this.currentProduct = product;
    console.log(this.currentProduct);
    this.isShowAll = false;
  }

  public showToggle() {//Cart Component View Toggler 
    this.isShowAll = true;
    this.quantity = 1;
  }
  
  public addToCart(product: Product) {

    let cart_item: Item = {
      name: product.name,
      product_id: product.id,
      quantity: this.quantity,
      total_price: product.price,
      cart_id: this.shoppingCart.cart_id,
    }
    let itemObservabale = this.cartItemService.addProductToCart(cart_item);
    itemObservabale.subscribe(data => {
      this.shoppingCart.setTotal(data);
      this.cartItemService.refresh_needed.next();
      // location.reload();
      console.log(data);
    }
      , error => {
        console.log(error);
      });
 
  }
}

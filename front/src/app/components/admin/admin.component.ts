import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public currentProduct:Product;
  public products: Product[];
  public text: string ="";
  // public uploadedImageName;


  constructor(private uploadService:UploadFilesService, private productService: ProductsService) {
    this.products = [];
    this.currentProduct = new Product();
  }

  ngOnInit() {
    
  let observableAllPro = this.productService.getAll();
    observableAllPro.subscribe(productsList => {
      this.products = productsList;
    }, error => {
      console.log('Failed to get Products ' + error);
    });
  }
  
  
  public loadClickedProductInfo(product: Product) {
    this.currentProduct = product;
  }

  public updateProduct() {
    //in case the current product has already id meaning we need to update.
    if (this.currentProduct.id) {
      
      console.log(this.currentProduct);
      //if admin uploaded a new photo use instead current.
      if(this.uploadService.uploadedImageName){
        this.currentProduct.picture = this.uploadService.uploadedImageName;
      }
      let observable = this.productService.updateProductDetails(this.currentProduct);
      observable.subscribe(data => {
      console.log(data);
      }, error => {
        console.log('Update Product Failed! ' + JSON.stringify(error));
      });
    }
    else{
    //in case we dont have current product id means we need to add new product.
      this.currentProduct.picture = this.uploadService.uploadedImageName;
      let observable = this.productService.addProduct(this.currentProduct);
      observable.subscribe(newProduct => {
        console.log(newProduct);
      }, error => {
        console.log('Failed to Add Product! ' + JSON.stringify(error));
      }); 
     }
    this.initForm();
    }

  public initForm() {
    this.currentProduct = new Product();
    this.uploadService.uploadedImageName ="";

  }
}

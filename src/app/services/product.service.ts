import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { Product } from "../models/product";
import 'rxjs/Rx'; 
@Injectable()
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();
  constructor(private firebase: AngularFireDatabase) {}

  getProducts() {
    return this.productList = this.firebase.list("products");
  }
  insertProducts(product: Product) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location, 
      price: product.price
    });
  }

  updateProduct(product: Product) {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }
  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}

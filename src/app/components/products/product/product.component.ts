import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Product } from '../../../models/product';

import{ProductService} from '../../../services/product.service';
import {ToastrService} from 'ngx-toastr'; 
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService : ProductService,
    private toastrService :ToastrService
  ) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm : NgForm){
    if (productForm.value.$key ==null) {
      this.productService.insertProducts(productForm.value);
      this.toastrService.success('Successfull Operation','Product Add')
    }else{
      this.productService.updateProduct(productForm.value);
      this.toastrService.success('Successfull Operation','Product Edit')
    }
    this.resetForm(productForm);
 
  }

  resetForm(productForm? : NgForm){
    if (productForm !=null) {
      productForm.reset();
      this.productService.selectedProduct= new Product();
      
    }
  }

}

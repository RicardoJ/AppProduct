import { Component, OnInit } from "@angular/core";
//service
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../models/product";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  constructor(
    private productservice: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productservice
      .getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let selectField = element.payload.toJSON();
          selectField["$key"] = element.key;
          this.productList.push(selectField as Product);
        });
      });
  }
  onEdit(product: Product) {
    this.productservice.selectedProduct = Object.assign({}, product);
  }
  onDelete($key: string) {
    if (confirm("Seguro de eliminar?")) {
      this.productservice.deleteProduct($key);
      this.toastr.success("Successfull Operation", "Deleted");
    }
  }
}

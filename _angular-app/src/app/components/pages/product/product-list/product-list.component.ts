import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductNewModalComponent} from "../product-new-modal/product-new-modal.component";
import {ProductEditModalComponent} from "../product-edit-modal/product-edit-modal.component";
import {ProductDeleteModalComponent} from "../product-delete-modal/product-delete-modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product} from "../../../../models";
import {ProductInsertService} from "./product-insert.service";
import {ProductEditService} from "./product-edit.service";
import {ProductDeleteService} from "./product-delete.service";

declare const $;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products:Array<Product> = [];

    page = 1;

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    };

    @ViewChild(ProductNewModalComponent)
    productNewModal:ProductNewModalComponent;

    @ViewChild(ProductEditModalComponent)
    productEditModal:ProductEditModalComponent;

    @ViewChild(ProductDeleteModalComponent)
    productDeleteModal:ProductDeleteModalComponent;

    productId: number;

    constructor(private productHttp: ProductHttpService,
                protected productInsertService: ProductInsertService,
                protected productEditService: ProductEditService,
                protected productDeleteService: ProductDeleteService) {

        this.productInsertService.productListComponent = this;
        this.productEditService.productListComponent = this;
        this.productDeleteService.productListComponent = this;
    }

    ngOnInit() {
      console.log('ngOnit');
      this.getProducts();
    }

    getProducts(){
      this.productHttp.list({page: this.pagination.page})
          .subscribe(response => {
              this.products = response.data;
              console.log(response.meta);
              this.pagination.totalItems = response.meta.total;
              this.pagination.itemsPerPage = response.meta.per_page;
          });
    }



    pageChanged(page){
        this.pagination.page = page;
        this.getProducts();
    }

}

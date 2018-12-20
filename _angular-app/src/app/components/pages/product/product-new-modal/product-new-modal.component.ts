import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../../models";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  product: Product = {
    name: '',
    active: true,
    price: 0,
    description: ''
  }

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(public productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  submit(){
    this.productHttp
        .create(this.product)
        .subscribe((product) => {
          this.onSuccess.emit(product);
          this.modal.hide();
        }, error => this.onError.emit(error))
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: Event){
    console.log($event);
  }

}

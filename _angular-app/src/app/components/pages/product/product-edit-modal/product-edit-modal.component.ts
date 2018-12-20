import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {Product} from "../../../../models";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {


    product: Product= {
        name: '',
        active: true,
        price: 0,
        description: '',
    }

  _productId: number;

   @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
   @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


    @ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  @Input()
  set productId(value){
      console.log(value)
    this._productId = value;
    if(this._productId){
        this.productHttp
            .get(this._productId)
            .subscribe(product => this.product = product)
    }

  }

  submit(){
       this.productHttp
            .update(this._productId, this.product)
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

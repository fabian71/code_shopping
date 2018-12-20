import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";

@Injectable({
    providedIn: 'root'
})

export class ProductEditService{

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService){}

    set productListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }

    showModalEdit(productId: number){
        this._productListComponent.productId = productId;
        this._productListComponent.productEditModal.showModal();
    }



    onEditSuccess($event: any) {
        console.log($event);
        this.notifyMessage.success('Produto editada com sucesso.');
        this._productListComponent.getProducts();
    }

    onEditError($event: HttpErrorResponse) {
        console.log($event)
    }


}
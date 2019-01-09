import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductInputListComponent} from "./product-input-list.component";

@Injectable({
    providedIn: 'root'
})

export class ProductInputInsertService{

    private _productInputListComponent: ProductInputListComponent;

    constructor(private notifyMessage: NotifyMessageService){}

    set productInputListComponent(value: ProductInputListComponent){
        this._productInputListComponent = value;
    }

    showModalInsert(){

        this._productInputListComponent.inputNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Entrada criada com sucesso.');
        this._productInputListComponent.getInputs();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event)
    }
}
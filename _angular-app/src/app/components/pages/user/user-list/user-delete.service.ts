import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";

@Injectable({
    providedIn: 'root'
})

export class UserDeleteService{

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService){}

    set userListComponent(value: UserListComponent){
        this._userListComponent = value;
    }

    showModalDelete(categoryId: number) {

        this._userListComponent.userId = categoryId;
        this._userListComponent.userDeleteModal.showModal();
    }

    onDeleteSuccess($event: any) {
        this.notifyMessage.success('Usuário apagado com sucesso.');
        this._userListComponent.getUsers();
    }

    onDeleteError($event: HttpErrorResponse){
        console.log($event)
        //if($event.status == 400){
        //    this.notifyMessage.error(`Não foi possível excluir a categoria.
        //Verifique se a mesma está relacionada com algum produto.`);
        //}

        this.notifyMessage.error(`Não foi possível excluir o usuário.`);
    }



}
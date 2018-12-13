import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";

@Component({
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {

  category = null;

  _categoryId: number;

   @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
   @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


   @ViewChild(ModalComponent) modal: ModalComponent;

   constructor(private http: HttpClient) { }

  ngOnInit() {
  }

    @Input()
    set categoryId(value){
        this._categoryId = value;
        if(this._categoryId){
            const token = window.localStorage.getItem('token');
            this.http.get<{ data: any }>(`http://localhost:8000/api/categories/${value}`,{
                headers: {
                    'Authorization':`Bearer ${token}`
                }
            })
                .subscribe((response) => {
                    //this.category = response.data;
                })
        }

    }

    destroy(){
        const token = window.localStorage.getItem('token');

        this.http.delete(`http://localhost:8000/api/categories/${this._categoryId}`, {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
            .subscribe((category) => {
                this.onSuccess.emit(category);
                this.modal.hide();
                //this.getCategories();
            }, error => this.onError.emit(error))
    }



  showModal() {
    this.modal.show();
  }

  hideModal($event: Event){
    console.log($event);
  }

}

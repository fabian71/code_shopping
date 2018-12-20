import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";


export interface SearchParams {
    page?: number;
    all?: any
}

export class SearchParamsBuilder {

    constructor(private searchParams: SearchParams) {

    }

    makeObject(): any{
        const sParams: any = {
            page: this.searchParams.page + "",
        };

        if(this.searchParams.all){
            sParams.all = 1;
            delete sParams.page;
        }

        return sParams;
    }
}

export interface HttpResource<T> { //Generics

    list(searchParams: SearchParams): Observable<{data: Array<T>, meta: any }>;

    get(id: number): Observable<T>;

    create(data: T): Observable<T>;

    update(id: number, data: T): Observable<T>;

    destroy(id: number): Observable<any>;

}

/*
abstract class BaseHttp<T> implements HttpResource<T>{

    list(page: number): Observable<{ data: Array<T>; meta: any }> {
        return null;
    }

    get(id: number): Observable<T> {
        return null;
    }

    create(data: T): Observable<T> {
        return null;
    }

    update(id: number, data: T): Observable<T> {
        return null;
    }

    destroy(id: number): Observable<any> {
        return null;
    }

}*/

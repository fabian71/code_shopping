import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {ProductCategory} from "../../models";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ProductCategoryHttpService {

  //private baseApi = 'http://localhost:8000/api';

  private baseUrl = `${environment.api.url}`;

  constructor(private http: HttpClient) { }

  list(productId:number): Observable<ProductCategory>{

      const token = window.localStorage.getItem('token');

      return this.http.get<{data:ProductCategory}>
      (this.getBaseUrl(productId),
          {
              headers: {
                  'Authorization':`Bearer ${token}`
              }
          }).pipe(
              map(response => response.data)
      );
  }

  create(productId: number, categoriesId: number[]): Observable<ProductCategory>{

      const token = window.localStorage.getItem('token');

      return this.http.post<{data:ProductCategory}>
      (this.getBaseUrl(productId),
          {categories: categoriesId},
          {
              headers: {
                  'Authorization':`Bearer ${token}`
              }
          }).pipe(
          map(response => response.data)
      );

  }

  private getBaseUrl(productId: number, categoryId: number = null): string{
        let baseUrl = `${this.baseUrl}/products/${productId}/categories`;
        if(categoryId){
            baseUrl += `/${categoryId}`;
        }

        return baseUrl;
  }

}

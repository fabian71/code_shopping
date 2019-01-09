import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from 'rxjs/internal/Observable'
import {map} from 'rxjs/operators'
import {Product, ProductInput, ProductPhoto} from "../../models";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import {environment} from "../../../environments/environment";
import {forEach} from "@angular/router/src/utils/collection";


@Injectable({
    providedIn: 'root'
})

export class ProductPhotoHttpService{

    private baseApi = environment.api.url;

  constructor(private http:HttpClient) { }

  list(productId: number): Observable<{product: Product, photos: ProductPhoto[] }>{


      return this.http
          .get<{data: any}>(this.getBaseUrl(productId))
          .pipe(
              map(response => response.data)
          );
  }

  create(productId: number, files: FileList): Observable<{product: Product, photos: ProductPhoto[]}>{
      const formData = new FormData();
      const filesArray = Array.from(files);
      filesArray.forEach((file) => {
          formData.append('photos[]', file);
      });
      return this.http
          .post<any>(this.getBaseUrl(productId), formData)

  }

    update(productId: number, photoId:number, file: File): Observable<ProductPhoto>{
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('_method', 'PUT');
        return this.http
            .post<any>(this.getBaseUrl(productId, photoId), formData)
            .pipe(
                map(response => response.data)
            );
    }


    private getBaseUrl(productId: number, photoId: number =  null): string{
      let baseUrl = `${this.baseApi}/products/${productId}/photos`;
      if(photoId){
          baseUrl += `/${photoId}`;
      }
      return baseUrl;
  }


}

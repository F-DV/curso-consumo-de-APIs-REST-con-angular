import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpErrorResponse,HttpStatusCode} from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import {retry, catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {throwError} from 'rxjs';
import {checkTime} from '../interceptors/time.interceptor'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //URL Base
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient //Inyeccion de dependencia
  ) { }

  //Paginacion con parametros opcionales
  getAllProducts(limit?:number,offset?:number) {//Traemos todos los productos
    let params = new HttpParams();

    if(limit && offset){//Condicional para  validar cuadno lleguen los parametros
      params = params.set('limit',limit);
      params = params.set('offset',limit);
    }
    return this.http.get<Product[]>(this.apiUrl, {params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item =>{
        return{
          ...item,
          taxes: .19 * item.price
        }
      }))
    )
  }

  //Paginacion
  getProductsBypage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{
      params: {limit,offset}
    })
    .pipe(
      retry(3) //si la url se cae intento reconectarme 3 veces
    )
  }

  getProduct(id:string){//Traemos 1 solo producto
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error:HttpErrorResponse) =>{
        if(error.status === HttpStatusCode.Conflict){
          return throwError('ALgo sta fallando en le serve');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        return throwError('Ups algo salio mal')
      })//manejo de errores con pipe
    )
  }
  create(dto: CreateProductDTO){ //Servicio de tipo POST
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id:string,dto: UpdateProductDTO ){
     //Put : enviamos todo el cuerpo del producto
     //Patch: editar solo un atributo en particular
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
    }

  delete(id:string){//Eliminamos por id
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}


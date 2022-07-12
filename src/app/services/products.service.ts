import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //URL Base
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

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
    return this.http.get<Product[]>(this.apiUrl);
  }

  //Paginacion
  getProductsBypage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{
      params: {limit,offset}
    })
  }

  getProduct(id:string){//Traemos 1 solo producto
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
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


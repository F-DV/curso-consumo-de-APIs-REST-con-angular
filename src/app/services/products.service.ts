import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { createProductDTO, Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //URL Base
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient //Inyeccion de dependencia
  ) { }

  getAllProducts() {//Traemos todos los productos
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id:string){//Traemos 1 solo producto
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  create(dto: createProductDTO){ //Servicio de tipo POST
    return this.http.post<Product>(this.apiUrl, dto);
  }


}


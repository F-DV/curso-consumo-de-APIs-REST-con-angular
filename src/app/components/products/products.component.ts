import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;  //Pequeño estado para mostrar detalle de 1 producto

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService //Inyectamos el servicio para solicitudes HTTP
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts() //utilizamos el metodo getAll
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail= !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productsService.getProduct(id)
    .subscribe(data =>{
      console.log('Product', data);
    })
  }

}

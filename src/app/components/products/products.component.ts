import { Component, OnInit } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

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
  productChosen: Product = { //Producto elegido para mostrar
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id:'',
      name:''
    },
    description: ''
  };
  //Para paginacion dinamica
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService //Inyectamos el servicio para solicitudes HTTP
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsBypage(10,0) //utilizamos el metodo getAll
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
      this.toggleProductDetail(); //Abrimos tambien el ProductDetail
      this.productChosen = data; //Guardamos los detalle de ese produto en el producto elegido
    })
  }
  createNewProduct(){
    const product: CreateProductDTO= {
      price: 1000,
      images: [''],
      title: 'nuevo producto',
      categoryId: 2,
      description: 'bla bla bla bla'

    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log('data ',data)
      this.products.unshift(data); //Insertamos el nuevo producto en el array
    });
  }
  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'change title',
    }
    const id = this.productChosen.id;
    this.productsService.update(id,changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex ]= data;

      console.log('update',data);
    })
  }
  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(data=>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
    this.products.splice(productIndex,1);
    this.showProductDetail = false;
    })
  }

  //Paginacion dinamica
  loadMore(){
    this.productsService.getProductsBypage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);//no sobrescribe ,
      //this.products = data; //sobrescribe los articulos
      this.offset += this.limit;
    })
  }

}

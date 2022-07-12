export interface Category { //tipado para la cayegoria
  id: string;
  name: string;

}

export interface Product { //tipado para el producto
  id: string;
  title: string;
  price: number;
  images: string[]; //varias imagenes
  description: string;
  category: Category;
}

export interface CreateProductDTO extends Omit<Product, 'id'| 'category'>{ //tipado para POST DTO
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{

}



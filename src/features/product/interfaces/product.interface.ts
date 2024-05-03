export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: Type;
  gender: Gender;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  // productImages?: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
}

export interface ProductSearch {
  id: string;
  title: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  // sizes: Size[];
  // tags: string[];
  // description: string;
  // type: Type;
  // gender: Category
}

export type Gender = 'men' | 'women' | 'kids' | 'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';

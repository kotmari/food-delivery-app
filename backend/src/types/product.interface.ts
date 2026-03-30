export interface IProduct {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  shopId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface ICreateProductInput {
  name: string;
  price: number;
  image_url?: string;
  categoryId: string;
}


export interface ICreateShopInput {
  name: string;
  address: string;
  rating?: number;
  image_url?: string;
  products?: ICreateProductInput[];
}
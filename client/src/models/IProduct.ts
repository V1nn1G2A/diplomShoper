export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  characteristics: {
    [key: string]: string | undefined;
  };
  image_url: string;
  category: string;
}

export interface IProductWithQuantity extends IProduct {
  quantity: number;
}
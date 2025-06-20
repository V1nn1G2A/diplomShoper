export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  characteristics: {
    [key: string]: string | undefined;
  };
  image: string;
}

export interface IProductWithQuantity extends IProduct {
  quantity: number;
}

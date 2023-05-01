export interface ICategory {
  type: string;
  isAddition: boolean;
  title: string;
}

export interface IAddition {
  cost: number;
  isChoosed: boolean;
  title: string;
}

export interface IFreeSauces {
  title: string;
  id: string;
}

export interface ISize {
  title: string;
  id: string | null;
  cost: number;
}

export interface IOpenClose {
  message: string;
  isOpen: boolean;
  open: string;
  close: string;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  cost: number;
  image: { url: string };
  category: ICategory;
  additions?: Array<IAddition>;
  sauce?: string;
  free_sauces: IFreeSauces[];
  sizes: ISize[];
}

export interface IOrder {
  title: string;
  sauce: string | undefined;
  count: number;
  additions?: IAddition[];
  cost: number;
  category: ICategory;
  id: string;
  note?: string;
  size: ISize;
}

export interface IForm {
  name: string;
  phone: string;
  street: string;
  home: string;
  apartment: string;
  entrance: string;
  orderMethod: string;
}

export interface ISebdOrder {
  address: IForm;
  numberOrder: string;
  order: IOrder[];
  totalCost: number;
  clientPhone: string;
}

export interface IOrders {
  address: IForm;
  numberOrder: string;
  order: IOrder[];
  totalCost: Number;
}

export interface IHeader {
  logo: string;
  banner: string;
}

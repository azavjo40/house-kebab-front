export interface ICategory {
  index: number;
  type: string;
  isAddition: boolean;
  title: string;
}

export interface IAddition {
  cost: number;
  isChoosed: boolean;
  title: string;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  cost: number;
  image: string;
  category: ICategory;
  additions?: Array<IAddition>;
  sauce?: string;
}

export interface IOrder {
  title: string;
  sauce: string | undefined;
  count: number;
  additions?: IAddition[];
  cost: number;
  category: ICategory;
  id: string;
}

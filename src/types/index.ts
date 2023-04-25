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
}

import { IOpenClose, IOrder, IProduct } from "@/types";

export interface IErrorData {
  message: string;
  type: string;
}
export interface IGeneralContext {
  basketData: IOrder[];
  addOneToBasket: (data: IOrder) => void;
  updateRewriteAllBasket: (data: IOrder[]) => void;
  removeOneFromBasket: (index: number) => void;
  clearBasket: () => void;
  errorData: IErrorData;
  setError: (data: IErrorData) => void;
  getProductsByCategoryId: (id: number) => void;
  products: IProduct[];
  showInfoOpenClose: () => boolean;
  openClose: IOpenClose;
}

export type GeneralPropsType = {
  children: React.ReactNode;
};

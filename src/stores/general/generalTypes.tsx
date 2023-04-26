import { IOrder, IProduct } from "@/types";

export interface IErrorData {
  message: string;
  type: string;
}
export interface IGeneralContext {
  basketData: IOrder[];
  addOneToBasket: (data: IOrder) => void;
  updateRewriteAllBasket: (data: IOrder[]) => void;
  removeOneFromBasket: (index: number) => void;
  errorData: IErrorData;
  setError: (data: IErrorData) => void;
}

export type GeneralPropsType = {
  children: React.ReactNode;
};

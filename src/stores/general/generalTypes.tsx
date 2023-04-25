import { IProduct } from "@/types";

export interface IErrorData {
  message: string;
  type: string;
}
export interface IGeneralContext {
  basketData: Array<IProduct>;
  addToBasket: (data: Array<IProduct>) => void;
  removeToBasket: (index: number) => void;
  errorData: IErrorData;
  setError: (data: IErrorData) => void;
}

export type GeneralPropsType = {
  children: React.ReactNode;
};

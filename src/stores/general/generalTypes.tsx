import { IFormLogin, IHeader, IOpenClose, IOrder, IProduct, ISebdOrder } from "@/types";

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
  setErrorAlert: (data: IErrorData) => void;
  getProductsByCategoryId: (id: number) => void;
  products: IProduct[];
  showInfoOpenCloseStore: () => boolean;
  openClose: IOpenClose;
  makeOrder: (newOrder: ISebdOrder) => void;
  getOrdersByPhone: (phone: string) => Promise<ISebdOrder[]>;
  getHeader: () => Promise<IHeader | undefined>;
  loginAdmin: (data: IFormLogin) => void;
  jwtToken: string;
}

export type GeneralPropsType = {
  children: React.ReactNode;
};

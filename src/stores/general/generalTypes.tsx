import { ICategory, IErrorLertData, IFormLogin, IHeader, IOpenClose, IOrder, IProduct, ISebdOrder } from "@/types";
export interface IGeneralContext {
  basketData: IOrder[];
  addOneToBasket: (data: IOrder) => void;
  updateRewriteAllBasket: (data: IOrder[]) => void;
  removeOneFromBasket: (index: number) => void;
  clearBasket: () => void;
  errorAlertData: IErrorLertData;
  setErrorAlert: (data: IErrorLertData) => void;
  getProductsByCategoryId: (id: number) => void;
  products: IProduct[];
  showInfoOpenCloseStore: () => boolean;
  openClose: IOpenClose;
  makeOrder: (newOrder: ISebdOrder) => void;
  getOrdersByPhone: (phone: string) => Promise<ISebdOrder[]>;
  getHeader: () => Promise<IHeader | undefined>;
  loginAdmin: (data: IFormLogin) => void;
  jwtToken: string;
  categories: ICategory[];
  ordersForAdmin: ISebdOrder[];
}

export type GeneralPropsType = {
  children: React.ReactNode;
};

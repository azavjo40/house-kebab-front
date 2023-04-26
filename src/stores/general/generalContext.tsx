import { createContext, useState } from "react";
import { IGeneralContext, GeneralPropsType, IErrorData } from "./generalTypes";
import { IOrder } from "@/types";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  const [basketData, setBasketData] = useState<IOrder[]>([]);
  const [errorData, setErrorData] = useState<IErrorData>({ message: "", type: "" });

  const addOneToBasket = (data: IOrder) => {
    const newBasketData: IOrder[] = [data, ...basketData];
    setBasketData(newBasketData);
  };

  const updateRewriteAllBasket = (data: IOrder[]) => {
    setBasketData(data);
  };

  const removeOneFromBasket = (index: number) => {
    basketData.splice(index, 1);
    setBasketData([...basketData]);
  };

  const setError = ({ message, type }: any) => {
    setErrorData({ message, type });
    setTimeout(() => setErrorData({ message: "", type: "" }), 3000);
  };
  return (
    <GeneralContext.Provider
      value={{ basketData, addOneToBasket, removeOneFromBasket, errorData, setError, updateRewriteAllBasket }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

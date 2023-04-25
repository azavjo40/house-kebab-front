import { createContext, useState } from "react";
import { IGeneralContext, GeneralPropsType, IErrorData } from "./generalTypes";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  const [basketData, setBasketData] = useState([]);
  const [errorData, setErrorData] = useState<IErrorData>({ message: "", type: "" });
  const addToBasket = (data: any) => {
    const newBasketData: any = [...data, ...basketData];
    setBasketData(newBasketData);
  };

  const removeToBasket = (index: number) => {
    basketData.splice(index, 1);
    setBasketData([...basketData]);
  };

  const setError = ({ message, type }: any) => {
    setErrorData({ message, type });
    setTimeout(() => setErrorData({ message: "", type: "" }), 3000);
  };
  return (
    <GeneralContext.Provider value={{ basketData, addToBasket, removeToBasket, errorData, setError }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

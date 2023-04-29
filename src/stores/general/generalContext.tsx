import { createContext, useState } from "react";
import { IGeneralContext, GeneralPropsType, IErrorData } from "./generalTypes";
import { IOrder, IProduct } from "@/types";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  const [basketData, setBasketData] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [errorData, setErrorData] = useState<IErrorData>({ message: "", type: "" });

  const getProductsByCategoryId = async (id: number) => {
    try {
      const res = await fetch(process.env.apiUrl + "/products?category.id=" + id);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

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

  const clearBasket = () => {
    setBasketData([]);
  };
  return (
    <GeneralContext.Provider
      value={{
        basketData,
        addOneToBasket,
        removeOneFromBasket,
        errorData,
        setError,
        updateRewriteAllBasket,
        clearBasket,
        getProductsByCategoryId,
        products,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

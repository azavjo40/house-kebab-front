import { createContext, useEffect, useState } from "react";
import { IGeneralContext, GeneralPropsType, IErrorData } from "./generalTypes";
import { IOpenClose, IOrder, IProduct } from "@/types";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  const [basketData, setBasketData] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openClose, setOpenClose] = useState<IOpenClose>({ message: "", isOpen: false, open: "", close: "" });
  const [errorData, setErrorData] = useState<IErrorData>({ message: "", type: "" });

  useEffect(() => {
    getopenClose();
    const interval = setInterval(() => {
      getopenClose();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getProductsByCategoryId = async (id: number) => {
    try {
      const res = await fetch(process.env.apiUrl + "/products?category.id=" + id);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getopenClose = async () => {
    try {
      const res = await fetch(process.env.apiUrl + "/open-closeds");
      const data = await res.json();
      setOpenClose(data[0]);
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
    setTimeout(() => setErrorData({ message: "", type: "" }), 4000);
  };

  const clearBasket = () => {
    setBasketData([]);
  };

  const showInfoOpenClose = () => {
    if (!openClose.isOpen) setError({ message: openClose.message, type: "info" });
    return openClose.isOpen;
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
        showInfoOpenClose,
        openClose,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

import { createContext, useEffect, useState } from "react";
import { IGeneralContext, GeneralPropsType, IErrorData } from "./generalTypes";
import { IFormLogin, IOpenClose, IOrder, IProduct, ISebdOrder } from "@/types";
import { useApiFetch } from "@/hooks/useFetch";
import { isStoreOpenStore } from "@/utils/times/isStoreOpenStore";
import { getLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  const [basketData, setBasketData] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openClose, setOpenClose] = useState<IOpenClose>({ message: "", isOpen: false, open: "", close: "" });
  const [errorData, setErrorData] = useState<IErrorData>({ message: "", type: "" });
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    start();
    const interval = setInterval(() => {
      getOpenClose();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const start = () => {
    getOpenClose();
    setJwtToken(getLocalStorage("jwt"));
  };

  const getProductsByCategoryId = async (id: number) => {
    try {
      const res = await fetch(process.env.apiUrl + "/products?category.id=" + id);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getOpenClose = async () => {
    try {
      const res = await fetch(process.env.apiUrl + "/open-closeds");
      const data = await res.json();
      setOpenClose(data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const makeOrder = async (newOrder: ISebdOrder) => {
    try {
      const res = await useApiFetch(process.env.apiUrl + "/orders", {
        method: "POST",
        body: newOrder,
      });
      const data = await res?.json();
    } catch (e) {
      console.log(e);
    }
  };

  const loginAdmin = async (form: IFormLogin) => {
    try {
      const res = await useApiFetch(process.env.apiUrl + "/auth/local", {
        method: "POST",
        body: form,
      });
      const data = await res?.json();
      if (data?.jwt) {
        setJwtToken(data?.jwt);
        setLocalStorage("jwt", data?.jwt);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getHeader = async () => {
    try {
      const res = await fetch(process.env.apiUrl + "/headers");
      const data = await res?.json();
      return {
        banner: data[0]?.banner?.url,
        logo: data[0]?.logo?.url,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const getOrdersByPhone = async (phone: string) => {
    try {
      const res = await fetch(process.env.apiUrl + "/orders?clientPhone=" + phone);
      return await res?.json();
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

  const setErrorAlert = ({ message, type }: any) => {
    setErrorData({ message, type });
    setTimeout(() => setErrorData({ message: "", type: "" }), 4000);
  };

  const clearBasket = () => {
    setBasketData([]);
  };

  const showInfoOpenCloseStore = () => {
    if (openClose.isOpen && isStoreOpenStore(openClose?.open, openClose?.close)) {
      return true;
    }

    setErrorAlert({ message: openClose.message, type: "info" });
    return false;
  };

  return (
    <GeneralContext.Provider
      value={{
        basketData,
        addOneToBasket,
        removeOneFromBasket,
        errorData,
        setErrorAlert,
        updateRewriteAllBasket,
        clearBasket,
        getProductsByCategoryId,
        products,
        showInfoOpenCloseStore,
        openClose,
        makeOrder,
        getOrdersByPhone,
        getHeader,
        loginAdmin,
        jwtToken,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

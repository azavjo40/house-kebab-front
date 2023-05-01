import { createContext, useEffect, useState } from "react";
import { IGeneralContext, GeneralPropsType } from "./generalTypes";
import { ICategory, IErrorLertData, IFormLogin, IOpenClose, IOrder, IProduct, ISebdOrder } from "@/types";
import { useApiFetch } from "@/hooks/useFetch";
import { isStoreOpenStore } from "@/utils/times/isStoreOpenStore";
import { getLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  const [basketData, setBasketData] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [ordersForAdmin, setOrdersForAdmin] = useState<ISebdOrder[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [openClose, setOpenClose] = useState<IOpenClose>({ message: "", isOpen: false, open: "", close: "" });
  const [errorAlertData, setErrorAlertData] = useState<IErrorLertData>({ message: "", type: "" });
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    start();
    const interval = setInterval(() => {
      getOpenClose();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const setErrorAlert = ({ message, type }: any) => {
    console.log({ message, type });
    setErrorAlertData({ message, type });
    setTimeout(() => setErrorAlertData({ message: "", type: "" }), 4000);
  };

  const start = () => {
    getOpenClose();
    setJwtToken(getLocalStorage("jwt"));
    getCategories();
    getOrdersForAdmin();
  };

  const getProductsByCategoryId = async (id: number) => {
    try {
      const data = await useApiFetch(process.env.apiUrl + "/products?category.id=" + id, null, false, (data) =>
        setErrorAlert(data)
      );
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCategories = async () => {
    try {
      const data = await useApiFetch(process.env.apiUrl + "/categories", null, false, setErrorAlert);
      setCategories(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getOrdersForAdmin = async () => {
    try {
      const data = await useApiFetch(process.env.apiUrl + "/orders", null, true, (data) => setErrorAlert(data));
      setOrdersForAdmin(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getOpenClose = async () => {
    try {
      const data = await useApiFetch(process.env.apiUrl + "/open-closeds", null, false, setErrorAlert);
      setOpenClose(data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const makeOrder = async (newOrder: ISebdOrder) => {
    try {
      await useApiFetch(
        process.env.apiUrl + "/orders",
        {
          method: "POST",
          body: newOrder,
        },
        false,
        setErrorAlert
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loginAdmin = async (form: IFormLogin) => {
    try {
      const data = await useApiFetch(
        process.env.apiUrl + "/auth/local",
        {
          method: "POST",
          body: form,
        },
        false,
        setErrorAlert
      );
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
      const data = await useApiFetch(process.env.apiUrl + "/headers", null, false, setErrorAlert);
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
      const data = await useApiFetch(process.env.apiUrl + "/orders?clientPhone=" + phone, null, false, setErrorAlert);
      return data;
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

  const clearBasket = () => {
    setBasketData([]);
  };

  const showInfoOpenCloseStore = () => {
    if (openClose.isOpen && isStoreOpenStore(openClose?.open, openClose?.close)) {
      return true;
    }

    setErrorAlert({ message: openClose.message, type: "" });
    return false;
  };

  return (
    <GeneralContext.Provider
      value={{
        basketData,
        addOneToBasket,
        removeOneFromBasket,
        errorAlertData,
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
        categories,
        ordersForAdmin,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

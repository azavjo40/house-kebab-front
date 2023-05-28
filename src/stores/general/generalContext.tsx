import { createContext, useEffect, useState } from "react";
import { IGeneralContext, GeneralPropsType } from "./generalTypes";
import { IErrorLertData, IFormLogin, IOpenClose, IOrder, IProduct, ISebdOrder } from "@/types";
import { myApiFetch } from "@/hooks/myApiFetch";
import { isStoreOpenStore } from "@/utils/times/isStoreOpenStore";
import { getLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  const [basketData, setBasketData] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [ordersForAdmin, setOrdersForAdmin] = useState<ISebdOrder[]>([]);
  const [openClose, setOpenClose] = useState<IOpenClose>({ message: "", isOpen: false, open: "", close: "" });
  const [errorAlertData, setErrorAlertData] = useState<IErrorLertData>({ message: "", type: "" });
  const [jwtToken, setJwtToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    start();
    const interval = setInterval(() => {
      getOpenClose();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const setErrorAlert = ({ message, type }: any) => {
    setErrorAlertData({ message, type });
    setTimeout(() => setErrorAlertData({ message: "", type: "" }), 4000);
  };

  const start = () => {
    setJwtToken(getLocalStorage("jwt") ?? "");
    getOpenClose();
    getOrdersForAdmin();
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    setJwtToken(getLocalStorage("jwt") ?? "");
  };

  const getProductsByCategoryId = async (id: number) => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + "/products?category.id=" + id, null, false, (data) =>
        setErrorAlert(data)
      );
      setProducts(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getCountOrdersForAdmin = async () => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + `/orders/count`, null, true, (data) => setErrorAlert(data));
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getCountOrdersForClient = async (phone: string) => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + `/orders/count?clientPhone=${phone}`, null, true, (data) =>
        setErrorAlert(data)
      );
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdersForAdmin = async (page = 1, size = 5) => {
    const start = (page - 1) * size;
    try {
      setIsLoading(true);
      const data = await myApiFetch(
        process.env.apiUrl + `/orders?_limit=${size}&_start=${start}&_sort=created_at:desc`,
        null,
        true,
        (data) => setErrorAlert(data)
      );
      setOrdersForAdmin(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getOpenClose = async () => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + "/open-closeds", null, false, setErrorAlert);
      setOpenClose(data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const makeOrder = async (newOrder: ISebdOrder) => {
    try {
      setIsLoading(true);
      await myApiFetch(
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
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (newOrder: ISebdOrder, id: string) => {
    try {
      setIsLoading(true);
      await myApiFetch(
        process.env.apiUrl + "/orders/" + id,
        {
          method: "PUT",
          body: newOrder,
        },
        false,
        setErrorAlert
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (form: IFormLogin) => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(
        process.env.apiUrl + "/admin/login",
        {
          method: "POST",
          body: form,
        },
        false,
        setErrorAlert
      );
      if (data?.data?.token) {
        setJwtToken(data?.data?.token);
        setLocalStorage("jwt", data?.data?.token);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdersByPhone = async (phone: string, page = 1, size = 5) => {
    const start = (page - 1) * size;
    try {
      setIsLoading(true);
      const data = await myApiFetch(
        process.env.apiUrl + `/orders?clientPhone=${phone}&_limit=${size}&_start=${start}&_sort=created_at:desc`,
        null,
        false,
        setErrorAlert
      );
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
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
        loginAdmin,
        jwtToken,
        ordersForAdmin,
        getOrdersForAdmin,
        getCountOrdersForAdmin,
        updateOrder,
        getCountOrdersForClient,
        isLoading,
        logOut,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

import { createContext, useEffect, useState } from "react";
import { ISocketContext, SocketPropsType } from "./socketTypes";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<ISocketContext>({} as ISocketContext);

export const SocketContextProvider = ({ children }: SocketPropsType) => {
  const [confirmsOrderData, setConfirmsOrderData] = useState();
  const [newOrderData, setNewOrderOrderData] = useState(0);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const connectSocket = async () => {
      const socketInstance = await connectSocketAsync();
      setSocket(socketInstance);
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const connectSocketAsync = (): Promise<Socket> => {
    return new Promise((resolve, reject) => {
      const socketInstance = io("http://localhost:3001", { transports: ["websocket"] });

      socketInstance.on("739699581", (data: any) => {
        setConfirmsOrderData(data);
      });

      socketInstance.on("admin", (data: any) => {
        setNewOrderOrderData(data);
      });

      socketInstance.on("connect", () => {
        resolve(socketInstance);
      });

      socketInstance.on("connect_error", (error: any) => {
        reject(error);
      });
    });
  };

  const sendConfirmsOrder = (phone: string, minutes: string, isConfirmed: boolean) => {
    if (socket) {
      socket.emit("confirmsOrder", { phone, minutes, isConfirmed });
    }
  };

  const sendNewOrder = () => {
    if (socket) {
      socket.emit("newOrder", Date.now());
    }
  };

  return (
    <SocketContext.Provider value={{ sendConfirmsOrder, sendNewOrder, confirmsOrderData, newOrderData }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

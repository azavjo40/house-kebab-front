import { Dispatch, SetStateAction } from "react";

export interface ISocketContext {
  sendConfirmsOrder: (phone: string, minutes: string, isConfirmed: boolean) => void;
  sendNewOrder: (phone: string) => void;
  confirmsOrderData: { phone: string; minutes: string; isConfirmed: boolean };
  setConfirmsOrderData: Dispatch<SetStateAction<{ phone: string; minutes: string; isConfirmed: boolean }>>;
  newOrderData: string;
  setNewOrderOrderData: Dispatch<SetStateAction<string>>;
}

export type SocketPropsType = {
  children: React.ReactNode;
};

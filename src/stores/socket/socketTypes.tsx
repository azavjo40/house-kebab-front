export interface ISocketContext {
  sendConfirmsOrder: (phone: string, minutes: string, isConfirmed: boolean) => void;
  sendNewOrder: (phone: string) => void;
  confirmsOrderData: { phone: string; minutes: string; isConfirmed: boolean };
  newOrderData: string;
}

export type SocketPropsType = {
  children: React.ReactNode;
};

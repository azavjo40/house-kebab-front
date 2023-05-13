export interface ISocketContext {
  sendConfirmsOrder: (phone: string, minutes: string, isConfirmed: boolean) => void;
  sendNewOrder: () => void;
  confirmsOrderData: any;
  newOrderData: any;
}

export type SocketPropsType = {
  children: React.ReactNode;
};

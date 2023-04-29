import { Accordion, AccordionSummary, AccordionDetails, Typography, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { IForm, IOrder, IOrders, ISebdOrder } from "@/types";
import { useGeneral } from "@/hooks/useGeneral";
import { getLocalStorage } from "@/hooks/useLocalStorage";

export function PurchasedOrders() {
  const [orders, setOrders] = useState<ISebdOrder[]>();
  const { getOrdersByPhone } = useGeneral();

  useEffect(() => {
    const address: IForm = getLocalStorage("address");
    if (address?.phone) getPurchasedOrders(address?.phone);
  }, []);

  const getPurchasedOrders = async (phone: string) => {
    const data = await getOrdersByPhone(phone);
    setOrders(data);
  };
  return (
    <div>
      {orders?.length ? (
        <div className="w-full p-4 md:p-10">
          {orders?.map((item: IOrders, index: number) => {
            return (
              <Accordion key={index} className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>Numer zamówienia: {item?.numberOrder}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex flex-col">
                    {item?.order?.map((order: IOrder, index: number) => {
                      return (
                        <ListItem component="div" disablePadding key={index}>
                          <ListItemText primary={`${order?.count}: ${order?.title}`} />
                        </ListItem>
                      );
                    })}
                    <ListItemText primary={`Total Cost: ${item?.totalCost}`} />
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      ) : (
        <ListItemText primary="Nie masz jeszcze zamówienia!" className="text-center text-red-400" />
      )}
    </div>
  );
}

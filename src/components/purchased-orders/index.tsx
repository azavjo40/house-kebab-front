import { Accordion, AccordionSummary, AccordionDetails, Typography, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { IOrder, IOrders } from "@/types";

export function PurchasedOrders() {
  const [orders, setOrders] = useState<IOrders[]>();

  useEffect(() => {
    // for test
    const data = localStorage.getItem("orders");
    if (data) setOrders(JSON.parse(data));
  }, []);
  return (
    <div>
      {orders?.length ? (
        <div className="w-full p-4 md:p-10">
          {orders?.map((item: IOrders, index: number) => {
            return (
              <Accordion key={index} className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>Order: {item?.numberOrder}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex flex-col">
                    {item?.order?.map((order: IOrder) => {
                      return (
                        <ListItem component="div" disablePadding>
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
        <ListItemText primary="Nie masz jeszcze zakupu!" className="text-center" />
      )}
    </div>
  );
}

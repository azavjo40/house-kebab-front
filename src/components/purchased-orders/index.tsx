import { Accordion, AccordionSummary, AccordionDetails, Typography, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { IFormAddress, IOrder, IOrders, ISebdOrder } from "@/types";
import { useGeneral } from "@/hooks/useGeneral";
import { getLocalStorage } from "@/hooks/useLocalStorage";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentsIcon from "@mui/icons-material/Payments";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export function PurchasedOrders() {
  const [orders, setOrders] = useState<ISebdOrder[]>();
  const { getOrdersByPhone } = useGeneral();

  useEffect(() => {
    const address: IFormAddress = getLocalStorage("address");
    if (address?.phone) getPurchasedOrders(address?.phone?.slice(3, 12));
  }, []);

  const getPurchasedOrders = async (phone: string) => {
    const data = await getOrdersByPhone(phone);
    setOrders(data);
  };

  return (
    <div>
      {orders?.length ? (
        <div className="w-full p-4 md:p-10">
          {orders?.map((item: ISebdOrder, index: number) => {
            console.log(item);
            return (
              <Accordion key={index} className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <div className="flex justify-between w-full mr-2 items-center">
                    <div className="flex flex-col">
                      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {item?.address?.name}
                      </h2>
                      <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                        <li className="capitalize flex items-center">
                          {item?.address?.orderMethod === "delivery" ? (
                            <DeliveryDiningIcon className="mr-1" />
                          ) : (
                            <DirectionsRunIcon className="mr-1" />
                          )}
                          {item?.address?.orderMethod}
                          {item?.address?.payMethod === "card" ? (
                            <CardGiftcardIcon className="ml-1 mr-2" />
                          ) : (
                            <PaymentsIcon className="ml-1 mr-2" />
                          )}
                          PLN {item?.totalCost}
                        </li>
                        <li>Zamówienie #{item?.numberOrder}</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center">
                      <AccessTimeIcon className="mb-2" />
                      <span>20</span>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex flex-col">
                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white ml-2">
                      Szczegóły zamówienia
                    </h2>
                    {item?.order?.map((order: IOrder, index: number) => {
                      return (
                        <div className="ml-2">
                          <ul className="space-y-4 text-gray-500 list-none list-inside dark:text-gray-400">
                            <li className="capitalize">
                              <div className="flex justify-between">
                                <span>
                                  {order?.count}x {order?.title}
                                </span>
                                <span>{order?.cost},00 zł</span>
                              </div>
                              <ol className="pl-5 mt-2 space-y-1 list-inside">
                                <li className="capitalize">
                                  <div className="flex justify-between">+ sos {order?.sauce}</div>
                                </li>
                                {order?.size ? (
                                  <li className="capitalize">
                                    <div className="flex justify-between">
                                      + Rozmiar {order?.size?.title} <span>{order?.size?.cost},00 zł</span>
                                    </div>
                                  </li>
                                ) : (
                                  ""
                                )}

                                {order?.additions?.length
                                  ? order?.additions?.map((addition) => {
                                      return (
                                        <li className="capitalize">
                                          {" "}
                                          <div className="flex justify-between">
                                            <span>+ {addition?.title}</span>
                                            <span>{addition?.cost},00 zł</span>
                                          </div>
                                        </li>
                                      );
                                    })
                                  : ""}
                              </ol>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                    <ul className="space-y-4 text-gray-500 list-none list-inside dark:text-gray-400 mt-10 border-t-2 pt-3">
                      <li>
                        <div className="capitalize flex items-center">
                          {item?.address?.payMethod === "card" ? (
                            <CardGiftcardIcon className="ml-1 mr-2" />
                          ) : (
                            <PaymentsIcon className="ml-1 mr-2" />
                          )}
                          Online
                        </div>
                        <ol className="pl-5 mt-2 space-y-1  list-inside">
                          <li>
                            <div className="flex justify-between">
                              <span>suma częściowa</span>
                              <span>{item?.totalCost},00 zł</span>
                            </div>
                          </li>
                          <li>
                            <div className="flex justify-between">
                              <span>koszt dostawy</span>
                              <span>0,00 zł</span>
                            </div>
                          </li>
                          <li>
                            <div className="flex justify-between">
                              <span>Rezem</span>
                              <span>{item?.totalCost},00 zł</span>
                            </div>
                          </li>
                        </ol>
                      </li>
                    </ul>
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

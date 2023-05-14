import { withAuth } from "@/components/middleware-auth/withAuth";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGeneral } from "@/hooks/useGeneral";
import { Accordion, AccordionSummary, AccordionDetails, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IOrder, ISebdOrder } from "@/types";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentsIcon from "@mui/icons-material/Payments";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useSocket } from "@/hooks/useSocket";
import { ConfirmsOrderModal } from "@/components/confirms-order-modal/ConfirmsOrderModal";

function Home() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const { ordersForAdmin, getOrdersForAdmin, getCountOrdersForAdmin } = useGeneral();
  const { sendConfirmsOrder, newOrderData } = useSocket();
  const [openConfirmsOrderModal, setOpenConfirmsOrderModal] = useState<boolean>(false);

  useEffect(() => {
    getCountPage();
  }, []);

  useEffect(() => {
    getOrdersForAdmin(1, 5);
  }, [newOrderData]);

  const handleClickClose = () => {
    setOpenConfirmsOrderModal(false);
  };

  const handleClickOpen = (event: any) => {
    event.preventDefault();
    setOpenConfirmsOrderModal(true);
  };

  const getCountPage = async () => {
    const count = await getCountOrdersForAdmin();
    setCount(count);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    getOrdersForAdmin(value, 5);
    setPage(value);
  };

  const getTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full overflow-y-auto pb-20">
      <div className="min-h-[80vh] h-full">
        {ordersForAdmin?.length ? (
          <div className="w-full p-4 md:p-10">
            {ordersForAdmin?.map((item: ISebdOrder, index: number) => {
              return (
                <Accordion key={index} className="mb-2">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <div className="flex justify-between w-full mr-2 items-center">
                      <div className="flex flex-col">
                        <div className="flex">
                          <h2 className="mb-2 text-sm font-semibold text-gray-900 ">{item?.address?.name}</h2>
                          <h2
                            className={`mb-2 ml-4  text-[14px] cursor-pointer ${
                              item?.isConfirmed ? "text-[#1976d2]" : "text-red-500"
                            }`}
                            onClick={handleClickOpen}
                          >
                            {item?.isConfirmed ? "Potwierdzony!" : "potwierdzać!"}
                          </h2>
                        </div>

                        <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside ">
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
                      <div
                        className="flex flex-col items-center"
                        onClick={(event) => {
                          event.preventDefault();
                          setOpenConfirmsOrderModal(true);
                        }}
                      >
                        <AccessTimeIcon className="mb-2 text-blue-600" />
                        <span>{getTime(item?.created_at || "")}</span>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col">
                      <h2 className="mb-2 text-lg font-semibold text-gray-900 ">Szczegóły zamówienia</h2>
                      {item?.order?.map((order: IOrder, index: number) => {
                        return (
                          <div className="ml-2" key={index}>
                            <ul className="space-y-4 text-gray-500 list-none list-inside ">
                              <li className="capitalize">
                                <div className="flex justify-between">
                                  <span>
                                    {order?.count}x {order?.title}
                                  </span>
                                  <span>{order?.cost},00 zł</span>
                                </div>
                                <ol className="pl-5 mt-2 space-y-1 list-inside">
                                  {order?.sauce ? (
                                    <li className="capitalize">
                                      <div className="flex justify-between">+ {order?.sauce}</div>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                  {order?.size?.title ? (
                                    <li className="capitalize">
                                      <div className="flex justify-between">
                                        + {order?.size?.title} <span>{order?.size?.cost},00 zł</span>
                                      </div>
                                    </li>
                                  ) : (
                                    ""
                                  )}

                                  {order?.additions?.length
                                    ? order?.additions?.map((addition, index: number) => {
                                        return (
                                          <li className="capitalize" key={index}>
                                            {" "}
                                            <div className="flex justify-between">
                                              <span>+ {addition?.title}</span>
                                              <span>{addition?.cost},00 zł</span>
                                            </div>
                                          </li>
                                        );
                                      })
                                    : ""}

                                  {order?.note ? <li className="capitalize">Note: {order?.note}</li> : ""}
                                </ol>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                      <ul className="space-y-4 text-gray-500 list-none list-inside  mt-10 border-t-2 pt-3">
                        <li>
                          Adres i kontakt
                          <ol className="pl-5 mt-2 space-y-1  list-inside">
                            {item?.address?.orderMethod === "delivery" && (
                              <>
                                <li>
                                  Ulica: {item?.address?.street} {item?.address?.home}
                                </li>
                                <li>
                                  Mieszkanie: {item?.address?.apartment}, Klatka {item?.address?.entrance}{" "}
                                </li>
                              </>
                            )}
                            <li>Tel. {item?.address?.phone}</li>
                          </ol>
                        </li>
                      </ul>
                      <ul className="space-y-4 text-gray-500 list-none list-inside mt-10 border-t-2 pt-3">
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
                              <div className="flex justify-between capitalize">
                                <span>suma częściowa</span>
                                <span>{item?.totalCost},00 zł</span>
                              </div>
                            </li>
                            <li>
                              {item?.address?.orderMethod === "delivery" && (
                                <div className="flex justify-between capitalize">
                                  <span>koszt dostawy</span>
                                  <span>0,00 zł</span>
                                </div>
                              )}
                            </li>
                            <li>
                              <div className="flex justify-between capitalize">
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
      {count > 4 && (
        <Stack spacing={2}>
          <Pagination count={Math.ceil(count / 5)} page={page} onChange={handleChange} />
        </Stack>
      )}
      <ConfirmsOrderModal
        newOpen={openConfirmsOrderModal}
        handleClickClose={handleClickClose}
        ordersForAdmin={ordersForAdmin}
      />
    </div>
  );
}

export default withAuth(Home);

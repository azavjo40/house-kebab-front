import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Accordion, AccordionSummary, AccordionDetails, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentsIcon from "@mui/icons-material/Payments";
// import { Loader } from "@/components/loader/indext";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useGeneral } from "@/src/hooks/useGeneral";
import { useSocket } from "@/src/hooks/useSocket";
import { IOrder, ISebdOrder } from "@/src/types";
import { ConfirmsOrderModal } from "@/src/components/Admin/components/Confirms-order-modal/ConfirmsOrderModal";
import { NotificationAdmin } from "@/src/components/Admin/components/Notification-admin/NotificationAdmin";
import { withAuth } from "@/src/components/Admin/components/Middleware-auth/withAuth";

function Home() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const { ordersForAdmin, getOrdersForAdmin, getCountOrdersForAdmin } = useGeneral();
  const { newOrderData } = useSocket();
  const [openConfirmsOrderModal, setOpenConfirmsOrderModal] = useState<boolean>(false);
  const [orderForModal, setOrderForModal] = useState<ISebdOrder | any>();

  useEffect(() => {
    getCountPage();
  }, []);

  useEffect(() => {
    if (newOrderData) {
      getOrdersForAdmin(1, 5);
    }
  }, [newOrderData]);

  const handleClickClose = () => {
    setOpenConfirmsOrderModal(false);
  };

  const handleClickOpen = (order: ISebdOrder) => {
    setOrderForModal(order);
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

  return (
    <div className="w-full h-full overflow-y-auto pb-20 relative">
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
                            onClick={() => handleClickOpen(item)}
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
                      <div className="flex flex-col items-center" onClick={() => handleClickOpen(item)}>
                        <AccessTimeIcon className="mb-2 text-blue-600" />
                        <span>{item?.minutes ?? "20"} M</span>
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
                                  {order?.meat ? (
                                    <li className="capitalize">
                                      <div className="flex justify-between">+ {order?.meat}</div>
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
                          Adres i kontakt{" "}
                          <ol className="pl-5 mt-2 space-y-1  list-inside">
                            {item?.address?.orderMethod === "delivery" && (
                              <>
                                <li>
                                  Ulica: {item?.address?.street} {item?.address?.home}
                                </li>
                                <li>
                                  Mieszkanie: {item?.address?.apartment}, Klatka {item?.address?.entrance}{" "}
                                </li>
                                <li>Do klienta {item?.address?.disstance * 1000} m</li>
                                <li>
                                  <a
                                    className="text-blue-600"
                                    target="_blank"
                                    href={`https://www.google.com/maps/place/${item?.address?.street}+${item?.address?.home},Warszawa,poland`}
                                  >
                                    Otwórz w Mapach Google
                                  </a>
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
                                  <span>{item?.payDelivery ?? 0},00 zł</span>
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
        orderForModal={orderForModal}
        refreshOrdersForAdmin={getOrdersForAdmin}
        page={page}
      />
      <NotificationAdmin />
      {/* <Loader /> */}
    </div>
  );
}

export default withAuth(Home);

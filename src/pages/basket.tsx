import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useGeneral } from "../hooks/useGeneral";
import { PurchasedOrders } from "../components/Basket/components/Purchased-orders";
import { ProcessBuying } from "../components/Basket/components/Process-buying";
import { Loader } from "../components/General/components/Loader/indext";
export default function Basket() {
  const { basketData } = useGeneral();
  const [valueTab, setValueTab] = useState<number>(() => (basketData?.length ? 0 : 1));

  const changeValueTab = (index: number) => {
    setValueTab(index);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    changeValueTab(newValue);
  };
  return (
    <div className="flex h-full overflow-hidden flex-col">
      <div className="">
        <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example" className="w-[1170px]">
          <Tab label="Na etapie zakupu" />
          <Tab label="Moje  Zamówienia" />
        </Tabs>
        <Loader />
      </div>
      {valueTab === 0 ? <ProcessBuying changeValueTab={changeValueTab} /> : <PurchasedOrders />}
    </div>
  );
}

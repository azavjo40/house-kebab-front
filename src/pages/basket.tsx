import { ProcessBuying } from "@/components/process-buying";
import { PurchasedOrders } from "@/components/purchased-orders";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
export default function Basket() {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };
  return (
    <div className="flex h-full overflow-hidden flex-col">
      <div className="">
        <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example" className="w-[1170px]">
          <Tab label="Na etapie zakupu" />
          <Tab label="Zakupy" />
        </Tabs>
      </div>
      {valueTab === 0 && <ProcessBuying />}
      {valueTab === 1 && <PurchasedOrders />}
    </div>
  );
}

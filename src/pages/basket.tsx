import { BasketCard } from "@/containers/basket-card";
import { useGeneral } from "@/hooks/useGeneral";
import { IAddition, IProduct } from "@/types";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function Basket() {
  const { basketData } = useGeneral();
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(0);
    basketData?.map((product: IProduct) => {
      const resuls = product.cost;
      let reduceResults = 0;
      if (product?.additions !== undefined) {
        reduceResults = product?.additions?.reduce((accumulator: number, currentValue: IAddition) => {
          if (currentValue?.isChoosed) return accumulator + currentValue?.cost;
          return accumulator;
        }, 0);
      }
      setCost((num) => Math.floor(num + resuls + reduceResults));
    });
  }, [basketData]);
  return (
    <div className="w-full h-full overflow-y-auto px-5 py-5 mb-[160px] md:mb-0">
      <h1 className="text-2xl font-black">Koszyk</h1>
      <div className="flex flex-col w-full mb-[200px">
        {basketData?.map((product: IProduct, index: number) => (
          <BasketCard key={product?.id + index} product={product} />
        ))}
      </div>
      <div className="flex flex-col fixed bottom-[40px] md:bottom-0 w-full bg-white left-0 px-5 md:relative md:mt-16 h-[110px]">
        <div className="flex justify-between">
          <span>Razem</span> <span>{cost} zł</span>
        </div>
        <div className="w-full flex justify-end mt-5">
          <Button variant="contained" className="rounded-2xl w-full md:w-[200px] bg-blue-400 py-3 font-black text-sm">
            Kasa ({cost} zł)
          </Button>
        </div>
      </div>
    </div>
  );
}

import { BasketCard } from "@/containers/basket-card";
import { useGeneral } from "@/hooks/useGeneral";
import { IOrder } from "@/types";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function calculateCost(basketData: IOrder[]) {
  return basketData?.reduce((accumulator: number, currentValue: IOrder) => {
    return Math.floor(accumulator + currentValue?.cost * currentValue?.count);
  }, 0);
}

export default function Basket() {
  const { basketData, updateRewriteAllBasket, removeOneFromBasket } = useGeneral();
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(calculateCost(basketData));
  }, [basketData]);

  const addOneMoreOrder = (index: number) => {
    basketData[index].count += 1;
    updateRewriteAllBasket([...basketData]);
  };

  const removeOneMoreOrder = (index: number) => {
    if (basketData[index].count === 1) removeOneFromBasket(index);
    else {
      basketData[index].count -= 1;
      updateRewriteAllBasket([...basketData]);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto px-5 py-5 mb-[160px] md:mb-0">
      <h1 className="text-2xl font-black">Koszyk</h1>
      <div className="flex flex-col w-full mb-[200px">
        {basketData?.map((order: IOrder, index: number) => (
          <BasketCard
            key={order?.id + index}
            order={order}
            addOneMoreOrder={addOneMoreOrder}
            removeOneMoreOrder={removeOneMoreOrder}
            index={index}
          />
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

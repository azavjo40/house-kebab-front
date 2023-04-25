import { IAddition, IProduct } from "@/types";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

export interface IProductCardProps {
  product: IProduct;
}

export function BasketCard({ product }: IProductCardProps) {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(0);
    if (product?.additions !== undefined) {
      let resuls = product?.additions?.reduce((accumulator: number, currentValue: IAddition) => {
        if (currentValue?.isChoosed) return accumulator + currentValue?.cost;
        return accumulator;
      }, 0);
      setCost((num) => num + resuls);
    }
  }, [product]);

  return (
    <div className="">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="flex flex-row justify-between">
        <h1 className="font-black">1 {product?.title}</h1>{" "}
        <span className="font-black">{Math.floor(product?.cost + cost)} zł</span>
      </div>
      <p className="ml-2 mt-1">{product?.description?.slice(0, 40)}...</p>
      <div className="flex flex-row ml-2 mt-1 items-center">
        <span>Dodaj notatkę</span>
        <RemoveIcon className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer mr-2 ml-auto" />
        <AddIcon className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer ml-2" />
      </div>
    </div>
  );
}

import { IOrder } from "@/types";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
export interface IProductCardProps {
  order: IOrder;
  addOneMoreOrder: (index: number) => void;
  removeOneMoreOrder: (index: number) => void;
  index: number;
}

export function BasketCard({ order, addOneMoreOrder, removeOneMoreOrder, index }: IProductCardProps) {
  const [isNote, setIsNote] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  return (
    <div className="my-6 border-gray-200 dark:border-gray-700 lg:my-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-black">
          {order?.count} {order?.title}
        </h1>
        <span className="font-black">{Math.floor(order?.cost * order?.count)} zł</span>
      </div>
      <p className="ml-2 mt-1">{order?.sauce ? order?.sauce : order?.category?.title}</p>
      <div className="flex flex-row ml-2 mt-1 items-center">
        {!isNote && (
          <span className="cursor-pointer" onClick={() => setIsNote(true)}>
            {noteValue ? noteValue.slice(0, 25) : "Dodaj notatkę"}
          </span>
        )}

        {isNote && (
          <div className="border-2 p-1 flex">
            <input
              value={noteValue}
              className="p-0 outline-none"
              onChange={(event) => setNoteValue(event.target.value)}
              onBlur={() => setIsNote(false)}
            />
            <div className="cursor-pointer">
              <SaveAsIcon onClick={() => setIsNote(false)} />
            </div>
          </div>
        )}

        <div className="flex ml-auto items-center">
          <RemoveIcon
            className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer mr-2"
            onClick={() => removeOneMoreOrder(index)}
          />
          <AddIcon
            className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer"
            onClick={() => addOneMoreOrder(index)}
          />
        </div>
      </div>
    </div>
  );
}

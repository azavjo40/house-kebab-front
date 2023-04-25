import { BasketCard } from "@/containers/basket-card";
import { useGeneral } from "@/hooks/useGeneral";
import { IProduct } from "@/types";

export default function Basket() {
  const { basketData } = useGeneral();
  return (
    <div className="w-full h-full overflow-y-auto px-5 py-10 md:px-20">
      <h1 className="text-2xl font-black">Koszyk</h1>
      <div className="flex flex-col w-full">
        {basketData?.map((product: IProduct, index: number) => (
          <BasketCard key={product?.id + index} product={product} />
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { ProductCard } from "@/containers/product-card";
import { IProduct } from "@/types";
import { categories, products } from "@/constant";
import { Banner } from "@/containers/banner";

export default function Home() {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <div className="w-full h-full">
      <Banner />
      <div className="overflow-x-auto">
        <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example" className="w-[1170px]">
          {categories.map((category: any) => (
            <Tab label={category?.title} key={category?.index} />
          ))}
        </Tabs>
      </div>
      <div className="p-4 md:p-8 flex flex-row flex-wrap w-full justify-around">
        {products
          .filter((product: IProduct) => product?.category?.index === valueTab)
          .map((product: IProduct, index) => (
            <ProductCard product={product} key={product.id + index} />
          ))}
      </div>
    </div>
  );
}

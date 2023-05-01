import { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { ProductCard } from "@/containers/product-card";
import { ICategory, IProduct } from "@/types";
import { Banner } from "@/containers/banner";
import { useGeneral } from "@/hooks/useGeneral";

export interface IHomeProps {}

export default function Home() {
  const [valueTab, setValueTab] = useState(0);
  const { getProductsByCategoryId, products, categories } = useGeneral();
  const getProducts = (id: number) => {
    getProductsByCategoryId(id || 1);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    getProducts(categories[newValue]?.id);
    setValueTab(newValue);
  };

  useEffect(() => {
    getProducts(categories[0]?.id);
  }, []);

  return (
    <div className="w-full h-full">
      <Banner />
      {categories?.length && (
        <div className="overflow-x-auto">
          <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example" className="w-[1170px]">
            {categories?.map((category: ICategory, index: number) => (
              <Tab label={category?.title} key={index} />
            ))}
          </Tabs>
        </div>
      )}
      {products?.length && (
        <div className="p-4 md:p-8 flex flex-row flex-wrap w-full justify-around">
          {products.map((product: IProduct, index) => (
            <ProductCard product={product} key={product.id + index} />
          ))}
        </div>
      )}
    </div>
  );
}

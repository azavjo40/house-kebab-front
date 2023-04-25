import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Banner } from "@/containers/banner";
import { ProductCard } from "@/containers/product-card";
import { IProduct } from "@/types";
import { categories, products } from "@/constant";

export default function Home() {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <div className="w-full h-full">
      <Banner />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example">
          {categories.map((category: any) => (
            <Tab label={category?.title} key={category?.index} />
          ))}
        </Tabs>
      </Box>
      <div className="p-4 md:p-8 flex flex-row flex-wrap w-full h-full justify-around mb-14">
        {products
          .filter((product: IProduct) => product?.category?.index === valueTab)
          .map((product: IProduct, index) => (
            <ProductCard product={product} key={product.id + index} />
          ))}
      </div>
    </div>
  );
}

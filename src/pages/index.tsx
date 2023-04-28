import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { ProductCard } from "@/containers/product-card";
import { IProduct } from "@/types";
import { categories, products } from "@/constant";
import { Banner } from "@/containers/banner";

export default function Home({ product }: any) {
  const [valueTab, setValueTab] = useState(0);
  console.log(product);
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
//house-kebab-back

export async function getStaticProps() {
  try {
    const res = await fetch(
      process.env.apiUrl + "products?_limit=10&_start=0&_sort=id:DESC&_populate=category,additions"
    );
    const products = await res.json();
    return {
      props: {
        product: products,
      },
    };
  } catch (e) {
    console.log(e);
  }
}

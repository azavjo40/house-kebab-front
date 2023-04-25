import { ICategory, IProduct } from "@/types";

export const productsInit: Array<IProduct> = [
  {
    id: "1",
    title: "Tortilla cienka",
    description:
      "z surówką firmową i sosem Choice of: z kurczakiem, z baraniną, z wołowiną, z mięsem mieszanym, sos łagodny and more.",
    cost: 17,
    category: { index: 0, type: "kebab", title: "Kebab", isAddition: true },
    image:
      "https://res.cloudinary.com/tkwy-prod-eu/image/upload/c_thumb,w_2128/f_auto/q_auto/dpr_2.0/v1666025592/static-takeaway-com/images/generic/categories/1_turkish/tuerkisch_doener",
    additions: [
      { title: "Ser żółty", cost: 2, isChoosed: false },
      { title: "Ser mozarella", cost: 3, isChoosed: false },
      { title: "Frytki", cost: 3, isChoosed: false },
    ],
  },
  {
    id: "3",
    title: "Pizza Capricciosa",
    description: "tomato sauce, mozzarella cheese, ham, champignons Choice of: 30 cm, 40 cm or 50 cm.",
    cost: 17,
    category: { index: 1, type: "pizza", title: "Pizza", isAddition: true },
    image:
      "https://res.cloudinary.com/tkwy-prod-eu/image/upload/c_thumb,w_2128/f_auto/q_auto/dpr_2.0/v1681780505/static-takeaway-com/images/generic/categories/1_pizza/pizza_americanpizza",
    additions: [
      { title: "Sos pomidorowy", cost: 2, isChoosed: false },
      { title: "Sos łagodny", cost: 2, isChoosed: false },
      { title: "Sos ostry", cost: 2, isChoosed: false },
      { title: "Sos czosnkowy", cost: 2, isChoosed: false },
    ],
  },
  {
    id: "2",
    title: "Lipton Ice Tea 0,5l",
    description: "Lipton Ice Tea brzoskwiniowa 0,5l to napój bezalkoholowy na bazie herbaty czarnej.",
    cost: 4,
    category: { index: 8, type: "drink", title: "Napój", isAddition: false },
    image:
      "https://res.cloudinary.com/tkwy-prod-eu/image/upload/ar_1:1,c_thumb,h_120,w_120/f_auto/q_auto/dpr_2.0/v1666025592/static-takeaway-com/images/restaurants/pl/NPQNO35/products/lipton_cytryna_05l",
  },
];

export const products: Array<IProduct> = [
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
  ...productsInit,
];

export const categories: Array<ICategory> = [
  { index: 0, type: "kebab", title: "Kebab", isAddition: true },
  { index: 1, type: "pizza", title: "Pizza", isAddition: true },
  { index: 2, type: "set-on-plate", title: "Zestaw na Talerzu", isAddition: true },
  { index: 3, type: "denmark-letterhead", title: "Danii firmowy", isAddition: true },
  { index: 4, type: "box", title: "Box", isAddition: true },
  { index: 5, type: "falafel-vega", title: "Falafel Wega", isAddition: true },
  { index: 6, type: "salad", title: "Sałatka", isAddition: false },
  { index: 7, type: "accessories", title: "Dodatki", isAddition: false },
  { index: 8, type: "drink", title: "Napój Bezalkoholowy", isAddition: false },
];

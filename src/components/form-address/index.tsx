import { useGeneral } from "@/hooks/useGeneral";
import { IForm, IOrders } from "@/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface IFormAddressProps {
  cost: number;
  setOpenFormAdderss: any;
}

export default function FormAddress({ cost, setOpenFormAdderss }: IFormAddressProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    home: "",
    apartment: "",
    entrance: "",
    orderMethod: "delivery",
  });
  const [error, setError] = useState<any>();
  const { basketData, clearBasket, showInfoOpenClose } = useGeneral();
  const { push } = useRouter();

  //for test
  useEffect(() => {
    const data = localStorage.getItem("orders");
    if (data) {
      const getOrders: IOrders[] = JSON.parse(data);
      const address = getOrders[0]?.address;
      setForm({
        name: address?.name,
        phone: address?.phone,
        street: address?.street,
        home: address?.home,
        apartment: address?.apartment || "",
        entrance: address?.entrance || "",
        orderMethod: "delivery",
      });
    }
  }, []);

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IForm) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const order = {
      order: basketData,
      address: form,
      totalCost: cost,
      numberOrder: `#${Date.now()}BKHJKHKJ`,
    };
    //for test
    const data = localStorage.getItem("orders");
    if (data) {
      const getOrders = JSON.parse(data);
      localStorage.setItem("orders", JSON.stringify([order, ...getOrders]));
    } else localStorage.setItem("orders", JSON.stringify([order]));

    setTimeout(() => {
      push("/basket");
      clearBasket();
      setForm({ name: "", phone: "", street: "", home: "", apartment: "", entrance: "", orderMethod: "delivery" });
    }, 500);
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IForm) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const handleBlur = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    const phoneRegex = /^\+48\d{9}$/;
    if (name === "phone" && !phoneRegex.test(value)) setError((pre: any) => ({ ...pre, [name]: true }));
    else if (event.target.required) {
      setError((pre: any) => ({ ...pre, [name]: !value }));
    }
  };

  return (
    <div className="p-5 w-full pb-20 md:pb-0">
      <form onSubmit={(event) => showInfoOpenClose() && handleSubmit(event)}>
        <ArrowBackIcon onClick={() => setOpenFormAdderss(false)} className="cursor-pointer flex md:hidden" />
        <div className="flex flex-col sm:flex-row mt-2 mb-10 justify-between">
          <h1 className="text-xl sm:text-2xl">Wybierz sposób odbioru zamówienia</h1>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="delivery"
            name="orderMethod"
            onChange={handleChangeCheckbox}
          >
            <div className="flex">
              <FormControlLabel value="delivery" control={<Radio />} label="Dostawa" />
              <FormControlLabel value="pickup" control={<Radio />} label="Odbiór" />
            </div>
          </RadioGroup>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 gap-3">
          <TextField
            id="outlined-basic"
            label="Imię"
            name="name"
            variant="outlined"
            className="mb-5"
            required
            error={error?.name}
            value={form?.name}
            onChange={handleChangeTextField}
            type="name"
            onBlur={handleBlur}
            helperText={error?.name ? "Wartość nie może być pusta" : ""}
          />
          <div className="p-1 md:p-0 block md:hidden"></div>
          <TextField
            id="outlined-basic"
            label="Numer telefonu"
            name="phone"
            variant="outlined"
            className="mb-5"
            required
            error={error?.phone}
            value={form?.phone}
            onChange={handleChangeTextField}
            type="phone"
            onBlur={handleBlur}
            helperText={error?.phone ? "Twój numer telefonu musi być +48727266092" : ""}
          />
          <div className="p-1 md:p-0 block md:hidden"></div>
        </div>
        {form?.orderMethod === "delivery" && (
          <>
            <div className="grid md:grid-cols-2 md:gap-6 gap-3">
              <TextField
                id="outlined-basic"
                label="Ulica"
                name="street"
                variant="outlined"
                className="mb-5"
                required
                error={error?.street}
                value={form?.street}
                onChange={handleChangeTextField}
                type="street"
                onBlur={handleBlur}
                helperText={error?.street ? "Wartość nie może być pusta" : ""}
              />
              <div className="p-1 md:p-0 block md:hidden"></div>
              <TextField
                id="outlined-basic"
                label="Numer Dom"
                name="home"
                variant="outlined"
                className="mb-5"
                required
                error={error?.home}
                value={form?.home}
                onChange={handleChangeTextField}
                type="home"
                onBlur={handleBlur}
                helperText={error?.home ? "Wartość nie może być pusta" : ""}
              />
              <div className="p-1 md:p-0 block md:hidden"></div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6 gap-3">
              <TextField
                id="outlined-basic"
                label="Mieszkanie"
                name="apartment"
                variant="outlined"
                className="mb-5"
                value={form?.apartment}
                onChange={handleChangeTextField}
                type="apartment"
              />
              <div className="p-1 md:p-0 block md:hidden"></div>
              <TextField
                id="outlined-basic"
                label="Klatka"
                name="entrance"
                variant="outlined"
                className="mb-5"
                value={form?.entrance}
                onChange={handleChangeTextField}
                type="entrance"
              />
              <div className="p-1 md:p-0 block md:hidden"></div>
            </div>
          </>
        )}
        <div className="w-full flex md:justify-end">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Zamawiam i płacę z ( {cost} zł )
          </button>
        </div>
      </form>
    </div>
  );
}

import { useGeneral } from "@/hooks/useGeneral";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";

export interface IFormAddressProps {
  cost: number;
  setOpenFormAdderss: any;
}
export interface IForm {
  name: string;
  phone: string;
  street: string;
  home: string;
  apartment: string;
  entrance: string;
  orderMethod: string;
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
  const { basketData } = useGeneral();
  const [error, setError] = useState<any>();

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IForm) => ({ ...pre, [event.target.name]: event.target.value }));
    if (event.target.required) {
      setError((pre: any) => ({ ...pre, [event.target.name]: !event.target.value }));
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(form);
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IForm) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  return (
    <div className="p-5 w-full">
      <form onSubmit={handleSubmit}>
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
        <div className="grid md:grid-cols-2 md:gap-6">
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
          />
          <TextField
            id="outlined-basic"
            label="Numer telefonu +48727266092"
            name="phone"
            variant="outlined"
            className="mb-5"
            required
            error={error?.phone}
            value={form?.phone}
            onChange={handleChangeTextField}
            type="phone"
          />
        </div>
        {form?.orderMethod === "delivery" && (
          <>
            <div className="grid md:grid-cols-2 md:gap-6">
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
              />
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
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
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
              <TextField
                id="outlined-basic"
                label="Wejście"
                name="entrance"
                variant="outlined"
                className="mb-5"
                value={form?.entrance}
                onChange={handleChangeTextField}
                type="entrance"
              />
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

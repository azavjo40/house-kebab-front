import { useEffect, useState } from "react";
import { useGeneral } from "@/hooks/useGeneral";
import { Checkbox, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import { IAddition, IOrder, IProduct } from "@/types";
import { BootstrapDialogTitle } from "../bootstrap-dialog-title";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface IDialogChooseAdditionProps {
  product: IProduct;
}

export function DialogChooseAddition({ product }: IDialogChooseAdditionProps) {
  const [open, setOpen] = useState(false);
  const { addOneToBasket, setError } = useGeneral();
  const [order, setOrder] = useState<IOrder>({
    title: product?.title,
    sauce: product?.sauce,
    count: 1,
    additions: product?.additions,
    cost: product?.cost,
    category: product?.category,
    id: product?.id,
  });

  useEffect(() => {
    if (product.category?.isAddition) product.sauce = "Łagodny";
  }, []);

  const makeOrder = (product: IProduct, count: number = 1) => {
    const additions = product?.additions?.filter((item: IAddition) => item.isChoosed);
    const cost =
      additions?.reduce((accumulator: number, currentValue: IAddition) => {
        return Math.floor(accumulator + currentValue?.cost);
      }, product?.cost) ||
      product?.cost ||
      0;
    setOrder({
      title: product?.title,
      sauce: product?.sauce,
      count: count,
      additions,
      cost,
      category: product?.category,
      id: product?.id,
    });
  };

  useEffect(() => {
    makeOrder(product, 1);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    if (!product.category?.isAddition) {
      handleAddToBasket();
    } else setOpen(true);
  };

  const addOneMoreOrder = () => {
    makeOrder(product, (order.count += 1));
  };

  const removeOneMoreOrder = () => {
    if (order?.count !== undefined && order?.count > 1) {
      makeOrder(product, (order.count -= 1));
    }
  };

  const handleSelectChangeSouce = (event: any) => {
    product.sauce = event.target.value;
    makeOrder(product, order.count);
  };

  const handlecheckboxChangeAdditions = (event: any, getIndex: number) => {
    if (product?.additions !== undefined) {
      product.additions = product.additions?.map((addition: IAddition, index: number) => {
        if (getIndex === index) addition.isChoosed = event.target.checked;
        return addition;
      });
    }
    makeOrder(product, order.count);
  };

  const handleAddToBasket = () => {
    if (!product.category?.isAddition) addOneToBasket(order);
    else {
      addOneToBasket(order);
      setTimeout(handleClose, 500);
    }
    setError({ message: "Twój zakup został dodany!", type: "success" });
  };

  return (
    <div className="ml-auto">
      <AddIcon
        onClick={handleClickOpen}
        className="bg-slate-100 hover:bg-slate-200 w-[60px] h-[60px] md:w-[40px] md:h-[40px] z-0 rounded-full p-1 cursor-pointer"
      />
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {product?.title}
        </BootstrapDialogTitle>
        <DialogContent dividers className="w-full  min-w-[300px] md:min-w-[350px]">
          <div className="mb-3">
            <FormLabel id="demo-radio-buttons-group-label">Wybierz sos</FormLabel>
          </div>
          <FormControl className="w-full ml-1">
            <InputLabel id="demo-simple-select-autowidth-label">Sos:</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Sos"
              value={product?.sauce}
              onChange={handleSelectChangeSouce}
              name="sauce"
            >
              <MenuItem value="Ostry">Ostry</MenuItem>
              <MenuItem value="Łagodny">Łagodny</MenuItem>
              {product.category?.index === 0 && <MenuItem value="Mieszaniny">Mieszaniny</MenuItem>}
              {product.category?.index === 1 && <MenuItem value="Czosnkowy">Czosnkowy</MenuItem>}
              {product.category?.index === 1 && <MenuItem value="Pomidorowy ">Pomidorowy</MenuItem>}
            </Select>
          </FormControl>

          <div className="mt-5 flex flex-col">
            <FormLabel id="demo-radio-buttons-group-label">Wybierz dodatkowe</FormLabel>
            {product?.additions?.map((item: IAddition, index: number) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={item?.isChoosed}
                    required
                    onChange={(event) => handlecheckboxChangeAdditions(event, index)}
                  />
                }
                label={item?.title + " " + item?.cost + " zł"}
                className="ml-1"
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <div className="mr-auto">
            <RemoveIcon
              className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer mr-2"
              onClick={removeOneMoreOrder}
            />
            <FormLabel id="demo-radio-buttons-group-label">{order?.count}</FormLabel>
            <AddIcon
              className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer ml-2"
              onClick={addOneMoreOrder}
            />
          </div>
          <Button variant="contained" className="rounded-2xl w-[150px] bg-blue-400" onClick={handleAddToBasket}>
            {Math.floor(order.cost * order.count)} zł
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

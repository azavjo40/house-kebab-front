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
import { IAddition, IFreeSauces, IOrder, IProduct, ISize } from "@/types";
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
  const [sauce, setSauce] = useState("Łagodny");
  const [size, setSize] = useState<ISize>({ cost: 0, id: "", title: "" });
  const { addOneToBasket, setErrorAlert, showInfoOpenCloseStore } = useGeneral();
  const [order, setOrder] = useState<IOrder>({
    title: product?.title,
    sauce,
    count: 1,
    additions: product?.additions,
    cost: product?.cost,
    category: product?.category,
    id: product?.id,
    size,
  });

  const makeOrder = (product: IProduct, count: number = 1, sizeOrder: ISize) => {
    const additions = product?.additions?.filter((item: IAddition) => item.isChoosed);
    const cost =
      additions?.reduce((accumulator: number, currentValue: IAddition) => {
        return Math.floor(accumulator + currentValue?.cost);
      }, product?.cost + sizeOrder.cost) ||
      product?.cost ||
      0;
    setOrder({
      title: product?.title,
      sauce,
      count: count,
      additions,
      cost,
      category: product?.category,
      id: product?.id,
      size: sizeOrder,
    });
  };

  useEffect(() => {
    makeOrder(product, 1, size);
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
    makeOrder(product, (order.count += 1), size);
  };

  const removeOneMoreOrder = () => {
    if (order?.count !== undefined && order?.count > 1) {
      makeOrder(product, (order.count -= 1), size);
    }
  };

  const handleSelectChangeSouce = (event: any) => {
    setSauce(event.target.value);
    makeOrder(product, order.count, size);
  };

  const handleSelectChangeSize = (event: any) => {
    if (product?.sizes?.length) {
      const results = product.sizes?.filter((sizeFil: ISize) => sizeFil?.title === event.target.value);
      if (results?.length) {
        setSize(results[0]);
        makeOrder(product, order.count, results[0]);
      }
    }
  };

  const handlecheckboxChangeAdditions = (event: any, getIndex: number) => {
    if (product?.additions !== undefined) {
      product.additions = product.additions?.map((addition: IAddition, index: number) => {
        if (getIndex === index) addition.isChoosed = event.target.checked;
        return addition;
      });
    }
    makeOrder(product, order.count, size);
  };

  const handleAddToBasket = () => {
    console.log(order);
    if (!product.category?.isAddition) addOneToBasket(order);
    else {
      addOneToBasket(order);
      setTimeout(handleClose, 500);
    }
    setErrorAlert({ message: "Twój zakup został dodany do koszyk!", type: "success" });
  };

  return (
    <div className="ml-auto">
      <AddIcon
        onClick={() => showInfoOpenCloseStore() && handleClickOpen()}
        className="bg-slate-100 hover:bg-slate-200 w-[60px] h-[60px] md:w-[40px] md:h-[40px] z-0 rounded-full p-1 cursor-pointer"
      />
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {product?.title}
        </BootstrapDialogTitle>
        <DialogContent dividers className="w-full  min-w-[300px] md:min-w-[350px]">
          {product?.free_sauces?.length && (
            <>
              <div className="mb-3">
                <FormLabel id="demo-radio-buttons-group-label">Wybierz sos</FormLabel>
              </div>
              <FormControl className="w-full ml-1">
                <InputLabel id="demo-simple-select-autowidth-label">Sos:</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-sauce"
                  label="Sos"
                  value={order?.sauce}
                  onChange={handleSelectChangeSouce}
                  name="sauce"
                >
                  {product?.free_sauces.map((item: IFreeSauces) => {
                    return (
                      <MenuItem key={item?.id} value={item?.title}>
                        {item?.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </>
          )}

          {product?.sizes?.length && (
            <>
              <div className="mb-3 mt-3">
                <FormLabel id="demo-radio-buttons-group-label">Wybierz Rozmiar</FormLabel>
              </div>
              <FormControl className="w-full ml-1">
                <InputLabel id="demo-simple-select-autowidth-label">Rozmiar:</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-size"
                  label="Rozmiar"
                  onChange={handleSelectChangeSize}
                  name="sauce"
                >
                  {product?.sizes.map((item: ISize) => {
                    return (
                      <MenuItem key={item?.title} value={item?.title}>
                        {item?.title + " " + item?.cost + " zł"}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </>
          )}
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

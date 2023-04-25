import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useGeneral } from "@/hooks/useGeneral";
import AddIcon from "@mui/icons-material/Add";
import { Checkbox, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { IAddition, IProduct } from "@/types";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface IDialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: IDialogTitleProps) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export interface IDialogChooseAdditionProps {
  product: IProduct;
}

export function DialogChooseAddition({ product }: IDialogChooseAdditionProps) {
  const [value, setValue] = useState("Łagodny");
  const [open, setOpen] = useState(false);
  const { addToBasket, setError } = useGeneral();
  const [cost, setCost] = useState(0);
  const [products, setProducts] = useState<Array<IProduct>>([product]);

  const countCost = () => {
    const result: number | undefined = product?.additions?.reduce((accumulator: number, currentValue: IAddition) => {
      if (currentValue?.isChoosed) return accumulator + currentValue?.cost;
      return accumulator;
    }, product?.cost);
    setCost(result ? result : 0);
  };

  const handleClose = () => {
    setOpen(false);
    setProducts([product]);
  };

  const handleClickOpen = () => {
    countCost();
    if (!product.category?.isAddition) {
      handleAddToBasket();
    } else setOpen(true);
  };

  const addOneMore = () => {
    setProducts((pre: Array<IProduct>) => [...pre, pre[0]]);
  };

  const removeOneMore = () => {
    if (products?.length > 1) {
      products?.splice(0, 1);
      setProducts([...products]);
    }
  };

  const handleSelectChange = (event: any) => {
    setValue(event.target.value);
    const results = products.map((item: any) => {
      item = { ...item, [event.target.name]: event.target.value };
      return item;
    });
    setProducts(results);
  };

  const handlecheckboxChange = (event: any, index: number) => {
    const results = products.map((item: IProduct) => {
      if (item?.additions !== undefined) {
        item.additions[index] = { ...item.additions[index], isChoosed: event.target.checked };
      }
      return item;
    });
    setProducts(results);
    countCost();
  };

  const handleAddToBasket = () => {
    if (!product.category?.isAddition) addToBasket(products);
    else {
      addToBasket(products);
      setTimeout(handleClose, 500);
    }
    setProducts([product]);
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
              value={value}
              onChange={handleSelectChange}
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
                control={<Checkbox required onChange={(event) => handlecheckboxChange(event, index)} />}
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
              onClick={removeOneMore}
            />
            <FormLabel id="demo-radio-buttons-group-label">{products?.length}</FormLabel>
            <AddIcon
              className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer ml-2"
              onClick={addOneMore}
            />
          </div>
          <Button variant="contained" className="rounded-2xl w-[150px] bg-blue-400" onClick={handleAddToBasket}>
            {Math.floor(cost * products?.length)} zł
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

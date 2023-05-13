import { useGeneral } from "@/hooks/useGeneral";
import { useSocket } from "@/hooks/useSocket";
import { ISebdOrder } from "@/types";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

interface Props {
  newOpen: boolean;
  handleClickOpen: () => void;
  ordersForAdmin: ISebdOrder[];
}

export function ConfirmsOrderModal({ newOpen, handleClickOpen, ordersForAdmin }: Props) {
  const [open, setOpen] = useState(newOpen);
  const { newOrderData, sendConfirmsOrder } = useSocket();
  const [minutes, setMinutes] = useState<string>("20");
  const { updateOrder } = useGeneral();

  useEffect(() => {
    setOpen(!!newOrderData);
    if (newOrderData) {
      setTimeout(audioPlay, 1000);
    }
  }, [newOrderData]);

  const handleClose = () => {
    setOpen(false);
    handleClickOpen();
  };

  const audioPlay = () => {
    const audio = new Audio();
    audio.src = process.env.wcUrl ?? "" + "/audio";
    audio.play();
  };

  const sendHandler = async () => {
    sendConfirmsOrder(ordersForAdmin[0]?.clientPhone ?? newOrderData, minutes, true);
    const order = { ...ordersForAdmin[0] };
    order.isConfirmed = true;
    order.isDelivered = false;
    order.minutes = minutes;
    console.log(order);
    await updateOrder(order, order?.id ?? "");
    handleClose();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMinutes(event.target.value as string);
  };

  return (
    <Dialog
      open={open || newOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Potwierdzenie zamówienia"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={minutes}
              label=""
              onChange={handleChange}
            >
              <MenuItem value="20">20 Minutes</MenuItem>
              <MenuItem value="40">40 Minutes</MenuItem>
              <MenuItem value="60">60 Minutes</MenuItem>
              <MenuItem value="80">80 Minutes</MenuItem>
              <MenuItem value="100">100 Minutes</MenuItem>
              <MenuItem value="120">120 Minutes</MenuItem>
              <MenuItem value="140">140 Minutes</MenuItem>
              <MenuItem value="160">160 Minutes</MenuItem>
              <MenuItem value="180">180 Minutes</MenuItem>
              <MenuItem value="200">200 Minutes</MenuItem>
            </Select>
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={sendHandler}>Zaakceptować</Button>
        <Button onClick={handleClose}>Nie akceptować</Button>
      </DialogActions>
    </Dialog>
  );
}

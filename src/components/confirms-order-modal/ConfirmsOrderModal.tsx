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
  handleClickClose: () => void;
  ordersForAdmin: ISebdOrder[];
  refreshOrdersForAdmin: (page?: number | undefined, size?: number | undefined) => void;
}

export function ConfirmsOrderModal({ newOpen, handleClickClose, ordersForAdmin, refreshOrdersForAdmin }: Props) {
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
    handleClickClose();
  };

  const audioPlay = () => {
    const audio = new Audio();
    audio.src = process.env.api1Url ?? "" + "/audio";
    audio.play();
  };

  const sendHandler = async () => {
    const order = { ...ordersForAdmin[0] };
    order.isConfirmed = true;
    order.isDelivered = false;
    order.minutes = minutes;
    console.log(order);
    await updateOrder(order, order?.id ?? "");
    sendConfirmsOrder(ordersForAdmin[0]?.clientPhone ?? newOrderData, minutes, true);
    refreshOrdersForAdmin(1, 5);
    handleClose();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMinutes(event.target.value as string);
  };

  return (
    <div>
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
          <Button onClick={handleClose}>Zamknąć</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

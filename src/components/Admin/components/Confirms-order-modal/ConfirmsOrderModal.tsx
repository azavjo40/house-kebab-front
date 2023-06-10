import { useGeneral } from "@/src/hooks/useGeneral";
import { useSocket } from "@/src/hooks/useSocket";
import { ISebdOrder } from "@/src/types";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

interface Props {
  newOpen: boolean;
  handleClickClose: () => void;
  orderForModal: ISebdOrder;
  refreshOrdersForAdmin: (page?: number | undefined, size?: number | undefined) => void;
  page: number;
}

export function ConfirmsOrderModal({ newOpen, handleClickClose, orderForModal, refreshOrdersForAdmin, page }: Props) {
  const [open, setOpen] = useState(newOpen);
  const { newOrderData, sendConfirmsOrder } = useSocket();
  const [minutes, setMinutes] = useState<string>("20");
  const { updateOrder } = useGeneral();

  const handleClose = () => {
    setOpen(false);
    handleClickClose();
  };

  const sendHandler = async () => {
    orderForModal.isConfirmed = true;
    orderForModal.isDelivered = false;
    orderForModal.minutes = minutes;

    await updateOrder(orderForModal, orderForModal?.id ?? "");
    sendConfirmsOrder(orderForModal?.clientPhone ?? newOrderData, minutes, true);
    refreshOrdersForAdmin(page, 5);
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

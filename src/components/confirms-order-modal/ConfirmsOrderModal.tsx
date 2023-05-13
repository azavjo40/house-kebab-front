import { useSocket } from "@/hooks/useSocket";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

interface Props {
  newOpen?: boolean;
}

export function ConfirmsOrderModal({ newOpen }: Props) {
  const [open, setOpen] = useState(newOpen ?? false);
  const { newOrderData } = useSocket();
  const [mitutes, setMinutes] = useState<string>("20");

  useEffect(() => {
    setOpen(!!newOrderData);
    if (newOrderData) {
      setTimeout(audioPlay, 1000);
    }
  }, [newOrderData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const audioPlay = () => {
    const audio = new Audio();
    audio.src = "http://localhost:3001/audio";
    audio.play();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMinutes(event.target.value as string);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}></Button> */}
      <Dialog
        open={open}
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
                value={mitutes}
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
          <Button>Zaakceptować</Button>
          <Button>Nie akceptować</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { DialogChooseAddition } from "@/components/Product/components/Dialog-choose-addition";
import { IProduct } from "@/types";
import { Box, Rating } from "@mui/material";
import { useState } from "react";

export interface IProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: IProductCardProps) {
  const [value, setValue] = useState(Math.random() * (3 - 5) + 5);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <Card sx={{ minWidth: 330, maxWidth: 330 }} className="mt-4 md:m-4">
      <CardMedia sx={{ height: 140 }} image={product?.image?.url || ""} title="green iguana" className="bg-center" />
      <Box mt={2} ml={25}>
        <Rating
          className=""
          onChange={(event, newValue) => {
            setValue(newValue ?? value);
            setIsDisabled(true);
          }}
          name="disabled"
          value={value}
          disabled={isDisabled}
        />
      </Box>
      <CardContent className="-mt-5">
        <Typography gutterBottom variant="h5" component="div" className="text-xl">
          {product?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="h5" color="text.secondary">
          {product?.cost} zł
        </Typography>
        <DialogChooseAddition product={{ ...product }} />
      </CardActions>
    </Card>
  );
}

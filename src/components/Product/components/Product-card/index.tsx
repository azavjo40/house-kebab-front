import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Rating, styled } from "@mui/material";
import { useState } from "react";
import { IProduct } from "@/src/types";
import { DialogChooseAddition } from "../Dialog-choose-addition";
import { getLocalStorage, setLocalStorage } from "@/src/hooks/useLocalStorage";

export interface IProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: IProductCardProps) {
  const [value, setValue] = useState(Math.random() * (4 - 5) + 5);
  const [isDisabled, setIsDisabled] = useState(!!getLocalStorage("grade")?.includes(product.id));

  const removeGrade = () => {
    const grade = getLocalStorage("grade") || [];
    const updatedGrade = grade.filter((id: string) => id !== product.id);
    setLocalStorage("grade", updatedGrade);
    setIsDisabled(false);
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: isDisabled ? "green" : "",
    },
    "& .MuiRating-iconHover": {
      color: isDisabled ? "#faaf00" : "",
    },
  });

  return (
    <Card sx={{ minWidth: 330, maxWidth: 330 }} className="mt-4 md:m-4">
      <CardMedia sx={{ height: 140 }} image={product?.image?.url || ""} title="green iguana" className="bg-center" />
      <Box mt={2} ml={25}>
        <StyledRating
          onChange={(event, newValue) => {
            setValue(newValue ?? value);
            removeGrade();
          }}
          name="disabled"
          value={value}
          readOnly={!isDisabled}
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

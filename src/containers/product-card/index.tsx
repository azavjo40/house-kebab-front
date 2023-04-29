import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { DialogChooseAddition } from "@/components/dialog-choose-addition";
import { IProduct } from "@/types";

export interface IProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: IProductCardProps) {
  return (
    <Card sx={{ maxWidth: 330 }} className="mt-4 md:m-4">
      <CardMedia sx={{ height: 140 }} image={process.env.apiUrl + product?.image?.url} title="green iguana" />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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

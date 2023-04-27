import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useGeneral } from "@/hooks/useGeneral";
import { useRouter } from "next/router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

export function DenseAppBar() {
  const { basketData } = useGeneral();
  const { push } = useRouter();
  return (
    <div className="md:block hidden bg-[#f36805]">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" className="text-white cursor-pointer" onClick={() => push("/")}>
          HOUSE KEBAB & PIZZA
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={() => push("/")}
          >
            <MenuBookIcon />
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => push("/basket")}
          >
            <Badge badgeContent={basketData?.length} color="success">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={() => push("/contact")}
          >
            <RecentActorsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </div>
  );
}

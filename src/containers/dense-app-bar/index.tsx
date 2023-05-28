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
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeLocalStorage } from "@/hooks/useLocalStorage";

export function DenseAppBar() {
  const { basketData, jwtToken } = useGeneral();
  const { push } = useRouter();
  return (
    <div className="md:block hidden bg-blue-600">
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
            className="mr-5"
          >
            <MenuBookIcon />
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => push("/basket")}
            className="mr-5"
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
            className="mr-5"
          >
            <RecentActorsIcon />
          </IconButton>
          {jwtToken && (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => push("/admin")}
              className="mr-5"
            >
              <SupervisorAccountIcon />
            </IconButton>
          )}
          {jwtToken && (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                removeLocalStorage("jwt");
                push("/");
              }}
              className="mr-5"
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </div>
  );
}

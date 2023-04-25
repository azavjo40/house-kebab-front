import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Badge } from "@mui/material";
import { useGeneral } from "@/hooks/useGeneral";
import { useRouter } from "next/router";

export function MobileAppBar() {
  const { push, asPath } = useRouter();
  const [value, setValue] = useState(asPath === "/admin" ? 0 : asPath === "/" ? 1 : asPath === "/basket" ? 2 : 100);
  const { basketData } = useGeneral();

  return (
    <div className="block md:hidden fixed bottom-0 right-0 w-full z-50">
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => setValue(newValue)} className="py-4">
        <BottomNavigationAction onClick={() => push("/admin")} label="Admin" icon={<AccountCircle />} />
        <BottomNavigationAction onClick={() => push("/")} label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          onClick={() => push("/basket")}
          label="Basket"
          icon={
            <Badge badgeContent={basketData?.length} color="error">
              <ShoppingBasketIcon />
            </Badge>
          }
        />
      </BottomNavigation>
    </div>
  );
}

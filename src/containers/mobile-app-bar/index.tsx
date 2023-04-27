import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge } from "@mui/material";
import { useGeneral } from "@/hooks/useGeneral";
import { useRouter } from "next/router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

export function MobileAppBar() {
  const { push, asPath } = useRouter();
  const [value, setValue] = useState(asPath === "/admin" ? 0 : asPath === "/" ? 1 : asPath === "/basket" ? 2 : 100);
  const { basketData } = useGeneral();

  return (
    <div className="block md:hidden fixed bottom-0 right-0 w-full z-50">
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => setValue(newValue)} className="py-4">
        <BottomNavigationAction onClick={() => push("/")} label="Menu główne" icon={<MenuBookIcon />} />
        <BottomNavigationAction
          onClick={() => push("/basket")}
          label="Koszyk"
          icon={
            <Badge badgeContent={basketData?.length} color="error">
              <ShoppingBasketIcon />
            </Badge>
          }
        />
        <BottomNavigationAction onClick={() => push("/contact")} label="Kontakt" icon={<RecentActorsIcon />} />
      </BottomNavigation>
    </div>
  );
}

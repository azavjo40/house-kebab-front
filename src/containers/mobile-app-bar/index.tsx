import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge } from "@mui/material";
import { useGeneral } from "@/hooks/useGeneral";
import { useRouter } from "next/router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export function MobileAppBar() {
  const { push, asPath } = useRouter();
  const { jwtToken } = useGeneral();
  const [value, setValue] = useState(
    asPath === "/" ? 0 : asPath === "/basket" ? 1 : asPath === "/contact" ? 2 : asPath === "/admin" ? 3 : 100
  );
  const { basketData } = useGeneral();

  return (
    <div className="block md:hidden fixed bottom-0 right-0 w-full z-50">
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => setValue(newValue)} className="py-4">
        <BottomNavigationAction onClick={() => push("/")} label="Menu" icon={<MenuBookIcon />} />
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
        {jwtToken && (
          <BottomNavigationAction onClick={() => push("/admin")} label="Admin" icon={<SupervisorAccountIcon />} />
        )}
      </BottomNavigation>
    </div>
  );
}

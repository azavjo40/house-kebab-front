import { GeneralContext } from "@/stores/general";
import { useContext } from "react";

export const useGeneral = () => useContext(GeneralContext);

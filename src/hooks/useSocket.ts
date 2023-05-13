import { SocketContext } from "@/stores/socket";
import { useContext } from "react";

export const useSocket = () => useContext(SocketContext);

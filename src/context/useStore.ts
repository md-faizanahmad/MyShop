import { useContext } from "react";
import { StoreContext } from "./StoreContext";

export const useStore = () => useContext(StoreContext);

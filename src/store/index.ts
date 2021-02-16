import {useContext, createContext} from "react";
import AuthStore from "./auth";
import UserStore from "./user"
import ImageStore from "./image"
const context = createContext({
    AuthStore,
    UserStore,
    ImageStore
})

export const useStore = () => useContext(context)
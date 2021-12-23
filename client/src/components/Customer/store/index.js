import { createStore } from "redux";
import CartItem from "../reducer/CartItem"

const Store = createStore(CartItem)

export default Store
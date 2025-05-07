import { createContext, useState, type ReactNode } from "react";
import {type ProductProps } from "../pages/home";

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;

} 

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;

}

interface CartProviderProps{
    children: ReactNode;
}
    

export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([])

    function addItemCart(newItem: ProductProps){
        //verifica se ja existe o mesmo produto no carrinho
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        //Caso exista o mesmo produto
        if(indexItem !== -1){
            const cartList = cart

            cartList[indexItem].amount = cartList[indexItem].amount + 1
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price

            setCart(cartList)
            return;
        }

        //Caso nao extista o produto adiciona o item na lista
        const data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data])
    }

    return(
        <CartContext.Provider value={{cart, cartAmount: cart.length, addItemCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
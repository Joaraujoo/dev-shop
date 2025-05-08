import { createContext, useState, type ReactNode } from "react";
import {type ProductProps } from "../pages/home";

//Dados que estarão disponíveis no contexto
interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string;
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
    
//Contexto global para compartilhar os dados
export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal]= useState("")

    function addItemCart(newItem: ProductProps){
        //verifica se ja existe o mesmo produto no carrinho
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        //Caso exista o mesmo produto
        if(indexItem !== -1){
            const cartList = cart

            cartList[indexItem].amount = cartList[indexItem].amount + 1
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price

            setCart(cartList)
            totalResultCart(cartList)
            return;
        }

        //Caso nao extista o produto adiciona o item na lista
        const data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data])
        totalResultCart([...cart, data])
    }

    function removeItemCart(product: CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id)

        if(cart[indexItem]?.amount > 1){
            const cartList = cart

            cartList[indexItem].amount = cartList[indexItem].amount - 1
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price

            setCart(cartList)
            totalResultCart(cartList)
            return;
        }

        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem)
        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]){
        const myCart = items
        const result = myCart.reduce((acc, obg) => {return acc + obg.total}, 0)
        const format = result.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        setTotal(format) ;
    }

    return(
        <CartContext.Provider value={{cart, cartAmount: cart.length, addItemCart, removeItemCart, total}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
import { BsCartPlus } from "react-icons/bs"
import { useContext, useEffect, useState } from "react"
import { api } from "../../services/api"
import { CartContext } from "../../contexts/cartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export interface ProductProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}


export function Home(){
    const { addItemCart } = useContext(CartContext)

    const [products, setProducts] = useState<ProductProps[]>([])

    //Consumindo a API
    useEffect(() => { 
        async function getProducts(){
            const response = await api.get("/products")
            setProducts(response.data)
        }

        getProducts()
    }, [])

    function hanleAddCartItem(product: ProductProps){
        toast.success("Produto adicionado no carrinho!", {
            style:{
                borderRadius: 10,
                background: "#121212",
                color: "#fff"
            }
        })
        addItemCart(product)
    }

    return(
        <div>
           <main className="w-full max-w-7xl px-4 mx-auto">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 mb-5">
                    {products.map((product) => (
                        <section className="w-full ">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.cover} alt={product.title} className="w-full rounded-lg max-h-70 mb-2"/>
                            <p className="font-medium mt-1 mb-2">{product.title}</p>
                        </Link>
                        
                        

                        <div className="flex gap-3 items-center">

                            <strong 
                                className="text-zinc-700/90">
                                    {product.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </strong>

                            <button 
                                className="bg-zinc-900 p-1 rounded cursor-pointer" 
                                onClick={() => hanleAddCartItem(product)}>
                                <BsCartPlus size={20} color="#FFF"/>
                            </button>
                        </div>

                    </section>
                    ))}
                </div>
           </main>
        </div>
    )
}
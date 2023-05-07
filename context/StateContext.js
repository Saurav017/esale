
import React, {createContext,useContext,useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) => {

    const [showCart,setShowCart] = useState(false)
    const [cartItems,setCartItems] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [cartQuantity,setCartQuantity] = useState(0)
    const [qty,setQty] = useState(1)


    let foundProduct;
    let index;

    // add item to cart
    const onAdd = (product, quantity) => {
        
        // if item already exists in cart, don't add it again
        const exist = cartItems.find((x) => x._id === product._id)

        setTotalPrice((prevPrice) => prevPrice + (product.price * quantity))
        setCartQuantity((prevQty) => prevQty + quantity)

        if(exist){  
            // if item already exists in cart, increase quantity
            const updatedCartItems = cartItems.map((item) => {
                if(item._id === product._id){
                    return {...item, quantity: item.quantity + quantity}

                }})
            setCartItems(updatedCartItems)
            
        } 
        // if item doesn't exist in cart, add it
        else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }

        toast.success(`${qty} ${product.name} added to cart`)
    }


    // remove item from cart
    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((item) => item._id === id)

        setCartItems([...cartItems.filter((item) => item._id !== id)])
        setTotalPrice((prevPrice) => prevPrice - (foundProduct.price * foundProduct.quantity))
        setCartQuantity((prevQty) => prevQty - foundProduct.quantity)
        
        toast.error(`${foundProduct.name} removed from cart`)
    }


    // toggle quantity to increase or decrease quantity of the cart item
    const toggleCartItemQuanitity = (id, value) => {

        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((item) => item._id === id)

        if(value === 'inc'){
            setCartItems([...cartItems.filter((item) => item._id !== id),{ ...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prevPrice) => prevPrice + foundProduct.price)
            setCartQuantity((prevQty) => prevQty + 1)
        } else if(value === 'dec'){

            if(foundProduct.quantity > 1){     
            setCartItems([...cartItems.filter((item) => item._id !== id),{ ...foundProduct, quantity: foundProduct.quantity - 1}])
            setTotalPrice((prevPrice) => prevPrice - foundProduct.price)
            setCartQuantity((prevQty) => prevQty - 1)
        }
    }
}


    // increase quantity of item in cart
    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    // decrease quantity of item in cart
    const decreaseQty = () => {
        if(qty > 1){
            setQty((prevQty) => prevQty - 1)
        }   
    }

  return (
    <Context.Provider 
    value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        cartQuantity,
        setCartQuantity,
        qty,
        setQty,
        increaseQty,
        decreaseQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove
    }}
    >
        {children}
    </Context.Provider>
    )
}


// this allows us to use the context in any component just like a hook
export const useStateContext = () => useContext(Context)
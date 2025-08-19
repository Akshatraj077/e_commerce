import { createContext, useEffect, useState } from "react";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('')
    const [ShowSearch, setShowSearch] = useState(false)
    const [CartItems, setCartItems] = useState({})
    const navigate = useNavigate()
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')

    const addToCart = async(itemId, size) => {

        if(!size){
            toast.error('Select Product Size')
            return
        }

        let cartData = structuredClone(CartItems);

        if(cartData[itemId]){
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendURL + '/Api/Cart/Add', {itemId, size}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let TotalCount = 0;
        for(const items in CartItems){
            for(const item in CartItems[items]){
                try {
                    if (CartItems[items][item] > 0) {
                        TotalCount += CartItems[items][item]
                    }
                } catch (er) {
                    console.log(er);
                    toast.error(er.message)
                }
            }
        }
        return TotalCount;
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendURL + '/Api/Cart/Get', {}, {headers : {token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const updateQuantity = async(itemId, size, quantity) => {
        let cartData = structuredClone(CartItems);

        cartData[itemId][size] = quantity

        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendURL + '/Api/Cart/Update', {itemId, size, quantity}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in CartItems){
            let itemInfo = products.find((product) => product._id === items)
            for(const item in CartItems[items]){
                try {
                    if(itemInfo && CartItems[items][item] > 0){
                        totalAmount += itemInfo.price * CartItems[items][item]
                    }
                } catch (er) {
                    toast.error(er.message)
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendURL + '/Api/Product/List')
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (er) {
            console.log(er);
            toast.error(er.message)
        }
    }

    useEffect(() => {
        getProductsData()
    },[])

    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products, currency, delivery_fee, token, setToken, backendURL, search, navigate, getCartAmount, setSearch, ShowSearch, setShowSearch, CartItems, addToCart, getCartCount, updateQuantity, setCartItems 
    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
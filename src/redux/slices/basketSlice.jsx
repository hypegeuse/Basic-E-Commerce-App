import { createSlice } from "@reduxjs/toolkit";




const writeFromBasketToStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket))
}

const getBasketFromStorage = () => {
    if (localStorage.getItem('basket')) {
        return JSON.parse(localStorage.getItem('basket'))
    } else {
        return []
    }
}
const initialState = {
    products: getBasketFromStorage(),
    drawerOpen: false,
    totalAmount: 0

}


export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addProductToBasket: (state, action) => {

            const findProduct = state.products && state.products.find((product) => product.id === action.payload.id)
            if (findProduct) {
                //daha önceden eklemişim
                const extractedProducts = state.products.filter((product) => product.id !== action.payload.id)
                findProduct.count += action.payload.count
                state.products = [...extractedProducts, findProduct]
                writeFromBasketToStorage(state.products)
            } else {
                state.products = [...state.products, action.payload]
                writeFromBasketToStorage(state.products)
            }
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = !state.drawerOpen;
        },
        calculateBasket: (state) => {
            state.totalAmount = 0;
            state.products && state.products.map((product) => {
                state.totalAmount += product.price * product.count
            })
        }
    }
})

export const { addProductToBasket, setDrawerOpen, calculateBasket } = basketSlice.actions;
export default basketSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';

export interface CartType {
    [key: string]: number
}

interface AddToCartType {
    type: string,
    payload: {
        productId: number,
        quantity: number,
    }
}

const initialState: CartType = JSON.parse(window.localStorage.getItem('cart') || '{}');

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: AddToCartType) => {
            const {productId, quantity} = action.payload;
            let oldQuantity;

            if (productId in state) {
                oldQuantity = state[productId];
            } else {
                oldQuantity = 0;
            }

            const newState = {
                ...state,
                [productId]: oldQuantity + quantity
            }
            window.localStorage.setItem('cart', JSON.stringify(newState));

            return newState;
        }
    }
});

export const {add} = cartSlice.actions;

export default cartSlice.reducer;

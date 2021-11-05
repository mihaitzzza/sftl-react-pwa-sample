import {createSlice} from '@reduxjs/toolkit';

export interface ProductType {
    id: number,
    name: string,
    price: number,
    color: string,
    size: string,
    image: string,
}

const initialState: Array<ProductType> = [
    {
        id: 1,
        name: 'T-Shirt',
        price: 14.40,
        color: 'green',
        size: 'M',
        image: '/images/products/product0.webp',
    },
    {
        id: 2,
        name: 'T-Shirt',
        price: 20.90,
        color: 'red',
        size: 'XL',
        image: '/images/products/product1.webp',
    },
    {
        id: 3,
        name: 'T-Shirt',
        price: 50.00,
        color: 'purple',
        size: 'S',
        image: '/images/products/product2.webp',
    },
    {
        id: 4,
        name: 'T-Shirt',
        price: 20.90,
        color: 'blue',
        size: 'L',
        image: '/images/products/product3.webp',
    }
];

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        load: (state, action) => {
            return [
                ...state,
                ...action.payload
            ]
        }
    }
});

export const {load} = productsSlice.actions;

export default productsSlice.reducer;

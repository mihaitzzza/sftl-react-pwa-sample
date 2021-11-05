import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {RootState} from 'state/store';
import Stack from '@mui/material/Stack';
import ProductListItem from 'components/products/ListItem';

interface ProductParams {
    id: string,
}

const Product = () => {
    const {id: productId} = useParams<ProductParams>();
    const product = useSelector((state: RootState) => state.products.find(p => p.id === Number.parseInt(productId, 10)))

    if (!product) {
        return <div>Loading..</div>
    }

    return (
        <Stack justifyContent="center">
            <ProductListItem {...product} alignSelf="center" showAction={false} />
        </Stack>
    );
};

export default Product;

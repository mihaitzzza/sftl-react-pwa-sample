import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {add} from 'state/slices/cart';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface AddToCartProps {
    id: number,
    name: string,
}

const AddToCart = (props: AddToCartProps) => {
    const {id, name} = props;
    const [value, setValue] = useState(1);
    const dispatch = useDispatch();
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const onSliderChange = (event: any, value: any) => {
        setValue(value);
    }

    const onAddToCartClick = () => {
        dispatch(add({
            productId: id,
            quantity: value
        }));

        toast.success(`You've added ${value}pcs. of ${name} to the cart.`);

        setValue(1);
    };

    return (
        <Stack spacing={2} sx={isMobile ? {my: 4} : {}}>
            <Slider
                value={value}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={onSliderChange}
            />
            <Button variant="contained" onClick={onAddToCartClick}>Add to cart</Button>
            <Typography variant="body2" component="p">Items to add to cart: {value}</Typography>
        </Stack>
    );
};

AddToCart.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default AddToCart;

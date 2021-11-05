import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ProductType} from 'state/slices/products';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddToCart from 'components/shared/AddToCart';

interface ExtraProductListItemType {
    imgWidth: number | string,
    alignSelf?: string,
    showAction?: boolean
}

type ProductListItemProps = ProductType & ExtraProductListItemType;

const ProductListItem = (props: ProductListItemProps) => {
    const {id, name, price, color, size, image, imgWidth, showAction, ...mainComponentProps} = props;
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const history = useHistory();

    const navigateToProductDetails = () => {
        history.push(`/products/${id}`);
    };

    return (
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} {...mainComponentProps}>
            <img src={image || '/images/defaultProductImage.png'} alt={`Product #${id}.`}
                 width={isMobile ? '100%' : imgWidth} />
            <Stack justifyContent="space-between">
                <Stack spacing={1}>
                    <Typography variant="h6" component="p">{name}</Typography>
                    <Typography variant="body2">
                        Price: {price} RON
                    </Typography>
                    <Typography variant="body2">
                        Size: {size}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" component="p">Color: </Typography>
                        <div style={{width: '20px', height: '20px', backgroundColor: color, borderRadius: '50%'}} />
                    </Stack>
                </Stack>
                <AddToCart id={id} name={name} />
                {
                    showAction && (
                        <Button variant="outlined" onClick={navigateToProductDetails}>View details</Button>
                    )
                }
            </Stack>
        </Stack>
    );
};

ProductListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    image: PropTypes.string,
    imgWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showAction: PropTypes.bool,
};

ProductListItem.defaultProps = {
    image: '',
    imgWidth: 250,
    showAction: true,
}

export default ProductListItem;

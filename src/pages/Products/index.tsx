import React, { useEffect } from "react";
import { RootState } from "state/store";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ProductListItem from "components/products/ListItem";
import { ProductApi } from "services/products";
import { load } from "state/slices/products";

const Products = () => {
  const products = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const products = await ProductApi.getProducts();
      dispatch(load(products));
    }
    getProducts();
  }, []);

  return (
    <div>
      <Stack spacing={4}>
        <Typography variant="h5" component="p">
          We have a total of {products.length} available products.
        </Typography>
        <Box>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid key={product.id} item xs={12} md={6} lg={3} container>
                <ProductListItem {...product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </div>
  );
};

export default Products;

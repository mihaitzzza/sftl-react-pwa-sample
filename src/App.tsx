import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import Navigation from "components/shared/Navigation";
import { ThemeProvider } from "@mui/material/styles";
import store, { RootState } from "state/store";
import muiTheme from "./config/muiTheme";
import Homepage from "pages/Homepage";
import Products from "pages/Products";
import Product from "pages/Product";
import { Login } from "pages/Account/Login";
import { SigninOidc } from "pages/Account/SignIn";
import { SignoutOidc } from "pages/Account/SingOut";
import AddProduct from 'pages/AddProduct';

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { loadUserFromStorage } from "services/user";

function App() {
  useEffect(() => {
    // fetch current user from cookies
    loadUserFromStorage(store);
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
          />
          <Navigation />
          <Box sx={{ p: 4 }}>
            <Switch>
              <PrivateRoute exact path="/" component={Homepage} />
              {/* <Route exact path="/" component={Homepage} /> */}
              <PrivateRoute exact path="/products" component={Products} />
              <PrivateRoute exact path="/products/:id" component={Product} />
              <PrivateRoute exact path="/add-product" component={AddProduct} />
              {/*!!!!!!-------Check why not working-------------------------------!!!! */}
              {/* <PrivateRoute exact path="/products">
                <Products />
              </PrivateRoute>
              <PrivateRoute exact path="/products/:id">
                <Product />
              </PrivateRoute>
              <PrivateRoute exact path="/cart">
                Cart component
              </PrivateRoute> */}
              <Route exact path="/login" component={Login} />
              <Route path="/signout-oidc" component={SignoutOidc} />
              <Route path="/signin-oidc" component={SigninOidc} />
            </Switch>
          </Box>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const user = useSelector((state: RootState) => {
    return state.userState.user; //isLoading not used right now --not sure if we need it or not
  });

  const redirectTo = (pathname: string) => {
    return (
      <Redirect
        to={{
          pathname,
        }}
      />
    );
  };

  return (
    <Route
      {...rest}
      //we can handle here also unauthorized routes like add product / category
      //such that we check that we have the right role to access that - admin
      //otherwise we redirect the user to login
      render={(props) =>
        user ? <Component {...props} /> : redirectTo("/login")
      }
    />
  );
};

export default App;

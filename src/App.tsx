import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Box from '@mui/material/Box';
import Navigation from 'components/shared/Navigation';
import {ThemeProvider} from '@mui/material/styles';
import store from 'state/store';
import muiTheme from './config/muiTheme';
import Homepage from 'pages/Homepage';
import Products from 'pages/Products';
import Product from 'pages/Product';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
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
                    <Box sx={{p: 4}}>
                        <Switch>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                            <Route exact path="/products">
                                <Products />
                            </Route>
                            <Route exact path="/products/:id">
                                <Product />
                            </Route>
                            <Route exact path="/cart">
                                Cart component
                            </Route>
                            <Route exact path="/login">
                                Login
                            </Route>
                        </Switch>
                    </Box>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

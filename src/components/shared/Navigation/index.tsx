import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ClickAwayListener } from "@mui/material";

import "./styles.scss";

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state: RootState) => {
    return state.userState.user; //isLoading not used right now --not sure if we need it or not
  });
  const cartItemsLength = useSelector((state: RootState) =>
    Object.keys(state.cart).reduce((acc, productId) => {
      acc += state.cart[productId];
      return acc;
    }, 0)
  );

  const toggleMenu = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setShowMenu(!showMenu);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Stack
              sx={{ flexGrow: 1 }}
              spacing={1}
              direction="row"
              alignItems="center"
            >
              <img
                src="/images/brand/logoSymbolWhite.png"
                height="25px"
                alt="White Logo"
              />
              <Typography variant="h5" component="h1">
                Softelligence
              </Typography>
              <Typography variant="h5" component="h1">
                User - {(user as any)?.profile?.name}
              </Typography>
            </Stack>
            {isMobile ? (
              <IconButton style={{ color: "#fff" }} onClick={toggleMenu}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Stack
                className="sftl-nav-links"
                direction="row"
                spacing={4}
                alignItems="center"
              >
                <NavLink exact to="/" activeClassName="active">
                  Homepage
                </NavLink>
                <NavLink exact to="/products">
                  Products
                </NavLink>
                <NavLink exact to="/cart">
                  <Stack direction="row" alignItems="center">
                    <ShoppingCartIcon /> Cart ({cartItemsLength})
                  </Stack>
                </NavLink>
                {!user ? (
                  <NavLink exact to="/login">
                    Login
                  </NavLink>
                ) : (
                  <NavLink exact to="/signout-oidc">
                    Logout
                  </NavLink>
                )}
              </Stack>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {showMenu && (
        <ClickAwayListener onClickAway={toggleMenu}>
          <Drawer
            anchor="top"
            variant="permanent"
            onClose={() => {}}
            PaperProps={{
              sx: {
                mt: "56px",
                py: 2,
              },
              className: "sftl-mobile-menu",
            }}
            hideBackdrop
          >
            Custom drawer
          </Drawer>
        </ClickAwayListener>
      )}
    </>
  );
};

export default Navigation;

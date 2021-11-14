import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Homepage = () => {
  return (
    <Stack spacing={4} alignItems="center">
      <img src="/images/brand/logoSymbol.png" alt="Logo SFTL" width={200} />
      <Typography variant="h5" component="h1">
        Softelligence 2021 Hackaton
      </Typography>
      <Typography variant="h6" component="h2">
        React Training
      </Typography>
    </Stack>
  );
};

export default Homepage;

import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Aside, Navbar } from "../../components";
import { Outlet } from "react-router-dom";
import AsideProvider from "../../contexts/asideContext";

const RootLayout = () => {
  return (
    <AsideProvider>
      <Stack direction="row" minheight="100vh">
        <Aside />
        <Box flex={"1"} py={3} bgcolor="background.default">
          <Container maxWidth={false}>
            <Stack gap={3}>
              <Navbar />
              <Outlet />
            </Stack>
          </Container>
        </Box>
      </Stack>
    </AsideProvider>
  );
};
export default RootLayout;

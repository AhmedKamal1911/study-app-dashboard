import { Box, Container, Stack } from "@mui/material";
import { Aside, Navbar } from "../../components";
import { Outlet } from "react-router-dom";
import AsideProvider from "../../contexts/asideContext";

const RootLayout = () => {
  return (
    <AsideProvider>
      <Stack
        display={{ xs: "block", lg: "flex" }}
        direction={"row"}
        minheight="100vh"
      >
        <Aside />
        <Box flex={"1"} py={3} bgcolor="background.default">
          <Container maxWidth={false}>
            <Stack gap={3}>
              <Navbar />
              <Box minHeight="83.4vh">
                <Outlet />
              </Box>
            </Stack>
          </Container>
        </Box>
      </Stack>
    </AsideProvider>
  );
};
export default RootLayout;

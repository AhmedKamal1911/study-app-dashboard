import { useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Home,
  ShowChart,
  AcUnit,
  AppRegistrationRounded,
  Create,
  OndemandVideo,
  Star,
  CloudCircleRounded,
  ImportContacts,
} from "@mui/icons-material";

import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useAsideContext } from "../contexts/asideContext";

const pagesButtons = [
  { name: "Analyze", icon: <ShowChart />, path: "/" },
  { name: "Register", icon: <AppRegistrationRounded />, path: "/sign-up" },
  { name: "Create Course", icon: <Create />, path: "/create-course" },
  { name: "My Courses", icon: <OndemandVideo />, path: "/courses" },
  { name: "Enrollment", icon: <CloudCircleRounded />, path: "/enroll" },
  { name: "Reviews", icon: <Star />, path: "/course-reviews" },
];

const Aside = () => {
  const isMediumScreen = useMediaQuery("(max-width: 1199px)");
  const { open, closeAside } = useAsideContext();
  if (isMediumScreen) {
    return (
      <Drawer anchor="left" open={open} onClose={() => closeAside()}>
        <AsideContent />
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          position: "sticky",
          display: "block",
          height: "100vh",
        },
      }}
      variant="permanent"
    >
      <AsideContent />
    </Drawer>
  );
};
const AsideContent = () => {
  const path = useLocation();
  const { closeAside } = useAsideContext();
  const [isCurrentSelected, setIsCurrentSelected] = useState("Analyze");
  return (
    <Stack
      p={1.5}
      sx={{
        bgcolor: "background.paper",
        height: "100%",
      }}
      zIndex={9}
      boxShadow=" 6px 0px 5px -5px rgb(0 0 0 / 9%)"
      overflow="hidden"
    >
      <Typography
        variant="h4"
        color="primary.main"
        display="flex"
        alignItems="center"
        gap={1}
        p={3}
      >
        <ImportContacts />
        HiStudy
      </Typography>
      <Stack gap={2}>
        {pagesButtons.map(({ name, icon, path }) => (
          <Button
            component={NavLink}
            to={path}
            sx={[
              {
                px: "20px",
                position: "relative",
                justifyContent: "flex-start",
              },
              isCurrentSelected === name && {
                "&::after": {
                  position: "absolute",
                  content: "''",
                  width: "10px",
                  height: "100%",
                  borderRadius: "10px",
                  right: "-16px",
                  bottom: 0,
                  transition: "0.3s",
                  bgcolor: "primary.main",
                },
              },
            ]}
            variant={isCurrentSelected === name ? "contained" : "text"}
            size="large"
            key={name}
            startIcon={icon}
            onClick={() => {
              setIsCurrentSelected(name);
              closeAside();
            }}
          >
            {name}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
export default Aside;

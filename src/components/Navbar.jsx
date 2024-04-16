import {
  CardMedia,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { profileImg } from "../assets/images";
import {
  Logout,
  Search,
  Menu as MenuIcon,
  Notifications,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import fetchFromAPI from "../services/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToggleDarkMode } from "../contexts/themeContext";
import { useAuth } from "../contexts/authContext";
import { useAsideContext } from "../contexts/asideContext";
import { useSnackbar } from "../contexts/snackbarContext";

const Navbar = () => {
  const { toggleDarkMode, colorMode } = useToggleDarkMode();
  const { setAuth } = useAuth();
  const isMediumScreen = useMediaQuery("(max-width: 1199px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { openAside } = useAsideContext();
  const { auth } = useAuth();
  const { openSnackbar } = useSnackbar();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logUserOut = async () => {
    // FIXME: what if user tries to logout and his session is already expired what to do with the token ?  i cant even do logout request ? what should i do ?
    try {
      await fetchFromAPI({
        url: "/auth/user/signout",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      localStorage.removeItem("token");
      setAuth({ auth: null, user: null });
      openSnackbar("You logged out successfully");
    } catch (e) {
      // detect if the user token is finished and he tries to signout then log him out with diffrent way for example
      openSnackbar(
        "Failed to logout due to network error, try again.",
        "error"
      );
    }
  };
  function handleLogout() {
    logUserOut();
  }

  return (
    <Stack
      position="relative"
      direction="row"
      bgcolor="background.paper"
      borderRadius={3}
      className="shadow-1"
      gap={2}
      p={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" gap={1} alignItems="flex-end">
        {isMediumScreen && (
          <IconButton onClick={() => openAside()}>
            <MenuIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => {}}
          size="medium"
          sx={{ alignSelf: "flex-end" }}
        >
          <Search />
        </IconButton>
        <TextField id="input-with-sx" label="Search" variant="standard" />
      </Stack>
      <Stack direction="row" gap={2} alignItems="center">
        <IconButton size="medium">
          <Notifications />
        </IconButton>
        <IconButton onClick={() => toggleDarkMode()} size="medium">
          {colorMode === "light" ? <LightMode /> : <DarkMode />}
        </IconButton>

        <Tooltip title="Profile settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{
              position: "relative",

              "&::after": {
                position: "absolute",
                content: "''",
                width: "10px",
                height: "10px",
                borderRadius: "10px",
                right: 8,
                bottom: 5,
                transition: "0.3s",
                bgcolor: "#16c416",
                border: "1px solid gray",
              },
            }}
          >
            <img
              src={auth.user?.avatar || profileImg}
              onError={(e) => {
                e.target.src = profileImg;
              }}
              alt="profile"
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: "200px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 2.5,
              "& .MuiCardMedia-root": {
                width: 40,
                height: 40,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem component={Link} to="/profile">
            <CardMedia
              component="img"
              image={auth.user?.avatar || profileImg}
              sx={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
              }}
            />
            Profile
          </MenuItem>

          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default Navbar;

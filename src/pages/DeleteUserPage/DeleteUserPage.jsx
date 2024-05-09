import { Box } from "@mui/material";

import withHelmet from "../../components/withHelmet";

const DeleteUserPage = () => {
  return (
    <Box
      bgcolor="background.default"
      sx={{
        minHeight: "100vh",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
        }}
      ></div>
    </Box>
  );
};

export default withHelmet(DeleteUserPage, "Delete-user");

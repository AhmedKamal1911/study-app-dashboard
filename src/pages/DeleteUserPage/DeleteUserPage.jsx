import { Box, Typography } from "@mui/material";

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
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="dark"
          padding="10px"
          bgcolor="primary.light"
        >
          In Progress
        </Typography>
      </div>
    </Box>
  );
};

export default withHelmet(DeleteUserPage, "Delete-user");

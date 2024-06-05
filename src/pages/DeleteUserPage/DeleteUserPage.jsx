import { Box, Button, Typography } from "@mui/material";

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
          mb="10px"
          variant="h5"
          fontWeight="bold"
          color="dark"
          padding="10px"
          bgcolor="primary.light"
        >
          In Progress
        </Typography>
        <Button
          variant="contained"
          color="success"
          LinkComponent={"a"}
          href="https://histudy-dashboard.netlify.app/"
        >
          Back
        </Button>
      </div>
    </Box>
  );
};

export default withHelmet(DeleteUserPage, "Delete-user");

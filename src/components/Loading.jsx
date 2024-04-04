import { Stack, Typography } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";

const Loading = ({
  children,
  isLoading,
  error,
  errorElement,
  loadingElement = (
    <Stack
      justifyContent="center"
      width="100%"
      alignItems="center"
      minHeight="80vh"
    >
      <InfinitySpin visible={true} color="#d65fec" ariaLabel="puff-loading" />
    </Stack>
  ),
}) => {
  if (isLoading) return loadingElement;
  if (error)
    return !errorElement ? (
      <Stack justifyContent="center" alignItems="center" minHeight="86.5vh">
        <Typography color="red" variant="h4">
          {error.message}
        </Typography>
      </Stack>
    ) : (
      errorElement
    );
  return children;
};

export default Loading;

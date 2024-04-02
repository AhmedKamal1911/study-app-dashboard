import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(() => ({
  "& .MuiInputLabel-root:not(.Mui-focused)": {
    color: "rgba(50, 71, 92, 0.6)",
  },
  "& .MuiInputBase-input ": {
    color: "gray",
  },
  "& .MuiOutlinedInput-notchedOutline:not(.Mui-focused)": {
    borderColor: "rgba(50,71,92,0.2)",
  },
  "&:hover MuiInputBase-input:not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "rgba(50,71,92,0.5)",
    },
}));
export default CustomTextField;

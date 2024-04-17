import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(() => ({
  "& label": {
    color: "rgb(105, 108, 255)",
    fontSize: "19px",
  },
  "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgb(105,108,255)",
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    WebkitBoxShadow: "initial",
    WebkitTextFillColor: "rgb(105, 108, 255)",
  },
}));
export default CustomTextField;

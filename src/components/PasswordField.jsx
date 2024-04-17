import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import { useId, useRef, useState } from "react";
const CustomOutlinedInput = styled(OutlinedInput)(() => ({
  "& .MuiInputBase-input:-webkit-autofill": {
    WebkitBoxShadow: "initial",
    WebkitTextFillColor: "rgb(105, 108, 255)",
  },
}));
const PasswordField = ({
  label = "Password",
  name = "password",
  value,
  onChange,
  disablePasswordIcon = false,
  fullWidth = false,
}) => {
  const id = useId();
  const passwordId = `${label}-${id}`;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setCursorToEnd();
    setShowPassword((show) => !show);
  };
  const passwordFieldRef = useRef(null);
  function setCursorToEnd() {
    if (!passwordFieldRef.current) return;
    if (passwordFieldRef.current.setSelectionRange) {
      passwordFieldRef.current.focus();
      passwordFieldRef.current.setSelectionRange(
        passwordFieldRef.current.value.length,
        passwordFieldRef.current.value.length
      );
    }
  }
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  return (
    <FormControl variant="outlined" fullWidth={fullWidth}>
      <InputLabel
        htmlFor={passwordId}
        sx={{
          color: "primary.main",
          fontSize: "19px",
        }}
      >
        {label}
      </InputLabel>
      <CustomOutlinedInput
        sx={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(105,108,255)",
          },
        }}
        name={name}
        placeholder="*******"
        value={value}
        onChange={onChange}
        inputRef={passwordFieldRef}
        id={passwordId}
        type={showPassword ? "text" : "password"}
        label="Password"
        endAdornment={
          disablePasswordIcon ? null : (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
};

export default PasswordField;

import { FormControl, InputLabel, Select } from "@mui/material";
import { useId } from "react";

const CustomSelectField = ({
  children,
  label = "nolabel",
  name,
  onChange,
  onBlur,
  value,
  defaultValue = "",
  controlled = false,
}) => {
  const idForLabel = useId();
  const idForSelect = useId();
  const labelId = `${name || "label"}-${idForLabel}`;
  const selectId = `${name || "select"}-${idForSelect}`;

  return (
    <FormControl
      sx={{
        "& .MuiFormLabel-root , & .MuiSvgIcon-root": {
          color: "rgb(105, 108, 255)",
        },
        "& .css-n6941b-MuiInputBase-root-MuiInput-root-MuiSelect-root::before":
          {
            borderColor: "rgb(105, 108, 185)",
          },
      }}
      variant="standard"
      fullWidth
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      {controlled ? (
        <Select
          sx={{
            color: "rgb(105, 108, 255)",
          }}
          labelId={labelId}
          id={selectId}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          value={value}
        >
          {children}
        </Select>
      ) : (
        <Select
          sx={{
            color: "rgb(105, 108, 255)",
          }}
          labelId={labelId}
          id={selectId}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          defaultValue={defaultValue}
        >
          {children}
        </Select>
      )}
    </FormControl>
  );
};

export default CustomSelectField;

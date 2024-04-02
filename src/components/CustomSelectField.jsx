import { FormControl, InputLabel, Select } from "@mui/material";
import { useId } from "react";

const CustomSelectField = ({
  children,
  label = "nolabel",
  name,
  onChange,
  value,
  defaultValue = "",
  controlled = false,
}) => {
  const idForLabel = useId();
  const idForSelect = useId();
  const labelId = `${name || "label"}-${idForLabel}`;
  const selectId = `${name || "select"}-${idForSelect}`;

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      {controlled ? (
        <Select
          labelId={labelId}
          id={selectId}
          name={name}
          onChange={onChange}
          label={label}
          value={value}
        >
          {children}
        </Select>
      ) : (
        <Select
          labelId={labelId}
          id={selectId}
          name={name}
          onChange={onChange}
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

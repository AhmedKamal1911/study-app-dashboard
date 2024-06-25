import { useState } from "react";
import CustomTextField from "./CustomTextField";
import { Chip, Stack, Typography } from "@mui/material";
import { Check, Edit } from "@mui/icons-material";

import FieldError from "./FieldError";

const EditableField = ({
  initialValue,
  value,
  name,
  id,
  error,
  onChange,
  onSubmit,
  onBlur,
  setInitialValues,

  setFieldValue,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const openEditMode = () => {
    setIsEditing(true);
  };
  const exitEditMode = () => {
    setIsEditing(false);
  };
  const saveFieldChanges = () => {
    if (value === initialValue) {
      exitEditMode();
      return;
    }
    onSubmit();
    // if field update successful => set new initial value to be able to update again
    setInitialValues((prev) => ({ ...prev, [name]: value }));
    // if field update failed error => set fieldValue to the inital value
    // setFieldValue(name, value, true);
    exitEditMode();
  };
  const handleBlur = (e) => {
    onBlur(e);
    if (error) return;
    saveFieldChanges();
  };
  return (
    <form
      style={{ width: "500px", maxWidth: "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
        openEditMode();
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        gap={1}
      >
        <Stack direction="column">
          <CustomTextField
            sx={{
              display: isEditing ? "flex" : "none",
              width: "400px",
              maxWidth: "100%",
            }}
            variant="outlined"
            name={name}
            id={id}
            value={value}
            onBlur={handleBlur}
            onChange={onChange}
            autoFocus
          />
          {error && <FieldError errorText={error} />}
        </Stack>

        <Typography
          sx={{
            display: isEditing ? "none" : "block",
          }}
          color="lightDark"
          variant="body1"
        >
          {value}
        </Typography>

        <button
          style={{
            display: "inline-block",
            backgroundColor: "transparent",
            padding: "0",
            border: "none",
            cursor: "pointer",
          }}
          type={isEditing ? "submit" : "button"}
          disabled={Boolean(error)}
          onClick={isEditing ? saveFieldChanges : openEditMode}
        >
          <Chip
            sx={{ p: "5px", alignSelf: "flex-end" }}
            variant={isEditing ? "outlined" : "filled"}
            label={isEditing ? "Save" : "Edit"}
            icon={isEditing ? <Check /> : <Edit />}
          />
        </button>
      </Stack>
    </form>
  );
};

export default EditableField;

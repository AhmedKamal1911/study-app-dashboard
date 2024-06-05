import { useState } from "react";
import CustomTextField from "./CustomTextField";
import { Chip, Stack, Typography } from "@mui/material";
import { Check, Edit } from "@mui/icons-material";

const EditableField = ({ initialText, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldText, setFieldText] = useState(initialText);
  const handleInputChange = (e) => {
    setFieldText(e.target.value);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleBlur = () => {
    setIsEditing(false);
  };
  return (
    <div style={{ width: "500px", maxWidth: "100%" }}>
      {isEditing ? (
        <Stack direction={{ xs: "column", md: "row" }} gap={1}>
          <CustomTextField
            fullWidth={{ xs: true, md: false }}
            variant="outlined"
            value={fieldText}
            onBlur={handleBlur}
            onChange={handleInputChange}
            autoFocus
          />
          <Chip
            sx={{ p: "5px", alignSelf: "flex-end" }}
            variant="outlined"
            label="Save"
            onClick={handleInputChange}
            icon={<Check />}
          />
        </Stack>
      ) : (
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          gap="10px"
        >
          <Typography color="lightDark" variant="body1">
            {fieldText}
          </Typography>
          {isEditable ? (
            <Chip
              sx={{ p: "5px" }}
              variant="outlined"
              label="Edit"
              onClick={handleEditClick}
              icon={<Edit />}
            />
          ) : (
            ""
          )}
        </Stack>
      )}
    </div>
  );
};

export default EditableField;

import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { EditableField, InfoBoxWrapper } from "../../components";
import { useAuth } from "../../contexts/authContext";
import avatarImg from "../../assets/images/person.png";
import { formatDate } from "../../utils";
import withHelmet from "../../components/withHelmet";
import fetchFromAPI from "../../services/api";
import { useModal } from "../../contexts/modalContext";
import useLogout from "../../hooks/useLogout";
import profileValidationSchema from "../../validations/profileValidationSchema";

import { Edit } from "@mui/icons-material";
const ProfilePage = () => {
  const {
    auth: { user, token },
  } = useAuth();
  console.log(user);
  const logout = useLogout();
  const { openModal } = useModal();
  const [newImgUrl, setNewImgUrl] = useState("");

  const [initialValues, setInitialValues] = useState({
    fullName: user.fullName || "",
    username: user.username || "",
    email: user.email || "",
    instructorDescription: user.isInstructor ? user.instructorDescription : "",
  });
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: profileValidationSchema,

    onSubmit: async (values) => {
      // Handle form submission
      console.log(values, "values");
      const dataWithInstructorDesc = user.isInstructor
        ? values
        : {
            fullName: values.fullName,
            username: values.username,
            email: values.email,
          };

      try {
        await fetchFromAPI({
          url: `/${user.isInstructor ? "instructors" : "users"}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: dataWithInstructorDesc,
        });
        console.log("done");
      } catch (e) {
        console.log("eroor", e);
      }
    },
  });

  const profileInfo = [
    {
      info: "Registration Date",
      isEditable: false,
      value: formatDate(user.createdAt, {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
      }),
    },
    {
      info: "Full Name",
      value: formik.values.fullName,
      isEditable: false,
      name: "fullName",
      id: "fullName",
      error: formik.errors.fullName,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      info: "Username",
      value: formik.values.username,
      isEditable: false,
      name: "username",
      id: "username",
      error: formik.errors.username,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    {
      info: "Email",
      value: formik.values.email,
      isEditable: true,
      name: "email",
      id: "email",
      error: formik.errors.email,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    },
    ...(user.isInstructor
      ? [
          {
            info: "Biography",
            value: formik.values.instructorDescription,
            isEditable: true,
            name: "instructorDescription",
            id: "instructorDescription",
            error: formik.errors.instructorDescription,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          },
        ]
      : []),
  ];
  const inputRef = useRef(null);
  useEffect(
    () => () => {
      if (newImgUrl) URL.revokeObjectURL(newImgUrl);
    },
    [newImgUrl]
  );
  const handleUpdateImg = async (files) => {
    if (files.length === 0) return;
    const file = files[0];
    const newImg = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("file", inputRef.current.files[0]);

    try {
      await fetchFromAPI({
        url: `/${user.isInstructor ? "instructors" : "users"}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });
      setNewImgUrl(newImg);
    } catch (e) {}
  };

  const onUserAvatarDeletion = async () => {
    try {
      await fetchFromAPI({
        url: `${user.isInstructor ? "/instructors/avatar" : "/users/avatar"}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewImgUrl("");
      console.log("endpoint");
    } catch (e) {
      console.log(e, "error from unenroll");
    }
  };

  const onUserDeletion = async () => {
    try {
      await fetchFromAPI({
        url: `${user.isInstructor ? "/instructors" : "/users"}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logout();

      console.log("endpoint");
    } catch (e) {
      console.log(e, "error from unenroll");
    }
  };

  const openDeletionConfirmModal = () => {
    openModal("ConfirmDeletionModal", {
      onConfirm: onUserDeletion,
      title: "Are you sure you want to Delete your self ?",
    });
  };
  const openAvatarDeletionConfirmModal = () => {
    openModal("ConfirmModal", {
      onConfirm: onUserAvatarDeletion,
      title: "Are you sure you want to Delete your avatar?",
    });
  };

  return (
    <Box
      p={4}
      className="shadow-1"
      bgcolor="background.paper"
      borderRadius="8px"
      minHeight="83.4vh"
    >
      <InfoBoxWrapper title="Profile">
        <Box>
          <Box
            sx={{
              position: "relative",
              width: "fit-content",
              marginX: "auto",
              "&:hover Button": {
                opacity: 1,
              },
            }}
          >
            <label
              htmlFor="image-input"
              style={{
                display: "block",
                background: "gray",
                maxWidth: "200px",
                aspectRatio: "1",
                borderRadius: "50%",
                marginBottom: "20px",
                outline: "4px groove #009688",
                cursor: "pointer",
                fontSize: 0,
                marginInline: "auto",
                userSelect: "none",
                overflow: "hidden",
              }}
            >
              <img
                src={newImgUrl ? newImgUrl : user.avatar ?? avatarImg}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            </label>
            <Button
              disabled={user.avatar || newImgUrl ? false : true}
              onClick={() => openAvatarDeletionConfirmModal()}
              variant="contained"
              size="small"
              sx={{
                position: "absolute",
                zIndex: "999",
                left: "-5px",
                top: "-5px",
                minWidth: "30px",
                minHeight: "30px",
                borderRadius: "50%",
                padding: "8px",
                opacity: "0",
                transition: "0.3s all",
                ":hover": {
                  backgroundColor: "Highlight",
                },
              }}
            >
              <Edit
                sx={{
                  // color: user.avatar || newImgUrl ? "red" : "gray",
                  color: "white",
                  fontSize: "25px",
                }}
              />
            </Button>
          </Box>

          <input
            onChange={(e) => handleUpdateImg(e.target.files)}
            type="file"
            name=""
            id="image-input"
            hidden
            accept="image/*"
            ref={inputRef}
          />

          <Stack gap={3}>
            {profileInfo.map(
              ({
                info,
                value,
                isEditable,
                name,
                id,
                error,
                onChange,
                onBlur,
              }) => (
                <Stack
                  key={info}
                  alignItems="center"
                  textAlign={{ xs: "center", md: "start" }}
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={3}
                >
                  <Typography
                    color="dark"
                    fontWeight="bold"
                    minWidth={{ xs: "auto", md: "200px" }}
                  >
                    {`${info} :`}
                  </Typography>
                  {isEditable ? (
                    <EditableField
                      setInitialValues={setInitialValues}
                      initialValue={formik.initialValues[name]}
                      value={value}
                      name={name}
                      id={id}
                      isEditable={isEditable}
                      error={error}
                      onChange={onChange}
                      onBlur={onBlur}
                      onSubmit={formik.handleSubmit}
                      setFieldValue={formik.setFieldValue}
                    />
                  ) : (
                    <Typography color="lightDark" variant="body1">
                      {value}
                    </Typography>
                  )}
                </Stack>
              )
            )}
          </Stack>
          <Button
            sx={{ mt: "15px" }}
            variant="contained"
            color="error"
            onClick={() => openDeletionConfirmModal()}
          >
            Deactive
          </Button>
        </Box>
      </InfoBoxWrapper>
    </Box>
  );
};

export default withHelmet(ProfilePage, "Profile");

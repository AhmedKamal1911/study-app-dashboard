import { Box, Stack, Typography } from "@mui/material";
import { InfoBoxWrapper } from "../../components";
import { useAuth } from "../../contexts/authContext";
import avatarImg from "../../assets/images/person.png";
import { formatDate } from "../../utils";
import withHelmet from "../../components/withHelmet";
import fetchFromAPI from "../../services/api";
import { useEffect, useRef, useState } from "react";

const ProfilePage = () => {
  const {
    auth: { user, token },
  } = useAuth();
  const [newImgUrl, setNewImgUrl] = useState("");
  const [firstName, lastName] = user.fullName.split(" ");
  const profileInfo = [
    {
      info: "Registration Date",
      value: formatDate(user.createdAt, {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
      }),
    },
    { info: "First Name", value: firstName },
    { info: "Last Name", value: lastName },
    { info: "Username", value: user.username },
    { info: "Email", value: user.email },
    { info: "Skill/Occupation", value: "Application Developer" },
    ...(user.isInstructor
      ? [
          {
            info: "Biography",
            value: user.instructorDescription,
          },
        ]
      : []),
  ];
  user.isInstructor && profileInfo.push();
  const inputRef = useRef(null);

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
  useEffect(
    () => () => {
      // clear object url from browser
      if (newImgUrl) URL.revokeObjectURL(newImgUrl);
    },
    [newImgUrl]
  );
  return (
    <Box
      p={4}
      className="shadow-1"
      bgcolor="background.paper"
      borderRadius="8px"
      minHeight="83.4vh"
    >
      <InfoBoxWrapper title={"Profile"} />
      <Box mt={2}>
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
        <input
          onChange={(e) => handleUpdateImg(e.target.files)}
          type="file"
          name=""
          id="image-input"
          hidden
          accept="image/*"
          ref={inputRef}
        />

        <Stack gap={1}>
          {profileInfo.map(({ info, value }) => (
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
                mb="20px"
              >
                {`${info} :`}
              </Typography>
              <Typography mb="20px" color="lightDark" variant="body1">
                {value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default withHelmet(ProfilePage, "Profile");

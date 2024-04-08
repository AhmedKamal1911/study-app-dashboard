import { Box, Stack, Typography } from "@mui/material";
import { InfoBoxWrapper } from "../../components";
import { useAuth } from "../../contexts/authContext";
import avatarImg from "../../assets/images/person.png";
import { formatDate } from "../../utils";
const ProfilePage = () => {
  const {
    auth: { user },
  } = useAuth();
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
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
          }}
        >
          {user.avatar ? (
            <img
              src={user.avatar ?? avatarImg}
              style={{
                width: "200px",
                aspectRatio: "1",
                borderRadius: "50%",
                outline: "4px groove #009688",
                pointerEvents: "none",
                userSelect: "none",
              }}
              alt="avatar"
            />
          ) : (
            <img
              src={avatarImg}
              style={{
                width: "200px",
                aspectRatio: "1",
              }}
              alt="avatar"
            />
          )}
        </div>

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

export default ProfilePage;

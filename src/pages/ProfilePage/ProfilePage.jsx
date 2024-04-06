import { Box, Stack, Typography } from "@mui/material";
import InfoBoxWrapper from "../../components/InfoBoxWrapper";
import { useAuth } from "../../contexts/authContext";
const profileInfo = [
  { info: "Registration Date", value: "February 25,2025 6:01 am" },
  { info: "First Name", value: "Ahmed" },
  { info: "Last Name", value: "Kamal" },
  { info: "Username", value: "instructor" },
  { info: "Email", value: "example@gmail.com" },
  { info: "Phone Number", value: "01206881013" },
  { info: "Skill/Occupation", value: "Application Developer" },
  {
    info: "Biography",
    value:
      "I'm the Front-End Developer for #Rainbow IT in Bangladesh, OR. I have serious passion for UI effects, animations and creating intuitive, dynamic user experiences.",
  },
];
const ProfilePage = () => {
  const { auth } = useAuth();
  const [firstName, lastName] = auth.user.fullName.split(" ");

  return (
    <Box
      p={4}
      className="shadow-1"
      bgcolor="background.paper"
      borderRadius="8px"
      minHeight="83.4vh"
    >
      <InfoBoxWrapper title={"Profile"} />
      <Box mt={5}>
        <Stack direction={{ xs: "column", md: "row" }} gap={8}>
          <Stack direction="column" gap={7}>
            {profileInfo.map(({ info }) => (
              <Box key={info} direction="column">
                <Typography color="body" fontWeight="bold">
                  {info}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Stack direction="column" gap={7}>
            <Box>
              <Typography color="lightDark" variant="body1" maxWidth="500px">
                {auth.user.createdAt}
              </Typography>
            </Box>

            <Box>
              <Typography
                color="lightDark"
                variant="body1"
                maxWidth="500px"
                textTransform="capitalize"
              >
                {firstName}
              </Typography>
            </Box>
            <Box>
              <Typography
                color="lightDark"
                variant="body1"
                maxWidth="500px"
                textTransform="capitalize"
              >
                {lastName}
              </Typography>
            </Box>
            <Box>
              <Typography color="lightDark" variant="body1" maxWidth="500px">
                {auth.user.username}
              </Typography>
            </Box>
            <Box>
              <Typography color="lightDark" variant="body1" maxWidth="500px">
                {auth.user.email}
              </Typography>
            </Box>
            <Box>
              <Typography color="lightDark" variant="body1" maxWidth="500px">
                01226891043
              </Typography>
            </Box>
            <Box>
              <Typography color="lightDark" variant="body1" maxWidth="500px">
                Application Developer
              </Typography>
            </Box>
            <Box>
              <Typography color="lightDark" variant="body1" maxWidth="500px">
                I'm the Front-End Developer for #Rainbow IT in Bangladesh, OR. I
                have serious passion for UI effects, animations and creating
                intuitive, dynamic user experiences.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfilePage;

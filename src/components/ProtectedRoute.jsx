import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Unauthorized } from ".";
import { Box } from "@mui/material";

const UNAUTHORIZED_MSGS = {
  NOT_ADMIN: "You can't access this page (Only admins) because it's protected",
  NOT_INSTRUCTOR:
    "You can't access this page (Only Instructors) because it's protected",
  NOT_INSTRUCTOR_OR_STUDENT:
    "You can't access this page (Only Instructors + Students) because it's protected",
  NOT_STUDENT:
    "You can't access this page (Only Students) because it's protected",
};

const ProtectedRoute = ({
  onlyAdmin = false,
  onlyInstructor = false,
  onlyStudent = false,
  onlyInstructorAndStudent = false,
}) => {
  const { auth } = useAuth();
  const { pathname } = useLocation();
  function getUserUnauthorizedKey() {
    return onlyAdmin && !auth.user.isAdmin
      ? "NOT_ADMIN"
      : onlyInstructor && !auth.user.isInstructor
      ? "NOT_INSTRUCTOR"
      : onlyStudent && (auth.user.isAdmin || auth.user.isInstructor)
      ? "NOT_STUDENT"
      : onlyInstructorAndStudent && auth.user.isAdmin
      ? "NOT_INSTRUCTOR_OR_STUDENT"
      : null;
  }
  const unauthorizedMsgKey = getUserUnauthorizedKey();
  if (unauthorizedMsgKey) {
    return pathname === "/sign-up" ? (
      <Box
        height="100vh"
        bgcolor="background.default"
        display="grid"
        sx={{
          placeItems: "center",
        }}
      >
        <Unauthorized message={UNAUTHORIZED_MSGS[unauthorizedMsgKey]} />
      </Box>
    ) : (
      <Unauthorized message={UNAUTHORIZED_MSGS[unauthorizedMsgKey]} />
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;

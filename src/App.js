import React, { Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
// import { Aside, Feed } from "./components";
import StatsPage from "./pages/StatsPage/StatsPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import { ColorModeProvider } from "./contexts/themeContext.js";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateCoursePage from "./pages/CreateCoursePage/CreateCoursePage.jsx";
import InstructorCourseReviewsPage from "./pages/InstructorCourseReviewsPage/InstructorCourseReviewsPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import UserCoursesPage from "./pages/UserCoursesPage/UserCoursesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import AuthProvider from "./contexts/authContext.js";
import StudentEnrollPage from "./pages/StudentEnrollPage/StudentEnrollPage.jsx";
import ModalProvider from "./contexts/modalContext.js";
import Loader from "./components/Loader.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import SnackBarProvider from "./contexts/snackbarContext.js";
const usersBaseURL = {
  instructor: "/courses",
  admin: "/",
  student: "/courses",
};
export function getUserBaseURL(user) {
  const userType = user.isAdmin
    ? "admin"
    : user.isInstructor
    ? "instructor"
    : "student";
  return usersBaseURL[userType];
}
const RootLayout = lazy(() => import("./layouts/RootLayout/RootLayout.jsx"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PersistLogin />}>
        <Route path="/login" element={<LoginPage />} />
        {/* Require login + admin */}
        <Route element={<ProtectedRoute onlyAdmin />}>
          <Route path="/sign-up" element={<RegisterPage />} />
        </Route>
        {/*== Require login + admin ==*/}

        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <RootLayout />
            </Suspense>
          }
        >
          <Route errorElement={<ErrorPage />}>
            {/* Require login + admin */}
            <Route element={<ProtectedRoute onlyInstructor />}>
              <Route path="/create-course" element={<CreateCoursePage />} />
            </Route>
            <Route element={<ProtectedRoute onlyStudent />}>
              <Route path="/enroll" element={<StudentEnrollPage />} />
            </Route>
            <Route element={<ProtectedRoute onlyAdmin />}>
              <Route index element={<StatsPage />} />
            </Route>

            <Route element={<ProtectedRoute onlyInstructor />}>
              <Route
                path="/course-reviews"
                element={<InstructorCourseReviewsPage />}
              />
            </Route>

            {/*== Require login + admin ==*/}
            {/* Require login */}
            <Route element={<ProtectedRoute onlyInstructorAndStudent />}>
              <Route path="/courses" element={<UserCoursesPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            {/*== Require login ==*/}
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);
const App = () => {
  return (
    <>
      <ColorModeProvider>
        <AuthProvider>
          <ModalProvider>
            <SnackBarProvider>
              <RouterProvider router={router} />
            </SnackBarProvider>
          </ModalProvider>
        </AuthProvider>
      </ColorModeProvider>
      <CssBaseline />
    </>
  );
};

export default App;

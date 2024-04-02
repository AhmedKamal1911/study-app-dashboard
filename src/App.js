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

const RootLayout = lazy(() => import("./layouts/RootLayout/RootLayout.jsx"));
// TODO: change loading fallback inside the suspense
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
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
          <Route element={<ProtectedRoute onlyAdmin />}>
            <Route path="/create-course" element={<CreateCoursePage />} />
            <Route path="/enroll" element={<StudentEnrollPage />} />
            <Route index element={<StatsPage />} />
            <Route
              path="/course-reviews"
              element={<InstructorCourseReviewsPage />}
            />
          </Route>
          {/*== Require login + admin ==*/}
          {/* Require login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/courses" element={<UserCoursesPage />} />
          </Route>
          {/*== Require login ==*/}
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
            <RouterProvider router={router} />
          </ModalProvider>
        </AuthProvider>
      </ColorModeProvider>
      <CssBaseline />
    </>
  );
};

export default App;

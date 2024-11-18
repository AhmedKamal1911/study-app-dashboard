import { Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoute, Loader, PersistLogin } from "../components";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import CourseReviews from "../pages/CourseReviews/CourseReviews.jsx";
const RootLayout = lazy(() => import("../layouts/RootLayout/RootLayout.jsx"));
const StatsPage = lazy(() => import("../pages/StatsPage/StatsPage.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage.jsx"));
const ForgetPassword = lazy(() =>
  import("../pages/ForgetPassword/ForgetPassword.jsx")
);
const ResetPasswordVerifyCodePage = lazy(() =>
  import("../pages/ResetPasswordVerifyCodePage/ResetPasswordVerifyCodePage.jsx")
);
const ManageUsers = lazy(() => import("../pages/ManageUsers/ManageUsers.jsx"));
const ManageCourses = lazy(() =>
  import("../pages/ManageCourses/ManageCourses.jsx")
);
const CreateCoursePage = lazy(() =>
  import("../pages/CreateCoursePage/CreateCoursePage.jsx")
);
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage.jsx"));
const UserCoursesPage = lazy(() =>
  import("../pages/UserCoursesPage/UserCoursesPage.jsx")
);
const StudentEnrollPage = lazy(() =>
  import("../pages/StudentEnrollPage/StudentEnrollPage.jsx")
);
const InstructorCourseReviewsPage = lazy(() =>
  import("../pages/InstructorCourseReviewsPage/InstructorCourseReviewsPage.jsx")
);
const CoursePage = lazy(() => import("../pages/CoursePage/CoursePage.jsx"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PersistLogin />}>
        <Route
          path="/password-verify-code"
          element={
            <Suspense>
              <ResetPasswordVerifyCodePage />
            </Suspense>
          }
        />
        <Route
          path="/forget-password"
          element={
            <Suspense>
              <ForgetPassword />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense>
              <LoginPage />
            </Suspense>
          }
        />

        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <RootLayout />
            </Suspense>
          }
        >
          <Route element={<ProtectedRoute onlyInstructor />}>
            <Route
              path="/create-course"
              element={
                <Suspense fallback={<Loader />}>
                  <CreateCoursePage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute onlyStudent />}>
            <Route
              path="/enroll"
              element={
                <Suspense fallback={<Loader />}>
                  <StudentEnrollPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute onlyAdmin />}>
            <Route
              index
              element={
                <Suspense>
                  <StatsPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute onlyAdmin />}>
            <Route
              path="/manage-users"
              element={
                <Suspense>
                  <ManageUsers />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute onlyAdmin />}>
            <Route
              path="/manage-courses"
              element={
                <Suspense>
                  <ManageCourses />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute onlyAdmin />}>
            <Route
              path="/course/:slug/reviews"
              element={
                <Suspense>
                  <CourseReviews />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute onlyInstructorAndStudent />}>
            <Route
              path="/courses"
              element={
                <Suspense fallback={<Loader />}>
                  <UserCoursesPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={
                <Suspense>
                  <ProfilePage />
                </Suspense>
              }
            />
          </Route>

          <Route element={<ProtectedRoute onlyInstructor />}>
            <Route
              path="/course-reviews"
              element={
                <Suspense fallback={<Loader />}>
                  <InstructorCourseReviewsPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute onlyInstructor />}>
            <Route
              path="/course/:slug"
              element={
                <Suspense fallback={<Loader />}>
                  <CoursePage />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

const usersBaseURL = {
  INSTRUCTOR: "/courses",
  ADMIN: "/",
  STUDENT: "/courses",
};
export const USER_AUTHORIZED_ROUTES = {
  STUDENT: ["/enroll", "/courses"],
  ADMIN: ["/", "/manage-users", "/manage-courses", "/course/:slug/reviews"],
  INSTRUCTOR: [
    "/courses",
    "/create-course",
    "/course-reviews",
    "/course/:slug",
  ],
};
export function getUserBaseURL(user) {
  const userType = getUserType(user);
  return usersBaseURL[userType];
}

export const getUserType = (user) =>
  user.isInstructor ? "INSTRUCTOR" : user.isAdmin ? "ADMIN" : "STUDENT";

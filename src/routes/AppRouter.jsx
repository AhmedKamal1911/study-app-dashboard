import { Suspense, lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoute, Loader, PersistLogin } from "../components";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
const RootLayout = lazy(() => import("../layouts/RootLayout/RootLayout.jsx"));
const StatsPage = lazy(() => import("../pages/StatsPage/StatsPage.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage.jsx"));
const DeleteUserPage = lazy(() =>
  import("../pages/DeleteUserPage/DeleteUserPage.jsx")
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PersistLogin />}>
        <Route
          path="/login"
          element={
            <Suspense>
              <LoginPage />
            </Suspense>
          }
        />
        <Route element={<ProtectedRoute onlyAdmin />}>
          <Route
            path="/delete-user"
            element={
              <Suspense fallback={<Loader />}>
                <DeleteUserPage />
              </Suspense>
            }
          />
        </Route>
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
  ADMIN: ["/", "/delete-user"],
  INSTRUCTOR: ["/courses", "/create-course", "/course-reviews"],
};
export function getUserBaseURL(user) {
  const userType = getUserType(user);
  return usersBaseURL[userType];
}

export const getUserType = (user) =>
  user.isInstructor ? "INSTRUCTOR" : user.isAdmin ? "ADMIN" : "STUDENT";

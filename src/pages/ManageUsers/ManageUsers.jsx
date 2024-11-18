import { Box } from "@mui/material";

import withHelmet from "../../components/withHelmet";

import useFetch from "../../hooks/useFetch.js";
import InfoBoxWrapper from "../../components/InfoBoxWrapper";
import fetchFromAPI from "../../services/api.js";
import { useSnackbar } from "../../contexts/snackbarContext.js";
import UsersTable from "../../components/UsersTable.jsx";
const adminEndpoint = "admin-dashboard";
const ManageUsers = () => {
  const { openSnackbar } = useSnackbar();

  const {
    refetch: activeUsersRefetch,
    responseData: activeUsers,
    isLoading: activeUsersIsLoading,
    error: activeUsersError,
  } = useFetch({
    url: `/${adminEndpoint}/active-users`,
  });
  const {
    refetch: inActiveUsersRefetch,
    responseData: inActiveUsers,
    isLoading: inActiveUsersIsLoading,
    error: inActiveUsersError,
  } = useFetch({
    url: `/${adminEndpoint}/inactive-users`,
  });
  const {
    refetch: inActiveInstructorsRefetch,
    responseData: inActiveInstructors,
    isLoading: inActiveInstructorsIsLoading,
    error: inActiveInstructorsError,
  } = useFetch({
    url: `/${adminEndpoint}/inactive-instructors`,
  });
  const {
    refetch: activeInstructorsRefetch,
    responseData: activeInstructors,
    isLoading: activeInstructorsIsLoading,
    error: activeInstructorsError,
  } = useFetch({
    url: `/${adminEndpoint}/active-instructors`,
  });

  const activeUser = async (id) => {
    try {
      await fetchFromAPI({
        url: `/${adminEndpoint}/active-user/${id}`,
        method: "POST",
      });
      activeUsersRefetch();
      inActiveUsersRefetch();
      openSnackbar("User activated successfully.");
    } catch (e) {
      openSnackbar("Failed to activate user due to a network error.", "error");
    }
  };

  const deactiveUser = async (id) => {
    try {
      await fetchFromAPI({
        url: `/${adminEndpoint}/deactive-user/${id}`,
        method: "DELETE",
      });
      inActiveUsersRefetch();
      activeUsersRefetch();
      openSnackbar("User deactivated successfully.");
    } catch (e) {
      openSnackbar("Failed to deactive user due to a network error.", "error");
    }
  };
  const activeInstructor = async (id) => {
    try {
      await fetchFromAPI({
        url: `/${adminEndpoint}/active-instructor/${id}`,
        method: "POST",
      });
      activeInstructorsRefetch();
      inActiveInstructorsRefetch();
      openSnackbar("Instructor activated successfully.");
    } catch (e) {
      openSnackbar(
        "Failed to activate Instructor due to a network error.",
        "error"
      );
    }
  };
  const deactiveInstructor = async (id) => {
    try {
      await fetchFromAPI({
        url: `/${adminEndpoint}/deactive-instructor/${id}`,
        method: "DELETE",
      });
      inActiveInstructorsRefetch();
      activeInstructorsRefetch();
      openSnackbar("Instructor deactivated successfully.");
    } catch (e) {
      openSnackbar(
        "Failed to deactivate Instructor due to a network error.",
        "error"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 2,
      }}
    >
      <InfoBoxWrapper title="Active Users">
        <UsersTable
          onActiveUser={deactiveUser}
          usersData={activeUsers?.data}
          isLoading={activeUsersIsLoading}
          error={activeUsersError}
          errorText={"Failed to Fetch Active Users Data"}
        />
      </InfoBoxWrapper>
      {inActiveUsers?.data.length > 0 && (
        <InfoBoxWrapper title="InActive Users">
          <UsersTable
            onActiveUser={activeUser}
            usersData={inActiveUsers?.data}
            isLoading={inActiveUsersIsLoading}
            error={inActiveUsersError}
            errorText={"Failed to Fetch InActive Users Data"}
          />
        </InfoBoxWrapper>
      )}

      <InfoBoxWrapper title="Active Instructors">
        <UsersTable
          onActiveUser={deactiveInstructor}
          usersData={activeInstructors?.data}
          isLoading={activeInstructorsIsLoading}
          error={activeInstructorsError}
          errorText={"Failed to Fetch Active Instructors Data"}
        />
      </InfoBoxWrapper>
      {inActiveInstructors?.data.length > 0 && (
        <InfoBoxWrapper title="InActive Instructors">
          <UsersTable
            onActiveUser={activeInstructor}
            usersData={inActiveInstructors?.data}
            isLoading={inActiveInstructorsIsLoading}
            error={inActiveInstructorsError}
            errorText={"Failed to Fetch InActive Instructors Data"}
          />
        </InfoBoxWrapper>
      )}
    </Box>
  );
};

export default withHelmet(ManageUsers, "Manage Users");

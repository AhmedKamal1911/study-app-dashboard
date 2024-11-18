import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { CustomNoRowsOverlay } from "./UsersTable";
import TableError from "./TableError";
import { useModal } from "../contexts/modalContext";

const paginationModel = { page: 0, pageSize: 5 };
function DeleteCourseButton({ params, onCourseDelete }) {
  const { openModal } = useModal();
  const openM = () => {
    openModal("ConfirmModal", {
      onConfirm: () => onCourseDelete(params.id),
      title: `Are you sure you want to delete this course ?`,
    });
  };
  return (
    <Button
      onClick={openM}
      variant="contained"
      color={"error"}
      size="small"
      sx={{
        width: "100%",
        fontWeight: "bold",
        color: "white",
        "&:hover": {
          backgroundColor: "darkred",
        },
      }}
    >
      Delete
    </Button>
  );
}

const CoursesTable = ({
  coursesData,
  isLoading,
  error,
  errorText,
  onCourseDelete,
}) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
      resizable: false,
    },
    {
      field: "title",
      headerName: "Course Title",
      width: 200,
      resizable: false,
    },
    {
      field: "language",
      headerName: "Language",
      width: 120,
      resizable: false,
    },
    {
      field: "courseLink",
      headerName: "Course Link",
      width: 200,
      headerAlign: "center",
      align: "center",
      resizable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          target="_blank"
          color={"primary"}
          size="small"
          href={params.row.courseLink}
          sx={{
            width: "60%",
            fontWeight: "bold",
            color: "white",
            "&:hover": {
              backgroundColor: "purple",
            },
          }}
        >
          Show
        </Button>
      ),
    },

    {
      field: "Action",
      headerName: "Action",
      width: 120,
      // editable: true,
      headerAlign: "center",
      resizable: false,
      renderCell: (params) => {
        return (
          <DeleteCourseButton params={params} onCourseDelete={onCourseDelete} />
        );
      },
    },
    {
      field: "reviews",
      headerName: "reviews",
      width: 130,
      // editable: true,
      headerAlign: "center",
      align: "center",
      resizable: false,
      renderCell: (params) => {
        const slug = params.row.title?.split(" ").join("-");

        return (
          <Button
            variant="contained"
            color={"primary"}
            size="small"
            href={`/course/${slug}/reviews`}
            sx={{
              width: "100%",
              fontWeight: "bold",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            Show Reviews
          </Button>
        );
      },
    },
  ];
  return (
    <Paper
      sx={{
        height: 300,
        width: "100%",
        marginBottom: "30px",
        border: (theme) => `1px solid ${theme.palette.lightDark}`,
      }}
    >
      {error ? (
        <TableError errorText={errorText} />
      ) : (
        <DataGrid
          loading={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
          }}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          rows={coursesData}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 8]}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
};

export default CoursesTable;

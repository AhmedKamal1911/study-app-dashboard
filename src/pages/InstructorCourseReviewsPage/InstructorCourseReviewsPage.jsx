import styled from "@emotion/styled";
import {
  Box,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/authContext";
import { calculateReviewValue } from "../../utils";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.lightDark,
    color: theme.palette.common.white,
    border: "0",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(219 ,221, 222,  15%)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: "none",
  },
}));
const labels = {
  0: { text: "No Reviews", color: "" },
  1: { text: "Useless", color: "gray" },
  2: { text: "Poor", color: "red" },
  3: { text: "Ok", color: "yellowgreen" },
  4: { text: "Good", color: "green" },
  5: { text: "Excellent", color: "gold" },
};
const InstructorCourseReviewsPage = () => {
  const { auth } = useAuth();

  const { error, responseData, isLoading } = useFetch({
    url: `/reviews/instructor/${auth.user.username}`,
  });

  // const reviewsToShow = responseData?.slice(0, 10);

  return (
    <Box height="84.9vh">
      <Loading isLoading={isLoading} error={error}>
        {responseData?.courses.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              height: "800px",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Course</StyledTableCell>
                  <StyledTableCell>Feedback</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responseData?.courses.map((course) => {
                  const reviewValue = calculateReviewValue(course.reviews);
                  return (
                    <StyledTableRow key={course.id}>
                      <StyledTableCell component="th" scope="row">
                        {course.title}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="column" gap={1}>
                          <Stack direction="row">
                            <Rating
                              readOnly
                              value={reviewValue}
                              sx={{
                                color: "#FF8F3C",
                                "& .css-1tv3chh-MuiRating-icon": {
                                  color: "rgb(222 220 220)",
                                },
                                mr: "5px",
                              }}
                            />
                            <Typography
                              sx={{ textWrap: "nowrap" }}
                              variant="body1"
                              fontWeight="bold"
                              color="dark"
                            >
                              ({course.reviews.length} Reviews)
                            </Typography>
                          </Stack>

                          <Typography color={labels[reviewValue].color}>
                            {labels[reviewValue].text}
                          </Typography>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            display="flex"
            variant="h4"
            textAlign="center"
            height="100%"
            color="dark"
            justifyContent="center"
            alignItems="center"
          >
            You Have No Reviews
          </Typography>
        )}
      </Loading>
    </Box>
  );
};

export default InstructorCourseReviewsPage;

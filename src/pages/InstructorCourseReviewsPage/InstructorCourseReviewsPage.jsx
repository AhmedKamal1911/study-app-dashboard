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
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
const InstructorCourseReviewsPage = () => {
  const { error, responseData, isLoading } = useFetch({
    url: "/reviews",
  });
  const reviewsToShow = responseData?.slice(0, 10);
  return (
    <Box minHeight="83.4vh">
      <Loading isLoading={isLoading} error={error}>
        <TableContainer sx={{ maxHeight: "83vh" }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Course</StyledTableCell>
                <StyledTableCell>Feedback</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviewsToShow?.map(({ courseId, id, reviewValue }) => (
                <StyledTableRow key={id}>
                  <StyledTableCell component="th" scope="row">
                    {id}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="column" gap={1}>
                      <Stack direction="row">
                        <Rating
                          readOnly
                          value={reviewValue}
                          precision={0.5}
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
                          (9 Reviews)
                        </Typography>
                      </Stack>

                      <Typography
                        color={
                          reviewValue < 2
                            ? "red"
                            : reviewValue >= 2
                            ? "#ffae2f"
                            : reviewValue >= 3
                            ? "#4abe43"
                            : ""
                        }
                      >
                        {labels[Math.round(reviewValue)]}
                      </Typography>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Loading>
    </Box>
  );
};

export default InstructorCourseReviewsPage;

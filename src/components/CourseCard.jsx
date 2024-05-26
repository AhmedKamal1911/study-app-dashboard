import { Box, Button, Rating, Stack, Tooltip, Typography } from "@mui/material";
import { PeopleOutline, Star } from "@mui/icons-material";
import { useModal } from "../contexts/modalContext";

const CourseCard = ({
  onDelete,
  onUnenroll,
  onReviewCreation,
  totalStudents,
  courseImg,
  reviewsCount,
  courseLink,
  ratingValue,
  hideReviewBtn = false,
  hideUnenrollBtn = false,
  hideDeleteBtn = false,
  title,
}) => {
  const { openModal } = useModal();

  const handleReviewBtnClick = () => {
    openModal("ReviewModal", { onReviewCreation });
  };
  const openUnenrollConfirmModal = () => {
    openModal("ConfirmModal", {
      onConfirm: onUnenroll,
      title: "Are you sure you want to unenroll from this course ?",
    });
  };
  const openDeleteConfirmModal = () => {
    openModal("ConfirmModal", {
      onConfirm: onDelete,
      title: "Are you sure you want to Delete this course ?",
    });
  };
  return (
    <Box p={3} borderRadius="8px" boxShadow={2} sx={{ background: "white" }}>
      <Box>
        <img
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: "#e7e7e7",
            border: "1px solid rgb(222 220 220)",
            borderRadius: "8px",
          }}
          src={courseImg}
          alt="course"
        />
      </Box>
      <Stack
        my={2}
        direction="row"
        gap={1}
        flexWrap="wrap"
        alignItems="center"
        justifyContent={"flex-start"}
      >
        <Rating
          readOnly
          value={ratingValue > 5 ? 5 : ratingValue}
          precision={0.5}
          sx={{
            color: "#FF8F3C",
            "& .css-1tv3chh-MuiRating-icon": {
              color: "rgb(222 ,220 ,220)",
            },
          }}
        />
        <Typography sx={{ textWrap: "nowrap" }} fontWeight="bold" color="body">
          {`(${reviewsCount} reviews)`}
        </Typography>
      </Stack>
      <Tooltip title={title}>
        <Typography
          variant="h4"
          fontSize="25px"
          textTransform="capitalize"
          color="#192335"
          fontWeight="bold"
          className="line-clamp"
        >
          {title}
        </Typography>
      </Tooltip>

      <Stack
        my={3}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Stack direction="row" gap={1}>
          <PeopleOutline />
          <Typography color="body">{`${totalStudents} Students`}</Typography>
        </Stack>
        <Stack direction={{ md: "row" }} sx={{ gap: "10px", width: "100%" }}>
          {!hideUnenrollBtn && (
            <Button
              onClick={openUnenrollConfirmModal}
              variant="contained"
              size="small"
              sx={{ mr: { xs: "0px", md: "10px" } }}
            >
              UnEnroll
            </Button>
          )}

          {!hideReviewBtn && (
            <Button onClick={handleReviewBtnClick} variant="outlined">
              <Star sx={{ mr: "5px" }} /> Rate
            </Button>
          )}
          {!hideDeleteBtn && (
            <Button
              onClick={openDeleteConfirmModal}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
          )}
        </Stack>
      </Stack>
      <Box>
        <Button
          fullWidth
          component={"a"}
          target="_blank"
          href={courseLink}
          variant="contained"
        >
          Watch
        </Button>
      </Box>
    </Box>
  );
};

export default CourseCard;

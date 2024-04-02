import { Box, Button, Rating, Stack, Tooltip, Typography } from "@mui/material";
import { PeopleOutline, Star } from "@mui/icons-material";
import { useModal } from "../contexts/modalContext";
import fetchFromAPI from "../utils/constans/fetchFromApi";

const CourseCard = ({
  onReviewCreation,
  totalStudents,
  courseImg,
  reviewsCount,
  courseLink,
  ratingVale,
  title,
}) => {
  const { openModal } = useModal();

  const handleReviewBtnClick = () => {
    openModal("ReviewModal", { onReviewCreation });
  };
  return (
    <Box
      p={3}
      borderRadius="8px"
      className="shadow-1"
      sx={{ background: "white" }}
    >
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
          value={ratingVale > 5 ? 5 : ratingVale}
          precision={0.5}
          sx={{
            color: "#FF8F3C",
            "& .css-1tv3chh-MuiRating-icon": {
              color: "rgb(222 220 220)",
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
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Stack direction="row">
          <PeopleOutline />
          <Typography color="body">{`${totalStudents} Students`}</Typography>
        </Stack>

        <Button onClick={handleReviewBtnClick} variant="outlined">
          <Star sx={{ mr: "5px" }} /> Rate
        </Button>
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

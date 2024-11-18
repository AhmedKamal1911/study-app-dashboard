import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { Star, InsertComment } from "@mui/icons-material";
import { useModal } from "../contexts/modalContext";
import { profileImg } from "../assets/images";

const CourseReviewCard = ({ reviewData, onReviewDelete }) => {
  const creatorInfo = reviewData?.reviewCreator;
  const reviewId = reviewData?.id;
  const { openModal } = useModal();
  const confirmDelete = () => {
    openModal("ConfirmModal", {
      onConfirm: () => onReviewDelete(reviewId),
      title: `Are you sure you want to delete this Review ?`,
    });
  };
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={2}
      p={1}
      sx={{ bgcolor: "background.paper", borderRadius: "8px" }}
    >
      <Box>
        <Stack
          sx={{ alignItems: { xs: "center", sm: "flex-start" } }}
          direction={{ xs: "column", sm: "row" }}
          gap={1}
        >
          <Box>
            <img
              alt="profile img"
              src={creatorInfo?.avatar ?? profileImg}
              style={{ width: 100, height: 100, borderRadius: "8px" }}
            />
          </Box>
          <Stack
            sx={{ alignItems: { xs: "center", sm: "flex-start" } }}
            direction="column"
            gap={1}
          >
            <Rating
              name="text-feedback"
              value={reviewData?.rating}
              readOnly
              precision={0.5}
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                color: "dark",
                textTransform: "capitalize",
              }}
            >
              {creatorInfo?.fullName}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          mt={2}
          direction="row"
          sx={{ alignItems: "flex-start" }}
          gap={{ xs: 1, sm: 2 }}
        >
          <InsertComment
            sx={{ color: "dark", fontSize: { xs: "25px", sm: "50px" } }}
          />
          <Typography color="dark">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            quidem omnis tenetur similique nemo commodi eligendi alias odio,
            ipsam velit corrupti reprehenderit nam unde illo in aperiam
            obcaecati? Impedit, dignissimos? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Fugiat repudiandae maxime officiis
            repellat facilis nesciunt, quasi architecto, quia quo nostrum omnis
            eaque rerum ratione voluptatibus iusto. Minima exercitationem
            corrupti quaerat?
          </Typography>
        </Stack>
      </Box>
      <Button
        onClick={confirmDelete}
        variant="contained"
        color={"error"}
        size="small"
        sx={{
          fontWeight: "bold",
          alignSelf: { xs: "stretch", sm: "flex-start" },
          color: "white",
          "&:hover": {
            backgroundColor: "darkred",
          },
        }}
      >
        Delete
      </Button>
    </Stack>
  );
};

export default CourseReviewCard;

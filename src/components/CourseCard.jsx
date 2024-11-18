import {
  alpha,
  Box,
  Button,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { BackHand, Delete, PeopleOutline, Star } from "@mui/icons-material";
import { useModal } from "../contexts/modalContext";
import Menu from "@mui/material/Menu";

import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import styled from "@emotion/styled";
import { calculateReviewValue } from "../utils";
import { useNavigate } from "react-router-dom";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

const CourseCard = ({
  course,
  onDelete,
  onUnenroll,
  onReviewCreation,
  onReviewUpdate,
  onReviewDelete,

  hideReviewBtn = false,
  hideUnenrollBtn = false,
  hideDeleteBtn = false,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isInstructor = hideDeleteBtn;
  const open = Boolean(anchorEl);
  const hasReviewed = course.hasReviewed;
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const { openModal } = useModal();

  const handleUpdateCourseClick = () => {
    navigate(`/course/${course.slug}`);
  };

  const handleReviewBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (hasReviewed) {
      openModal("UpdateReviewModal", {
        onReviewUpdate,
        onReviewDelete,
        course,
        title: "Review Edit",
      });
    } else {
      openModal("ReviewModal", { onReviewCreation });
    }
    setAnchorEl(null);
  };
  const openUnenrollConfirmModal = (event) => {
    setAnchorEl(event.currentTarget);
    openModal("ConfirmModal", {
      onConfirm: onUnenroll,
      title: "Are you sure you want to unenroll from this course ?",
    });
    setAnchorEl(null);
  };
  const openDeleteConfirmModal = (event) => {
    setAnchorEl(event.currentTarget);
    openModal("ConfirmModal", {
      onConfirm: onDelete,
      title: "Are you sure you want to Delete this course ?",
    });
    setAnchorEl(null);
  };
  const courseReviewValue = calculateReviewValue(course.reviews);
  return (
    <Box p={1} borderRadius="8px" boxShadow={2} sx={{ background: "white" }}>
      <Box>
        <img
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: "#e7e7e7",
            border: "1px solid rgb(222 220 220)",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          src={course.thumbnails}
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
          value={courseReviewValue > 5 ? 5 : courseReviewValue}
          precision={0.5}
          sx={{
            color: "#FF8F3C",
            "& .MuiRating-iconEmpty": {
              color: "rgb(222 ,220 ,220)",
            },
          }}
        />
        <Typography sx={{ textWrap: "nowrap" }} fontWeight="bold" color="body">
          {`(${course.numberOfRatings} reviews)`}
        </Typography>
      </Stack>
      <Tooltip title={course.title}>
        <Typography
          variant="h4"
          fontSize="25px"
          textTransform="capitalize"
          color="#192335"
          fontWeight="bold"
          className="line-clamp"
        >
          {course.title}
        </Typography>
      </Tooltip>

      <Stack
        my={3}
        direction={{ xs: "column", lg: "row" }}
        alignItems={{ xs: "stretch", lg: "center" }}
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Stack direction="row" gap={1}>
          <PeopleOutline />
          <Typography color="body">{`${course.numberOfStudents} Students`}</Typography>
        </Stack>
        <Box>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{ width: "100%" }}
            variant="contained"
            disableElevation
            onClick={openMenu}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Options
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
          >
            {!isInstructor && (
              <MenuItem onClick={handleUpdateCourseClick} disableRipple>
                <EditIcon />
                Edit
              </MenuItem>
            )}

            {!hideDeleteBtn && (
              <MenuItem onClick={openDeleteConfirmModal} disableRipple>
                <Delete />
                Delete
              </MenuItem>
            )}

            {!hideReviewBtn && (
              <MenuItem onClick={handleReviewBtnClick} disableRipple>
                <Star
                  sx={{
                    mr: "5px",
                    color: course.hasReviewed ? "yellow!important" : "red",
                  }}
                />
                Rate
              </MenuItem>
            )}
            {!hideUnenrollBtn && (
              <MenuItem onClick={openUnenrollConfirmModal} disableRipple>
                <BackHand />
                UnEnroll
              </MenuItem>
            )}
          </StyledMenu>
        </Box>
      </Stack>
      <Box>
        <Button
          fullWidth
          component={"a"}
          target="_blank"
          href={course.courseLink}
          variant="contained"
        >
          Watch
        </Button>
      </Box>
    </Box>
  );
};

export default CourseCard;

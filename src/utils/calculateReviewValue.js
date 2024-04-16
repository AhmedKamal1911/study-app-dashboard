import { calculateTotal } from ".";

function calculateReviewValue(reviews) {
  return reviews.length > 0
    ? Math.ceil(calculateTotal(reviews, "rating") / reviews.length)
    : 0;
}
export default calculateReviewValue;

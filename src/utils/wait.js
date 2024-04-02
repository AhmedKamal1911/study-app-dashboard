function wait(time = 4000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
export default wait;

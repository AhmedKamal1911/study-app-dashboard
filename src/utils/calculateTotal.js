function calculateTotal(data, property) {
  return data.reduce((total, item) => total + item[property], 0);
}
export default calculateTotal;

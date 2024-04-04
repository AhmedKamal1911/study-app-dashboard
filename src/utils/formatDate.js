function formatDate(dateStr, formatOptions) {
  const date = new Date(dateStr);
  const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {});
  DATE_FORMATTER.format(date);
}
export default formatDate;

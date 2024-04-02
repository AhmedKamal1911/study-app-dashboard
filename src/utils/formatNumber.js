export function formatNumber(number) {
  let num = new Intl.NumberFormat(undefined, { notation: "standard" });

  let result = num.format(typeof number === "string" ? Number(number) : number);

  return result;
}

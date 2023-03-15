export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number / 1000);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  //flat because colors are arrays of array
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};

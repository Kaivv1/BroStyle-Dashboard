export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);

export function getImageName(imageUrl) {
  const imagePathArr = imageUrl.split("/");
  const imageName = imagePathArr[imagePathArr.length - 1].split("?")[0];

  return imageName;
}

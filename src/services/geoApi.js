/*eslint-disable */
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function getCountryFlag(name) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);

  if (!res.ok) throw new Error("Could not get user country data");

  const country = await res.json();
  const countryFlag = country.at(0)?.flags?.png;

  return countryFlag;
}

export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );

  if (!res.ok) throw new Error("Could not get user address");

  const data = await res.json();

  return data;
}

export async function fetchAddress() {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const countryFlag = await getCountryFlag(
    addressObj?.countryName.toLowerCase(),
  );

  const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.countryName}${addressObj?.postcode ? `, ${addressObj?.postcode}` : ""}`;

  return { address, countryFlag };
}

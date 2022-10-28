export const parseCookies = (cookie = "") => {
  cookie
    .split(";")
    .map((value) => value.split("="))
    .map(([key, ...values]) => [key, values.join("=")])
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = decodeURIComponent(value);
      return acc;
    }, {});
};

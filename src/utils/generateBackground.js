export const getBackgroundImage = (weather) => {
  const base = "/Weather_app/assets/";
  switch (weather) {
    case "Clear":
      return `${base}clear-sky.webp`;
    case "Sunny":
      return `${base}clear-sky.webp`;
    case "Partly Cloudy":
      return `${base}Cloudy.jpg`;
    case "Moderate or heavy rain with thunder":
      return `${base}rainy.webp`;
    case "Patchy rain nearby":
      return `${base}rainy.webp`;
    case "Light snow showers":
      return `${base}snow-images.jpg`;
    default:
      return `${base}default.jpg`;
  }
};

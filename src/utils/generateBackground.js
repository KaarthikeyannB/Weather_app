export const getBackgroundImage = (weather) => {
  const base = import.meta.env.BASE_URL || "/";
  switch (weather) {
    case "Clear":
      return `${base}assets/clear-sky.webp`;
    case "Sunny":
      return `${base}assets/clear-sky.webp`;
    case "Partly Cloudy":
      return `${base}assets/Cloudy.jpg`;
    case "Moderate or heavy rain with thunder":
      return `${base}assets/rainy.webp`;
    case "Patchy rain nearby":
      return `${base}assets/rainy.webp`;
    case "Light snow showers":
      return `${base}assets/snow-images.jpg`;
    default:
      return `${base}assets/default.jpg`;
  }
};

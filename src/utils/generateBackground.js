export const getBackgroundImage = (weather) => {
  switch (weather) {
    case "Clear":
      return "assets/clear-sky.webp";
    case "Sunny":
      return "assets/clear-sky.webp";
    case "Partly Cloudy":
      return "assets/Cloudy.jpg";
    case "Moderate or heavy rain with thunder":
      return "assets/rainy.webp";
    case "Patchy rain nearby":
      return "assets/rainy.webp";
    case "Light snow showers":
      return "assets/snow-images.jpg";
    default:
      return "assets/default.jpg";
  }
};

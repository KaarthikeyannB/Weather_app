import { getBackgroundImage } from "../utils/generateBackground";

import { FaMapMarkerAlt } from "react-icons/fa";
import { GoDot } from "react-icons/go";

const Weather = ({ weatherData }) => {
  const backgroundImage = getBackgroundImage(
    weatherData?.current?.condition?.text || "default"
  );

  // console.log(weatherData);

  return (
    <div
      className="relative mx-2 bg-cover bg-center h-[70vh] xl:h-[100vh]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-opacity-10" />
      <div
        className={`relative z-10 p-4 ${
          weatherData?.current?.condition?.text ===
          "Moderate or heavy rain with thunder"
            ? "text-white "
            : "text-white"
        }`}
      >
        <div className="flex gap-2 mt-2 ">
          <FaMapMarkerAlt className="text-2xl" />
          <h2 className="text-3xl font-bold mb-4">
            {weatherData?.location?.name},{weatherData?.location?.country},{" "}
            {weatherData?.location?.region}
          </h2>
        </div>
        <h1 className="mt-3">{weatherData?.location?.localtime}</h1>
        <div className="flex gap-1 mt-1">
          <h1 className="text-9xl">{weatherData?.current?.temp_c}</h1>
          <GoDot className="text-7xl font-bold" />
          <span className="text-7xl font-medium">C</span>
        </div>

        <div className="mt-4 flex flex-col gap-2 justify-center items-center">
          <div className="flex items-center gap-2">
            <img
              src={`https:${weatherData?.current?.condition.icon}`}
              alt={weatherData?.current?.condition?.text}
              className="w-20 h-20 border-2 rounded-2xl shadow-lg"
            />
            <h2 className="text-2xl font-semibold">
              {weatherData?.current?.condition?.text}
            </h2>
          </div>
          <h1 className="text-2xl mt-5">Weather Today</h1>
          <div className="border rounded-3xl p-2 min-w-30 flex items-center justify-center bg-white gap-3">
            {["06:00", "12:00", "18:00", "23:00"].map((targetTime) => {
              const hourly = weatherData?.forecast?.forecastday[0]?.hour?.find(
                (h) => h.time.endsWith(targetTime)
              );
              return (
                hourly && (
                  <div
                    key={targetTime}
                    className="p-4 bg-white rounded-lg shadow-2xl flex flex-col items-center gap-4 text-black"
                  >
                    <img
                      src={hourly.condition.icon}
                      alt={hourly.condition.text}
                    />
                    <h2 className="font-semibold">{targetTime}</h2>
                    <p>{hourly.temp_c}°C</p>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

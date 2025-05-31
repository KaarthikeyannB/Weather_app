import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { RiSpeedUpFill } from "react-icons/ri";
import { IoSunny } from "react-icons/io5";

const DashBoard = () => {
  const search = useSelector((state) => state.search);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const lastValidWeatherData = useRef(null);
  const fetchFutureWeather = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=ec2d4ffa774b453694d131712253105&q=${search}&days=7&aqi=no&alerts=no`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch forecast");
      }
      setWeatherData(data);
      lastValidWeatherData.current = data;
      setLoading(false);
    } catch (error) {
      setError(error.message || "Failed to fetch forecast");
      setLoading(false);
      if (lastValidWeatherData.current) {
        setWeatherData(lastValidWeatherData.current);
      }
    }
  };

  useEffect(() => {
    fetchFutureWeather();
  }, [search]);

  // console.log("Weather Data:", weatherData);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mx-3 dark:text-white">
      {error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}
      <h1 className="text-2xl font-bold">Weather Forecast</h1>
      <div className="border-2 flex rounded-2xl p-2  mx-2 justify-evenly">
        {weatherData?.forecast?.forecastday?.map((day, index) => (
          <div key={index} className="p-2  flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
            </div>
            <h2 className="md:text-xl md:font-bold">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h2>
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold">Today's Highlights</h1>

      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {weatherData?.current && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl border ">
            <h2 className="text-xl font-semibold">UV Index</h2>
            <div className="flex flex-col gap-2 items-center h-full">
              <RiSpeedUpFill className="text-4xl text-yellow-500" />
              <h1>{weatherData.current.uv}</h1>
            </div>
          </div>
        )}
        {weatherData?.forecast?.forecastday[0] && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl border">
            <h2 className="text-xl font-semibold">Wind Status</h2>
            <div className="flex flex-col gap-2 items-center h-full">
              <h1 className="text-2xl">{weatherData?.current?.wind_kph}Km/h</h1>
              <h1 className="text-2xl">{weatherData?.current?.wind_dir}</h1>
            </div>
          </div>
        )}
        {weatherData?.forecast?.forecastday[0] && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl border">
            <h2 className="text-xl font-semibold">Sunrise & Sunset</h2>
            <div className="flex flex-col gap-2 items-center h-full">
              <div className="flex items-center gap-2">
                <IoSunny className="text-4xl text-yellow-500" />
                <h1 className="text-2xl">
                  {weatherData?.forecast.forecastday[0].astro.sunrise}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <IoSunny className="text-4xl text-yellow-500" />
                <h1 className="text-2xl">
                  {weatherData?.forecast.forecastday[0].astro.sunset}
                </h1>
              </div>
            </div>
          </div>
        )}
        {weatherData?.forecast?.forecastday[0] && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl border">
            <h2 className="text-xl font-semibold">Humidity</h2>
            <div className="flex flex-col gap-2 items-center h-full">
              <h1 className="text-2xl">{weatherData?.current?.humidity}</h1>
            </div>
          </div>
        )}
        {weatherData?.forecast?.forecastday[0] && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl border">
            <h2 className="text-xl font-semibold">Visibility</h2>
            <div className="flex flex-col gap-2 items-center h-full">
              <h1 className="text-2xl">{weatherData?.current?.vis_km}Km</h1>
            </div>
          </div>
        )}
        {weatherData?.forecast?.forecastday[0] && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl border">
            <h2 className="text-xl font-semibold">Feels Like</h2>
            <div className="flex flex-col gap-2 items-center h-full">
              <h1 className="text-2xl">{weatherData?.current?.feelslike_c}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;

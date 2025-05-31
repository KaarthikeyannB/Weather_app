import { useEffect, useRef, useState } from "react";

import Weather from "../components/Weather";
import LoadingSpinner from "../components/LoadingSpinner"
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/slice/searchSlice";
import { addFavourite } from "../store/slice/favouriteSlice";
import DashBoard from "../components/DashBoard";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const lastValidWeatherData = useRef(null);

  const handleInputChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const fetchWeather = async (query = search) => {
    try {
      setLoading(true);
      setError("");
      const url =
        typeof query === "string"
          ? `http://api.weatherapi.com/v1/forecast.json?key=ec2d4ffa774b453694d131712253105&q=${query}&days=7&aqi=no&alerts=no`
          : `http://api.weatherapi.com/v1/forecast.json?key=ec2d4ffa774b453694d131712253105&q=${query.lat},${query.lon}&days=7&aqi=no&alerts=no`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Wrong spelling or no such place");
      setWeatherData(data);
      lastValidWeatherData.current = data;
      if (data.location && data.location.name) {
        dispatch(setSearch(data.location.name));
      }
    } catch (error) {
      setError(error.message || "Wrong spelling or no such place");
      if (lastValidWeatherData.current) {
        setWeatherData(lastValidWeatherData.current);
        dispatch(setSearch(lastValidWeatherData.current?.location.name || ""));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavourite = () => {
    if (weatherData) {
      dispatch(addFavourite(weatherData));
    } else {
      console.log("No weather data to add to favourites");
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("search");
    if (savedCity) {
      dispatch(setSearch(savedCity));
      fetchWeather(savedCity);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          fetchWeather(coords);
        },
        (error) => {
          fetchWeather("chennai");
        }
      );
    } else {
      fetchWeather("chennai");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full"><LoadingSpinner/></div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mx-2">
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white w-full hover:border-gray-400 dark:hover:border-white transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather();
            }
          }}
        />
        <button
          onClick={fetchWeather}
          className="p-3 dark:bg-blue-900 dark:text-white bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
        <button
          className="p-3 dark:bg-blue-900 dark:text-white bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleAddFavourite}
        >
          Add
        </button>
      </div>
      {error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}
      {weatherData ? (
        <>
          <Weather weatherData={weatherData} />
          <DashBoard />
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          Search for a city to see weather
        </div>
      )}
    </div>
  );
};

export default Home;
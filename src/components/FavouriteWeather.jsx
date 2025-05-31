import { getBackgroundImage } from "../utils/generateBackground";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeFavourite } from "../store/slice/favouriteSlice";

const FavouriteWeather = ({ weatherData }) => {
  const backgroundImage = getBackgroundImage(
    weatherData?.current?.condition?.text || "default"
  );
  const dispatch = useDispatch();

  if (!weatherData) {
    return (
      <div className="p-4 text-center text-red-500">
        <div>Invalid weather data</div>
      </div>
    );
  }
  console.log("FavouriteWeather component", weatherData);

  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center mb-2">
        <FaMapMarkerAlt className="text-2xl text-white" />
        <h1 className="text-2xl font-bold text-white ml-2">
          {weatherData.location.name}
        </h1>
      </div>
      <div className="text-white mb-2">
        {weatherData.current.condition.text}
      </div>
      <div className="text-white mb-4">{weatherData.current.temp_c}°C</div>
      <button
        onClick={() => dispatch(removeFavourite(weatherData?.location.name))}
        className="text-white hover:text-gray-400 text-3xl"
      >
        <IoMdCloseCircleOutline size={24} />
      </button>
    </div>
  );
};

export default FavouriteWeather;

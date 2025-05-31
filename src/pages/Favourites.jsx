import { useDispatch, useSelector } from "react-redux";
import FavouriteWeather from "../components/FavouriteWeather";
import { clearFavourites } from "../store/slice/favouriteSlice";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const handleRemoveAll = () => {
    dispatch(clearFavourites());
  };
  return (
    <div className="p-4">
      {favourites.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-180">
            {favourites.map((favourite, index) => (
              <FavouriteWeather key={index} weatherData={favourite} />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleRemoveAll}
              className="dark:bg-blue-900 bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-colors"
            >
              Remove All Favourites
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-center text-gray-500 mt-10 text-xl">
          No favourites added
        </h1>
      )}
    </div>
  );
};

export default Favourites;

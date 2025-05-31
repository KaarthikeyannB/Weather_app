import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LineChartComponent from "../components/LineChart";
import LoadingSpinner from "../components/LoadingSpinner";

const Chart = () => {
  const location = useSelector((state) => state.search);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = "ec2d4ffa774b453694d131712253105";

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const today = new Date();
      const results = [];

      for (let i = 1; i <= 5; i++) {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - i);
        const formattedDate = pastDate.toISOString().split("T")[0]; // YYYY-MM-DD
        const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${formattedDate}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data && data.forecast?.forecastday?.[0]) {
            results.push(data.forecast.forecastday[0]);
          }

        } catch (error) {
          console.error(`Error fetching weather for ${formattedDate}:`, error);
        }
      }
      setLoading(false);
      setResults(results);
    };

    if (location) {
      fetchHistory();
    }
  }, [location]);

  if (loading) return <p className="text-white h-full flex items-center justify-center"><LoadingSpinner/></p>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center dark:bg-gray-800  p-4">
      <h1 className="text-2xl font-bold dark:text-white text-black mb-2">Weather History</h1>
      <h2 className="text-xl dark:text-white text-black mb-4">{location}</h2>
      <LineChartComponent result={results} />
    </div>
  );
};

export default Chart;
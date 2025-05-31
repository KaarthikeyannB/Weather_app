import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LineChartComponent = ({ result }) => {
    // Prepare data for the chart
    const chartData = result.map((day) => ({
        date: day.date,
        avgTemp: day.day.avgtemp_c,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
    }));

    return (
        <div className="w-full h-96 p-4 dark:bg-gray-800  rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                        tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis 
                        stroke="#9CA3AF"
                        tick={{ fill: '#9CA3AF' }}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: '#374151',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="avgTemp" stroke="red" strokeWidth={2} />
                    <Line type="monotone" dataKey="maxTemp" stroke="blue" strokeWidth={2} />
                    <Line type="monotone" dataKey="minTemp" stroke="orange" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;

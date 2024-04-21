import {Bar} from "react-chartjs-2";
import {IChartData} from "../../interfaces/Chart";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {FC} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChart {
    chartData: IChartData;
    title: string
}

export const BarChart: FC<BarChart> = ({chartData, title}) => {
    return (
        <div className="chart-container">
            <h2 style={{textAlign: "center"}}>{title}</h2>
            <Bar
                data={chartData}
            />
        </div>
    );
};
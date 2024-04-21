import {histogramData} from "../models/HistogramData";

export const makeChartDataObject = (histogramData: histogramData[]) => {
    let chartDataObject: {
        label: string,
        value: number
    }[] = [];
    for (let i = 0; i < 24; i++) {
        chartDataObject.push({
            label: String(i),
            value: 0
        });
    }

    histogramData.map(item => {
        chartDataObject[item.hours] = {...chartDataObject[item.hours], value: item.total}
    })

    return {
        labels: chartDataObject.map(item => item.label),
        datasets: [
            {
                label: 'attendance per hour',
                data: chartDataObject.map(item => item.value)
            }
        ]
    };
}
import React from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, plugins, Title } from "chart.js/auto";

const Chart = ({ type, data, title = "", color = "#362D2D", maintainAspectRatio = true }) => {
    let ChartType;

    switch (type) {
        case "bar":
            ChartType = Bar;
            break;
        case "line":
            ChartType = Line;
            break;
        case "pie":
            ChartType = Pie;
            break;
        default:
            ChartType = Line;
            break;
    }

    return (
        <ChartType
            data={data} 
            options={{ 
                maintainAspectRatio: maintainAspectRatio,
                responsive: true,
                plugins: {
                    title: {
                        display: title ? true : false,
                        text: title,
                        font: {
                            size: 18,
                        },
                        color: color
                    }
                }}
            }
        />
    )
}

export default Chart

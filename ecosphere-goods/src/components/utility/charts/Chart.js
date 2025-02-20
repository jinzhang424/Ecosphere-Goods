import React, { useEffect, useState } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, plugins, Title } from "chart.js/auto";
import { auth } from '../../../firebase';

const Chart = ({ type, title = "", color = "#362D2D", maintainAspectRatio = true, fetchData = async () => {} }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: "", data: [] }],
    })
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

    useEffect(() => {
        const getData = async () => {
            const idToken = await auth.currentUser.getIdToken()
            const dataAndLabels = await fetchData(idToken)

            const labels = dataAndLabels.labels;
            const datasets = dataAndLabels.datasets

            const chartData = {
                labels: labels,
                datasets: datasets.map(({data, datasetLabel}) => ({
                    fill: true,
                    label: datasetLabel,
                    data: data
                }))
            }

            setChartData(chartData)
        }

        getData()
    }, [fetchData])

    return (
        <ChartType
            data={chartData} 
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

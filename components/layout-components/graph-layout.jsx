import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  LineElement,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  Filler,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

export default function ChartData({ label, data }) {
  return (
    <Line
      data={{
        labels: Object.keys(data),
        datasets: [
          {
            label,
            data,
            borderColor: label === 'Sales' ? 'rgb(123, 51, 239)' : 'rgb(239, 51, 60)',
            backgroundColor: label === 'Sales' ? 'rgba(123, 51, 239,.3)' : 'rgba(239, 51, 60,.3)',
            fill: 'start',
          },
        ],
      }}
      height={200}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                family: 'Poppins',
              },
            },
          },
        },
        scale: {
          y: {
            min: 0,
          },
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
        interaction: {
          intersect: false,
        },
      }}
    />
  )
}

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
import moment from 'moment'
import DATA from '../../utils/DATA'
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

export default function ChartData({ label, data, sort }) {
  const formattedSalesData = () => {
    let temp = {}
    switch (sort) {
      case 'Daily':
        let sortedKeys1 = Object.keys(data).sort()
        sortedKeys1.forEach(key => {
          temp[moment(key).format('ddd (MM-DD)')] = data[key]
        })
        break
      case 'Weekly':
        function weeksInYearToMonthWeeks(yearWeeks) {
          const monthsInYear = 12
          const weeksPerMonth = Math.floor(yearWeeks / monthsInYear)
          const extraWeeks = yearWeeks % monthsInYear

          const monthWeeks = Array.from({ length: monthsInYear }, (_, i) => {
            const weekNum = weeksPerMonth + (i < extraWeeks ? 1 : 0)
            return Array.from({ length: weekNum }, (_, j) => {
              const weekLabel = j === 0 ? '1st' : j === 1 ? '2nd' : j === 2 ? '3rd' : `${j + 1}th`
              return `${moment().month(i).format('MMMM')} ${weekLabel} week`
            })
          }).flat()

          return monthWeeks.reduce((acc, label, index) => {
            acc[moment().month(index).format('MMMM')] = label
            return acc
          }, {})
        }

        let sortedKeys2 = Object.keys(data).sort()
        sortedKeys2.forEach(key => {
          const weekLabel = weeksInYearToMonthWeeks(key)[moment(key).format('MMMM')]
          temp[weekLabel] = data[key]
        })
        break
      case 'Yearly':
        temp = Object.fromEntries(Object.entries(data).reverse())
    }
    return temp
  }
  // console.log(label,data)
  const formattedOrderData = () => {
    let temp = {}
    switch (sort) {
      case 'Daily':
        let sortedKeys1 = Object.keys(data).sort()
        sortedKeys1.forEach(key => {
          temp[moment(key).format('ddd (MM-DD)')] = data[key]
        })
        break
      case 'Weekly':
        function weeksInYearToMonthWeeks(yearWeeks) {
          const monthsInYear = 12
          const weeksPerMonth = Math.floor(yearWeeks / monthsInYear)
          const extraWeeks = yearWeeks % monthsInYear

          const monthWeeks = Array.from({ length: monthsInYear }, (_, i) => {
            const weekNum = weeksPerMonth + (i < extraWeeks ? 1 : 0)
            return Array.from({ length: weekNum }, (_, j) => {
              const weekLabel = j === 0 ? '1st' : j === 1 ? '2nd' : j === 2 ? '3rd' : `${j + 1}th`
              return `${moment().month(i).format('MMMM')} ${weekLabel} week`
            })
          }).flat()

          return monthWeeks.reduce((acc, label, index) => {
            acc[moment().month(index).format('MMMM')] = label
            return acc
          }, {})
        }

        let sortedKeys2 = Object.keys(data).sort()
        sortedKeys2.forEach(key => {
          const weekLabel = weeksInYearToMonthWeeks(key)[moment(key).format('MMMM')]
          temp[weekLabel] = data[key]
        })
        break
      case 'Yearly':
        temp = Object.fromEntries(Object.entries(data).reverse())
    }
    console.log(temp)
    return temp
  }

  const sumValuesByStatus = status => {
    const result = {}
    const data = formattedOrderData()
    for (const date in data) {
      result[date] = data[date][status] || 0
    }

    return result
  }

  return (
    <Line
      data={
        label == 'Sales'
          ? {
              labels: Object.keys(formattedSalesData()),
              datasets: [
                {
                  label,
                  data: formattedSalesData(),
                  borderColor: label === 'Sales' ? 'rgb(123, 51, 239)' : 'rgb(239, 51, 60)',
                  backgroundColor:
                    label === 'Sales' ? 'rgba(123, 51, 239,.3)' : 'rgba(239, 51, 60,.3)',
                  fill: 'start',
                },
              ],
            }
          : {
              labels: Object.keys(sumValuesByStatus('COMPLETED')),
              datasets: [
                {
                  label: 'Completed',
                  data: sumValuesByStatus('COMPLETED'),
                  borderColor: 'rgb(34,197,94)',
                  backgroundColor: 'rgb(34,197,94,.3)',
                  fill: 'start',
                },
                {
                  label: 'Pending Payment',
                  data: sumValuesByStatus('PENDING PAYMENT'),
                  borderColor: 'rgb(63,63,70)',
                  backgroundColor: 'rgb(63,63,70,.3)',
                  fill: 'start',
                },
                {
                  label: 'Preparing Order',
                  data: sumValuesByStatus('PREPARING ORDER'),
                  borderColor: 'rgb(234,179,8)',
                  backgroundColor: 'rgb(234,179,8,.3)',
                  fill: 'start',
                },
                {
                  label: 'Out of Delivery',
                  data: sumValuesByStatus('OUT OF DELIVERY'),
                  borderColor: 'rgb(6, 182, 212)',
                  backgroundColor: 'rgb(6,182,212,.3)',
                  fill: 'start',
                },
                {
                  label: 'Cancelled',
                  data: sumValuesByStatus('CANCELLED'),
                  borderColor: label === 'Sales' ? 'rgb(123, 51, 239)' : 'rgb(239, 51, 60)',
                  backgroundColor:
                    label === 'Sales' ? 'rgba(123, 51, 239,.3)' : 'rgba(239, 51, 60,.3)',
                  fill: 'start',
                },
              ],
            }
      }
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
        scales: {
          y: {
            min: 0,
            ticks: {
              precision: 0,
              callback: function (value, index, values) {
                return label === 'Sales' ? '₱ ' + value : value // Prepend peso sign to the label
              },
            },
          },
          x: {
            ticks: {
              beginAtZero: true,
              precision: 0,
            },
          },
        },
        interaction: {
          intersect: false,
        },
      }}
    />
  )
}

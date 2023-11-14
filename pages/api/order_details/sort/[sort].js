import dbConnect from '../../../../utils/dbConnect'
import OrderDetails from '../../../../models/OrderDetails'

import { response } from '../../../../services/response'

dbConnect()

function compileData(salesData, granularity) {
    const compiledData = {};

    salesData.forEach((sale) => {
        let key;

        if (granularity === 'day') {
            key = sale.created_at.toISOString().split('T')[0];
        } else if (granularity === 'week') {
            key = getWeekNumber(new Date(sale.created_at));
        } else if (granularity === 'month') {
            key = new Date(sale.created_at).toLocaleString('default', { month: 'long' });
        }

        if (!compiledData[key]) {
            compiledData[key] = {
                totalAmount: Number(sale.total_price),
                numberOfOrders: 1,
            };
        } else {
            compiledData[key].totalAmount += Number(sale.total_price);
            compiledData[key].numberOfOrders += 1;
        }
    });

    return compiledData;
}
function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}
export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const salesData = await OrderDetails.find({ status: "COMPLETED" }).sort({ created_at: -1 })
                let result = {};

                switch (req.query.sort) {
                    case 'Daily':
                        result = compileData(salesData, 'day');
                        break;
                    case 'Weekly':
                        result = compileData(salesData, 'week');
                        break;
                    case 'Monthly':
                        result = compileData(salesData, 'month');
                        break;
                    default:
                        result = {};
                }
                const sales = {};
                const orders = {};
                for (const date in result) {
                    sales[date] = result[date].totalAmount;
                }
                for (const date in result) {
                    orders[date] = result[date].numberOfOrders;
                }
                const data = {
                    sales, orders
                }
                response({
                    res, status_code: 200, success: true, data
                })
            } catch (error) {
                response({ res, status_code: 400, success: false, error: error?.message })
            }
            break
        default:
            response({ res, status_code: 400, success: false })
            break
    }
}

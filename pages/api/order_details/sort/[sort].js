import dbConnect from '../../../../utils/dbConnect'
import OrderDetails from '../../../../models/OrderDetails'

import { response } from '../../../../services/response'
import moment from 'moment';
import DATA from '../../../../utils/DATA';

dbConnect()

function compileData(salesData, granularity) {
    const compiledData = {};

    salesData.forEach((sale) => {
        let key;

        if (granularity === 'day') {
            key = sale.created_at.toISOString().split('T')[0];
        } else if (granularity === 'week') {
            key = getWeekNumber(new Date(sale.created_at));
        } else if (granularity === 'year') {
            const saleDate = new Date(sale.created_at);
            const currentYear = new Date().getFullYear();
            const previousYear = currentYear - 1;
            const saleYear = saleDate.getFullYear();
            const saleMonth = saleDate.getMonth();

            // Check if the sale's year is within the range of the desired yearly data
            if ((currentYear === saleYear && saleMonth <= 11) || saleYear === previousYear) {
                key = `${moment(saleDate).format('YYYY')} ${moment(saleDate).format('MMMM')}`;
            } else {
                return; // Skip this sale if it doesn't fall within the desired range
            }
        }


        if (!compiledData[key]) {
            compiledData[key] = {
                totalAmount: Number(sale.total_price),
                // numberOfOrders: 1,
                status: {
                    "PENDING PAYMENT": sale?.status == "PENDING PAYMENT" ? 1 : 0,
                    "PREPARING ORDER": sale?.status == "PREPARING ORDER" ? 1 : 0,
                    "OUT OF DELIVERY": sale?.status == "OUT OF DELIVERY" ? 1 : 0,
                    "COMPLETED": sale?.status == "COMPLETED" ? 1 : 0,
                    "CANCELLED": sale?.status == "CANCELLED" ? 1 : 0,
                }
            };
        } else {
            compiledData[key].totalAmount += Number(sale.total_price);
            try {
                switch (sale.status) {
                    case "PENDING PAYMENT":
                        compiledData[key].status[sale?.status] += 1;
                        break;
                    case "PREPARING ORDER":
                        compiledData[key].status[sale?.status] += 1;
                        break;
                    case "OUT OF DELIVERY":
                        compiledData[key].status[sale?.status] += 1;
                        break;
                    case "COMPLETED":
                        compiledData[key].status[sale?.status] += 1;
                        break;
                    case "CANCELLED":
                        compiledData[key].status[sale?.status] += 1;
                        break;
                }
            }
            catch (e) {
                console.log(e)
            }
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
                const salesData = await OrderDetails.find().sort({ created_at: -1 })
                let result = {};
                switch (req.query.sort) {
                    case 'Daily':
                        result = compileData(salesData, 'day');
                        break;
                    case 'Weekly':
                        result = compileData(salesData, 'week');
                        break;
                    case 'Yearly':
                        result = compileData(salesData, 'year');
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
                    orders[date] = result[date].status;
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

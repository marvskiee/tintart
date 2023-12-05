import { useEffect, useState } from 'react';
import { getAllOrderDetails } from '../services/order_details.services';

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getAllOrderDetails();
        setData(response?.data);
    };

    return (
        <div>
            <h1>Daily Sales</h1>
            {data && data.sortedByDay.map((sale) => (
                <div key={sale._id}>
                    <p>Date: {sale.date}</p>
                    <p>Amount: {sale.amount}</p>
                </div>
            ))}

            <h1>Weekly Sales</h1>
            {data && data.sortedByWeek.map((sale) => (
                <div key={sale._id}>
                    <p>Date: {sale.date}</p>
                    <p>Amount: {sale.amount}</p>
                </div>
            ))}

            <h1>Yearly Sales</h1>
            {data && data.sortedByMonth.map((sale) => (
                <div key={sale._id}>
                    <p>Date: {sale.date}</p>
                    <p>Amount: {sale.amount}</p>
                </div>
            ))}
        </div>
    );
}

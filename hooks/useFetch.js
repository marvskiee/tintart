import { useState, useEffect } from 'react';

function useFetch(handler, id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await handler();
                if (response.success) {
                    setData(response?.data);
                } else {
                    setError(err);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    return { data, loading, error };
}

export default useFetch;

import { useState, useEffect } from 'react';

const useCountdown = (initialSeconds, callback) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;

        if (isRunning && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 1) {
                        setIsRunning(false);
                        // Call the callback when the countdown reaches zero
                        callback && callback();
                        return 0; // Ensure the countdown displays 0 when it reaches it
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, seconds, callback]);

    const start = () => {
        setSeconds(initialSeconds);
        setIsRunning(true);
    };

    return { seconds, start, isRunning };
};

export default useCountdown;

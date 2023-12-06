import { useState, useEffect } from 'react';

export default function QuestionTimer ({timeout, onTimeout, mode}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
       const timer =  setTimeout(onTimeout, timeout);
        console.log('timer');

        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]);

    useEffect(() => {
        console.log('interval');
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime =>  prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, []);


    return <progress id="question-time" className={mode} max={timeout} value={remainingTime} />;
}
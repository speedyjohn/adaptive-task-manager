import { useState, useEffect } from 'react';
import { getTimeOfDay } from '../utils/helpers';

export const useTimeOfDay = () => {
    const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOfDay(getTimeOfDay());
        }, 300000); // Обновляем каждые 5 минут

        return () => clearInterval(interval);
    }, []);

    return timeOfDay;
};
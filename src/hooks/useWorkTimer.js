import { useState, useEffect } from 'react';
import { WORK_DURATION, BREAK_DURATION, AFK_TIMEOUT } from '../utils/constants';

export const useWorkTimer = (lastActivityTime, showNotification) => {
    const [workTimer, setWorkTimer] = useState(1);
    const [breakTimer, setBreakTimer] = useState(0);
    const [isOnBreak, setIsOnBreak] = useState(false);
    const [showBreakSuggestion, setShowBreakSuggestion] = useState(false);
    const [breakFinished, setBreakFinished] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceLastActivity = (now - lastActivityTime.current) / 1000;
            const isAfk = timeSinceLastActivity > AFK_TIMEOUT;

            if (isOnBreak) {
                setBreakTimer(prev => {
                    if (prev <= 1) {
                        setBreakFinished(true);
                        setIsOnBreak(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }
            else if (!isAfk) {
                setWorkTimer(prev => {
                    if (prev >= WORK_DURATION) {
                        setShowBreakSuggestion(true);
                        return prev;
                    }
                    return prev + 1;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isOnBreak, lastActivityTime]);

    const startBreak = () => {
        setIsOnBreak(true);
        setBreakTimer(BREAK_DURATION);
        setWorkTimer(0);
        setShowBreakSuggestion(false);
        setBreakFinished(false);
    };

    const skipBreak = () => {
        setWorkTimer(1);
        setShowBreakSuggestion(false);
        setBreakFinished(false);
        setIsOnBreak(false);
        setBreakTimer(0);
        showNotification({
            type: 'success',
            emoji: '🔥',
            title: 'Удачи!',
            text: 'Хорошей работы!'
        });
    };

    return {
        workTimer,
        breakTimer,
        isOnBreak,
        showBreakSuggestion,
        breakFinished,
        startBreak,
        skipBreak
    };
};
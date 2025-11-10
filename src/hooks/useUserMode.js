import { useState, useEffect } from 'react';
import { AFK_TIMEOUT } from '../utils/constants';
import { calculateActivityScore, getUserMode } from '../utils/helpers';

export const useUserMode = (clicks, mouseSpeed, typingSpeed, lastActivityTime) => {
    const [userMode, setUserMode] = useState('normal');
    const [activityScore, setActivityScore] = useState(50);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceLastActivity = (now - lastActivityTime.current) / 1000;

            if (timeSinceLastActivity > AFK_TIMEOUT) {
                setUserMode('afk');
                return;
            }

            const score = calculateActivityScore(clicks, mouseSpeed, typingSpeed);
            setActivityScore(Math.round(score * 100));
            setUserMode(getUserMode(score));
        }, 1000);

        return () => clearInterval(interval);
    }, [clicks, mouseSpeed, typingSpeed, lastActivityTime]);

    const handleWakeUp = () => {
        lastActivityTime.current = Date.now();
        setUserMode('normal');
    };

    return { userMode, activityScore, handleWakeUp };
};
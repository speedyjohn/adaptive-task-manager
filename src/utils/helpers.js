export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatEstimatedTime = (time) => {
    const parts = [];
    if (time.days > 0) parts.push(`${time.days}д`);
    if (time.hours > 0) parts.push(`${time.hours}ч`);
    if (time.minutes > 0) parts.push(`${time.minutes}м`);
    return parts.join(' ') || '';
};

export const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 7) return 'night';
    if (hour >= 7 && hour < 11) return 'morning';
    return 'day';
};

export const calculateActivityScore = (clicks, mouseSpeed, typingSpeed) => {
    const clickRate = clicks / 10;
    const mouseSpeedNorm = Math.min(mouseSpeed / 5000, 1);
    const typingRate = typingSpeed / 5;

    return (clickRate * 0.4 + mouseSpeedNorm * 0.3 + typingRate * 0.3);
};

export const getUserMode = (score) => {
    if (score > 0.5) return 'active';
    if (score > 0.25) return 'normal';
    return 'calm';
};

export const getViewMode = (taskCount) => {
    if (taskCount > 10) return 'compact';
    if (taskCount < 5) return 'comfortable';
    return 'normal';
};
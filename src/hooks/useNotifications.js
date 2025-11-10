import { useState } from 'react';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (notification) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, ...notification }]);

        if (!notification.persistent) {
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== id));
            }, 5000);
        }
    };

    const closeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return { notifications, showNotification, closeNotification };
};
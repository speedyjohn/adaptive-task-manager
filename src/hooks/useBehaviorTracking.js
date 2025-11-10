import { useState, useEffect, useRef } from 'react';

export const useBehaviorTracking = () => {
    const [clicks, setClicks] = useState(0);
    const [mouseSpeed, setMouseSpeed] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [backspaceCount, setBackspaceCount] = useState(0);

    const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
    const clickTimestamps = useRef([]);
    const typingTimestamps = useRef([]);
    const backspaceTimestamps = useRef([]);
    const lastActivityTime = useRef(Date.now());

    // Отслеживание кликов
    useEffect(() => {
        const handleClick = () => {
            const now = Date.now();
            clickTimestamps.current.push(now);
            clickTimestamps.current = clickTimestamps.current.filter(t => now - t < 10000);
            setClicks(clickTimestamps.current.length);
            lastActivityTime.current = now;
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    // Отслеживание движения мыши
    useEffect(() => {
        const handleMouseMove = (e) => {
            const now = Date.now();
            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            const dt = now - lastMousePos.current.time;

            if (dt > 0) {
                const distance = Math.sqrt(dx * dx + dy * dy);
                const speed = distance / dt * 1000;
                setMouseSpeed(speed);
            }

            lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
            lastActivityTime.current = now;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Автоочистка старых данных
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();

            clickTimestamps.current = clickTimestamps.current.filter(t => now - t < 10000);
            setClicks(clickTimestamps.current.length);

            typingTimestamps.current = typingTimestamps.current.filter(t => now - t < 5000);
            setTypingSpeed(typingTimestamps.current.length);

            backspaceTimestamps.current = backspaceTimestamps.current.filter(t => now - t < 10000);
            setBackspaceCount(backspaceTimestamps.current.length);

            setMouseSpeed(prev => prev * 0.8);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const trackTyping = () => {
        const now = Date.now();
        typingTimestamps.current.push(now);
        typingTimestamps.current = typingTimestamps.current.filter(t => now - t < 5000);
        setTypingSpeed(typingTimestamps.current.length);
        lastActivityTime.current = now;
    };

    const trackBackspace = () => {
        const now = Date.now();
        backspaceTimestamps.current.push(now);
        backspaceTimestamps.current = backspaceTimestamps.current.filter(t => now - t < 10000);
        setBackspaceCount(backspaceTimestamps.current.length);
    };

    return {
        clicks,
        mouseSpeed,
        typingSpeed,
        backspaceCount,
        lastActivityTime,
        trackTyping,
        trackBackspace
    };
};
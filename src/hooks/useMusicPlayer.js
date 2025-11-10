import { useState, useEffect, useRef } from 'react';

export const useMusicPlayer = () => {
    const [musicPlaying, setMusicPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio('/music.mp3');
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleMusic = (setShowMusicSuggestion) => {
        if (musicPlaying) {
            audioRef.current?.pause();
            setMusicPlaying(false);
        } else {
            audioRef.current?.play().catch(err => console.log('Audio play failed:', err));
            setMusicPlaying(true);
        }
        setShowMusicSuggestion(false);
    };

    return { musicPlaying, toggleMusic };
};
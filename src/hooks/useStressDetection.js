import { useState, useEffect } from 'react';
import { STRESS_THRESHOLD } from '../utils/constants';

export const useStressDetection = (backspaceCount) => {
    const [isStressed, setIsStressed] = useState(false);
    const [showMusicSuggestion, setShowMusicSuggestion] = useState(false);
    const [musicSuggestionDismissed, setMusicSuggestionDismissed] = useState(false);

    useEffect(() => {
        if (backspaceCount > STRESS_THRESHOLD) {
            setIsStressed(true);
            if (!showMusicSuggestion && !musicSuggestionDismissed) {
                setShowMusicSuggestion(true);
            }
        } else if (backspaceCount < 5) {
            setIsStressed(false);
            setMusicSuggestionDismissed(false);
        }
    }, [backspaceCount, showMusicSuggestion, musicSuggestionDismissed]);

    const closeMusicSuggestion = () => {
        setShowMusicSuggestion(false);
        setMusicSuggestionDismissed(true);
    };

    return {
        isStressed,
        showMusicSuggestion,
        setShowMusicSuggestion,
        closeMusicSuggestion
    };
};
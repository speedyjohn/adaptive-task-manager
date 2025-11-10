import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { formatTime } from '../utils/helpers';

const WorkTimer = ({ workTimer, breakTimer, isOnBreak, workDuration }) => {
    const workTimeRemaining = Math.max(0, workDuration - workTimer);

    if (isOnBreak) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed top-8 left-8 z-30 px-4 py-2 bg-green-600/80 rounded-xl backdrop-blur font-mono"
            >
                <div className="flex items-center gap-2">
                    <span>☕</span>
                    <span>{formatTime(breakTimer)}</span>
                </div>
            </motion.div>
        );
    }

    if (workTimer > 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`fixed top-8 left-8 z-30 px-4 py-2 rounded-xl backdrop-blur font-mono ${
                    workTimeRemaining < 60 ? 'bg-red-600/80 text-white' :
                        workTimeRemaining < 300 ? 'bg-orange-600/80' : 'bg-gray-800/80'
                }`}
            >
                <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{formatTime(workTimeRemaining)}</span>
                </div>
            </motion.div>
        );
    }

    return null;
};

export default WorkTimer;
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Clock } from 'lucide-react';

const MetricsDashboard = ({ config,activityScore, clicks, mouseSpeed, typingSpeed, backspaceCount, isStressed, animDuration }) => {
    const dashboardGradient = isStressed
        ? 'bg-gradient-to-br from-indigo-400 to-purple-400'
        : config.colors;

    return (
        <motion.div
            className={`${dashboardGradient} rounded-2xl ${config.padding} mb-6 shadow-2xl transition-all duration-[2000ms]`}
            layout
            transition={{ duration: animDuration }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Режим: {config.label}</h2>
                <div className="text-2xl font-bold">{activityScore}%</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={16} />
                        <span className="text-xs opacity-75">Клики/10с</span>
                    </div>
                    <div className="text-2xl font-bold">{clicks}</div>
                </div>

                <div className="bg-black/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} />
                        <span className="text-xs opacity-75">Скорость мыши</span>
                    </div>
                    <div className="text-2xl font-bold">{Math.round(mouseSpeed)}</div>
                </div>

                <div className="bg-black/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock size={16} />
                        <span className="text-xs opacity-75">Печать/5с</span>
                    </div>
                    <div className="text-2xl font-bold">{typingSpeed}</div>
                </div>

                <div className="bg-black/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock size={16} />
                        <span className="text-xs opacity-75">Backspace/10с</span>
                    </div>
                    <div className="text-2xl font-bold text-red-300">{backspaceCount}</div>
                </div>
            </div>

            <div className="mt-4 text-sm opacity-90">
                {config.description}
            </div>
        </motion.div>
    );
};

export default MetricsDashboard;
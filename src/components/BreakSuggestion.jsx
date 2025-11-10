import React, {useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreakSuggestion = ({ show, onStartBreak, onSkipBreak, isOnBreak, breakTimer, breakFinished }) => {
    useEffect(() => {
        if (show && !isOnBreak) {
            onStartBreak();
        }
    }, [show]);

    return (
        <AnimatePresence>
            {(show || isOnBreak || breakFinished) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="text-center"
                    >
                        {breakFinished ? (
                            <>
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-8xl mb-6"
                                >
                                    💼
                                </motion.div>
                                <h2 className="text-3xl font-bold mb-2">Перерыв окончен!</h2>
                                <p className="text-xl text-gray-300 mb-8">Пора вернуться к работе</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onSkipBreak}
                                    className="px-6 py-3 bg-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-700"
                                >
                                    Вернуться к работе
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-8xl mb-6"
                                >
                                    🧘‍♂️
                                </motion.div>
                                <h2 className="text-3xl font-bold mb-2">Время отдохнуть!</h2>
                                <p className="text-xl text-gray-300 mb-8">Таймер перерыва</p>
                                <div className="text-6xl font-mono font-bold text-green-400 mb-8">
                                    {Math.floor(breakTimer / 60)}:{(breakTimer % 60).toString().padStart(2, '0')}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onSkipBreak}
                                    className="px-6 py-3 bg-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-600"
                                >
                                    Вернуться к работе досрочно
                                </motion.button>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BreakSuggestion;
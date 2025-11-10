import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreakSuggestion = ({ show, onStartBreak, onSkipBreak }) => {
    return (
        <AnimatePresence>
            {show && (
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
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-8xl mb-6"
                        >
                            🧘‍♂️
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-2">Время взять перерыв!</h2>
                        <p className="text-xl text-gray-300 mb-8">Вы работаете уже 25 минут</p>

                        <div className="text-6xl font-mono font-bold text-green-400 mb-8">
                            05:00
                        </div>

                        <div className="flex gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onStartBreak}
                                className="px-6 py-3 bg-green-600 rounded-xl text-lg font-semibold hover:bg-green-700"
                            >
                                Начать перерыв
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onSkipBreak}
                                className="px-6 py-3 bg-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-600"
                            >
                                Продолжить работу
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BreakSuggestion;
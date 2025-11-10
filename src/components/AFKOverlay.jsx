import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AFKOverlay = ({ show, onWakeUp }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center backdrop-blur-sm"
                    onClick={onWakeUp}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-9xl mb-6"
                        >
                            😴
                        </motion.div>
                        <h2 className="text-4xl font-bold mb-4">Режим сна</h2>
                        <p className="text-xl text-gray-400 mb-8">Вы отошли от компьютера?</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-blue-600 rounded-xl text-xl font-semibold hover:bg-blue-700 transition-colors"
                            onClick={onWakeUp}
                        >
                            Вернуться к работе
                        </motion.button>
                        <p className="text-sm text-gray-500 mt-4">или просто кликните в любом месте</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AFKOverlay;
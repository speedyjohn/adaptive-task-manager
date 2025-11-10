import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X } from 'lucide-react';

const MusicPlayer = ({ show, onClose, onToggle, isPlaying }) => {
    return (
        <>
            {/* Suggestion Modal */}
            <AnimatePresence>
                {show && !isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="fixed bottom-8 right-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl z-40 max-w-md"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-start gap-4">
                            <div className="text-4xl">😰</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Нервничаете?</h3>
                                <p className="text-sm opacity-90 mb-4">
                                    Заметил много исправлений... Может включить расслабляющую музыку?
                                </p>
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onToggle}
                                        className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <Music size={18} />
                                        Да, включить
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onClose}
                                        className="px-4 py-2 bg-white/20 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                                    >
                                        Нет, спасибо
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Music Player Indicator */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-8 right-8 bg-purple-600 rounded-xl p-4 shadow-xl z-40 flex items-center gap-3"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Music size={24} />
                        </motion.div>
                        <div>
                            <div className="font-semibold">Расслабляющая музыка</div>
                            <div className="text-xs opacity-75">Lofi hip hop beats</div>
                        </div>
                        <button
                            onClick={() => onToggle()}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MusicPlayer;
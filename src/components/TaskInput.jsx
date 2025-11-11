import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Keyboard } from 'lucide-react';

const TaskInput = ({ value, onChange, onKeyDown, onSubmit, config, animDuration }) => {
    const inputRef = useRef(null);

    // Горячая клавиша "/"
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.key === '/') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    return (
        <motion.div
            className="mb-6"
            layout
            transition={{ duration: animDuration }}
        >
            <div className="flex gap-3">
                <motion.input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
                    placeholder={config.showTooltips ? 'Введите новую задачу...' : 'Быстро добавить...'}
                    className={`flex-1 bg-gray-800 rounded-xl ${config.padding} ${config.fontSize} outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    animate={{ scale: 1 }}
                    whileFocus={{ scale: config.showTooltips ? 1.02 : 1 }}
                    transition={{ duration: animDuration }}
                />
                <motion.button
                    onClick={onSubmit}
                    className={`${config.buttonSize} bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: animDuration }}
                >
                    <Plus size={config.showTooltips ? 24 : 20} />
                </motion.button>
            </div>

            {/* Подсказка горячей клавиши */}
            {config.showTooltips && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-xs text-gray-500 flex items-center gap-2"
                >
                    <Keyboard size={14} />
                    Нажмите / для быстрого доступа
                </motion.div>
            )}
        </motion.div>
    );
};

export default TaskInput;
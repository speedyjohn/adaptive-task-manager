import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Clock } from 'lucide-react';
import { formatEstimatedTime } from '../utils/helpers';

const TaskCard = ({
                      task,
                      config,
                      animDuration,
                      isStressed,
                      onToggle,
                      onDelete,
                      onClick,
                      viewMode
                  }) => {
    const cardClass = isStressed
        ? 'border border-purple-300/30 shadow-purple-500/20'
        : config.border;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: animDuration }}
            className={`${config.cardBg} rounded-xl ${config.padding} ${cardClass} flex items-start gap-4 group hover:shadow-xl transition-all duration-[2000ms] cursor-pointer`}
            whileHover={{
                scale: config.showTooltips ? 1.02 : 1,
                transition: { duration: animDuration }
            }}
            onClick={onClick}
        >
            <motion.button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle(task.id);
                }}
                className={`${config.buttonSize} rounded-lg ${
                    task.completed
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-700 hover:bg-gray-600'
                } transition-colors flex-shrink-0 mt-1`}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: animDuration }}
            >
                {task.completed && <Check size={16} />}
            </motion.button>

            <div className="flex-1 min-w-0">
                <div className={`${viewMode === 'comfortable' ? 'text-xl' : config.fontSize} font-medium ${task.completed ? 'line-through opacity-50' : ''}`}>
                    {task.title}
                </div>

                {(task.tags.length > 0 || formatEstimatedTime(task.estimatedTime)) && (
                    <div className={`${viewMode === 'compact' ? 'text-xs' : 'text-sm'} text-gray-400 mt-1 flex items-center gap-2 flex-wrap`}>
                        {task.tags.length > 0 && (
                            <span>{task.tags.map(tag => `#${tag}`).join(' ')}</span>
                        )}
                        {task.tags.length > 0 && formatEstimatedTime(task.estimatedTime) && (
                            <span>|</span>
                        )}
                        {formatEstimatedTime(task.estimatedTime) && (
                            <span className="flex items-center gap-1">
                <Clock size={14} />
                                {formatEstimatedTime(task.estimatedTime)}
              </span>
                        )}
                    </div>
                )}
            </div>

            <motion.button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                }}
                className={`${config.buttonSize} bg-red-600/20 hover:bg-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1`}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: animDuration }}
            >
                <Trash2 size={16} />
            </motion.button>
        </motion.div>
    );
};

export default TaskCard;
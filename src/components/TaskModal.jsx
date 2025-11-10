import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TaskModal = ({ task, isOpen, onClose, onSave }) => {
    const [editingTask, setEditingTask] = useState(task);

    const handleSave = () => {
        if (editingTask && editingTask.title.trim()) {
            onSave(editingTask);
            onClose();
        }
    };

    if (!task || !editingTask) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-w-2xl w-full bg-gray-800 rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Редактировать задачу</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Название */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Название задачи</label>
                                <input
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                    className="w-full bg-gray-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Введите название..."
                                />
                            </div>

                            {/* Описание */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Описание</label>
                                <textarea
                                    value={editingTask.description}
                                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    rows={4}
                                    className="w-full bg-gray-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Добавьте детали задачи..."
                                />
                            </div>

                            {/* Теги */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Теги</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {editingTask.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                        >
                      #{tag}
                                            <button
                                                onClick={() => setEditingTask({
                                                    ...editingTask,
                                                    tags: editingTask.tags.filter((_, i) => i !== idx)
                                                })}
                                                className="hover:bg-red-600 rounded-full p-0.5"
                                            >
                        <X size={14} />
                      </button>
                    </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Добавить тег..."
                                        className="flex-1 bg-gray-700 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                const tag = e.target.value.trim().toLowerCase();
                                                if (tag && !editingTask.tags.includes(tag)) {
                                                    setEditingTask({ ...editingTask, tags: [...editingTask.tags, tag] });
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Время выполнения */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Примерное время выполнения</label>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {/* Дни */}
                                    <div>
                                        <div className="text-center text-xs text-gray-400 mb-2">ДНЕЙ</div>
                                        <div className="bg-gray-900 rounded-xl h-32 overflow-y-auto">
                                            {[...Array(100)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setEditingTask({
                                                        ...editingTask,
                                                        estimatedTime: { ...editingTask.estimatedTime, days: i }
                                                    })}
                                                    className={`w-full py-2 transition-all ${
                                                        editingTask.estimatedTime.days === i
                                                            ? 'text-white text-3xl font-bold'
                                                            : Math.abs(editingTask.estimatedTime.days - i) === 1
                                                                ? 'text-gray-400 text-xl'
                                                                : 'text-gray-700 text-base'
                                                    }`}
                                                >
                                                    {i.toString().padStart(2, '0')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Часы */}
                                    <div>
                                        <div className="text-center text-xs text-gray-400 mb-2">ЧАСОВ</div>
                                        <div className="bg-gray-900 rounded-xl h-32 overflow-y-auto">
                                            {[...Array(24)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setEditingTask({
                                                        ...editingTask,
                                                        estimatedTime: { ...editingTask.estimatedTime, hours: i }
                                                    })}
                                                    className={`w-full py-2 transition-all ${
                                                        editingTask.estimatedTime.hours === i
                                                            ? 'text-white text-3xl font-bold'
                                                            : Math.abs(editingTask.estimatedTime.hours - i) === 1
                                                                ? 'text-gray-400 text-xl'
                                                                : 'text-gray-700 text-base'
                                                    }`}
                                                >
                                                    {i.toString().padStart(2, '0')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Минуты */}
                                    <div>
                                        <div className="text-center text-xs text-gray-400 mb-2">МИНУТ</div>
                                        <div className="bg-gray-900 rounded-xl h-32 overflow-y-auto">
                                            {[...Array(60)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setEditingTask({
                                                        ...editingTask,
                                                        estimatedTime: { ...editingTask.estimatedTime, minutes: i }
                                                    })}
                                                    className={`w-full py-2 transition-all ${
                                                        editingTask.estimatedTime.minutes === i
                                                            ? 'text-white text-3xl font-bold'
                                                            : Math.abs(editingTask.estimatedTime.minutes - i) === 1
                                                                ? 'text-gray-400 text-xl'
                                                                : 'text-gray-700 text-base'
                                                    }`}
                                                >
                                                    {i.toString().padStart(2, '0')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Пресеты */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingTask({
                                            ...editingTask,
                                            estimatedTime: { days: 0, hours: 0, minutes: 10 }
                                        })}
                                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                                    >
                                        00:10:00
                                    </button>
                                    <button
                                        onClick={() => setEditingTask({
                                            ...editingTask,
                                            estimatedTime: { days: 0, hours: 0, minutes: 15 }
                                        })}
                                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                                    >
                                        00:15:00
                                    </button>
                                    <button
                                        onClick={() => setEditingTask({
                                            ...editingTask,
                                            estimatedTime: { days: 0, hours: 0, minutes: 30 }
                                        })}
                                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                                    >
                                        00:30:00
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Кнопки действий */}
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                            >
                                Сохранить
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TaskModal;
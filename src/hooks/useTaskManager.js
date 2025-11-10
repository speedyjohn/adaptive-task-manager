import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getRandomMessage } from '../utils/messages';

export const useTaskManager = (showNotification, userMode) => {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem('adaptive-tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    });

    const [input, setInput] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('adaptive-tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }, [tasks]);

    const addTask = () => {
        if (input.trim()) {
            const newTask = {
                id: Date.now(),
                title: input,
                description: '',
                tags: [],
                estimatedTime: { days: 0, hours: 0, minutes: 0 },
                completed: false,
                createdAt: Date.now(),
                completedAt: null
            };
            setTasks([...tasks, newTask]);
            setInput('');

            const msg = getRandomMessage('add');
            showNotification({ type: 'info', ...msg });
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id && !t.completed) {
                confetti({
                    particleCount: userMode === 'active' ? 50 : userMode === 'calm' ? 150 : 100,
                    spread: userMode === 'active' ? 50 : userMode === 'calm' ? 90 : 70,
                    origin: { y: 0.6 }
                });

                const msg = getRandomMessage('complete');
                showNotification({ type: 'success', ...msg });

                return { ...t, completed: true, completedAt: Date.now() };
            }
            if (t.id === id && t.completed) {
                return { ...t, completed: false, completedAt: null };
            }
            return t;
        }));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        const msg = getRandomMessage('delete');
        showNotification({ type: 'warning', ...msg });
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setModalOpen(true);
    };

    const saveTask = (updatedTask) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        setModalOpen(false);
        setEditingTask(null);

        const msg = getRandomMessage('edit');
        showNotification({ type: 'success', ...msg });
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingTask(null);
    };

    return {
        tasks,
        input,
        setInput,
        editingTask,
        modalOpen,
        addTask,
        toggleTask,
        deleteTask,
        openEditModal,
        saveTask,
        closeModal
    };
};
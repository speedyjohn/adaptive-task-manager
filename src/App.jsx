import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Компоненты
import AFKOverlay from './components/AFKOverlay';
import BreakSuggestion from './components/BreakSuggestion';
import MetricsDashboard from './components/MetricsDashboard';
import MusicPlayer from './components/MusicPlayer';
import Notification from './components/Notification';
import TaskCard from './components/TaskCard';
import TaskInput from './components/TaskInput';
import TaskModal from './components/TaskModal';
import WorkTimer from './components/WorkTimer';

// Хуки
import { useBehaviorTracking } from './hooks/useBehaviorTracking';
import { useNotifications } from './hooks/useNotifications';

// Утилиты
import { MODE_CONFIG, TIME_OF_DAY_GRADIENTS, WORK_DURATION, BREAK_DURATION, AFK_TIMEOUT, STRESS_THRESHOLD } from './utils/constants';
import { getRandomMessage } from './utils/messages';
import { getTimeOfDay, calculateActivityScore, getUserMode, getViewMode } from './utils/helpers';

function App() {
    // Состояние задач
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Изучить React hooks',
            description: 'Пройти туториалы по useState, useEffect и кастомным хукам',
            tags: ['обучение', 'react'],
            estimatedTime: { days: 0, hours: 2, minutes: 30 },
            completed: false,
            createdAt: Date.now(),
            completedAt: null
        },
        {
            id: 2,
            title: 'Настроить проект',
            description: '',
            tags: ['работа'],
            estimatedTime: { days: 0, hours: 1, minutes: 0 },
            completed: true,
            createdAt: Date.now() - 3600000,
            completedAt: Date.now() - 1800000
        },
    ]);

    const [input, setInput] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Используем кастомные хуки
    const {
        clicks,
        mouseSpeed,
        typingSpeed,
        backspaceCount,
        lastActivityTime,
        trackTyping,
        trackBackspace
    } = useBehaviorTracking();

    const { notifications, showNotification, closeNotification } = useNotifications();

    // Режимы и состояния
    const [userMode, setUserMode] = useState('normal');
    const [activityScore, setActivityScore] = useState(50);
    const [isStressed, setIsStressed] = useState(false);
    const [showMusicSuggestion, setShowMusicSuggestion] = useState(false);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

    // Таймеры
    const [workTimer, setWorkTimer] = useState(0);
    const [breakTimer, setBreakTimer] = useState(0);
    const [isOnBreak, setIsOnBreak] = useState(false);
    const [showBreakSuggestion, setShowBreakSuggestion] = useState(false);

    // Детектор стресса
    useEffect(() => {
        if (backspaceCount > STRESS_THRESHOLD) {
            setIsStressed(true);
            if (!showMusicSuggestion && !musicPlaying) {
                setShowMusicSuggestion(true);
            }
        } else if (backspaceCount < 5) {
            setIsStressed(false);
        }
    }, [backspaceCount, showMusicSuggestion, musicPlaying]);

    // Расчет режима пользователя
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceLastActivity = (now - lastActivityTime.current) / 1000;

            if (timeSinceLastActivity > AFK_TIMEOUT) {
                setUserMode('afk');
                return;
            }

            const score = calculateActivityScore(clicks, mouseSpeed, typingSpeed);
            setActivityScore(Math.round(score * 100));
            setUserMode(getUserMode(score));
        }, 1000);

        return () => clearInterval(interval);
    }, [clicks, mouseSpeed, typingSpeed, lastActivityTime]);

    // Таймер работы и перерыва
    useEffect(() => {
        const interval = setInterval(() => {
            if (isOnBreak) {
                setBreakTimer(prev => {
                    if (prev <= 1) {
                        setIsOnBreak(false);
                        showNotification({
                            type: 'info',
                            emoji: '💼',
                            title: 'Отдохнули?',
                            text: 'Время работать! Удачи!'
                        });
                        return 0;
                    }
                    return prev - 1;
                });
            } else if (userMode !== 'afk' && workTimer > 0) {
                setWorkTimer(prev => {
                    if (prev >= WORK_DURATION) {
                        setShowBreakSuggestion(true);
                        return prev;
                    }
                    return prev + 1;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isOnBreak, userMode, workTimer, showNotification]);

    // Обновление времени суток
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOfDay(getTimeOfDay());
        }, 300000); // каждые 5 минут

        return () => clearInterval(interval);
    }, []);

    // Обработчики задач
    const handleInputChange = (e) => {
        trackTyping();
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            trackBackspace();
        }
    };

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

            // Запуск таймера работы
            if (workTimer === 0 && !isOnBreak) {
                setWorkTimer(1);
            }
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id && !t.completed) {
                // Конфетти при завершении
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
        setEditingTask(null);

        const msg = getRandomMessage('edit');
        showNotification({ type: 'success', ...msg });
    };

    const handleWakeUp = () => {
        lastActivityTime.current = Date.now();
        setUserMode('normal');
    };

    const toggleMusic = () => {
        setMusicPlaying(!musicPlaying);
        setShowMusicSuggestion(false);
    };

    const startBreak = () => {
        setIsOnBreak(true);
        setBreakTimer(BREAK_DURATION);
        setWorkTimer(0);
        setShowBreakSuggestion(false);
    };

    const skipBreak = () => {
        setWorkTimer(0);
        setShowBreakSuggestion(false);
        showNotification({
            type: 'success',
            emoji: '🔥',
            title: 'Молодец!',
            text: 'Продуктивная работа!'
        });
    };

    // Конфигурация режима
    const config = MODE_CONFIG[userMode];
    const viewMode = getViewMode(tasks.length);

    // Применяем viewMode поверх config
    const effectiveConfig = {
        ...config,
        ...(viewMode === 'compact' && {
            fontSize: 'text-sm',
            padding: 'p-2',
            cardSpacing: 'gap-1',
            duration: 0.2
        }),
        ...(viewMode === 'comfortable' && {
            fontSize: 'text-xl',
            padding: 'p-6',
            cardSpacing: 'gap-6',
            duration: 0.4
        })
    };

    const animDuration = isStressed ? effectiveConfig.duration * 1.5 : effectiveConfig.duration;
    const bgGradient = TIME_OF_DAY_GRADIENTS[timeOfDay];

    return (
        <div className={`min-h-screen bg-gradient-to-br ${bgGradient} text-white p-8 relative transition-colors duration-[2000ms]`}>
            {isStressed && <div className="fixed inset-0 bg-purple-900/10 pointer-events-none transition-opacity duration-[2000ms]" />}

            {/* Таймеры */}
            <WorkTimer
                workTimer={workTimer}
                breakTimer={breakTimer}
                isOnBreak={isOnBreak}
                workDuration={WORK_DURATION}
            />
            {/* Оверлеи и модалки */}
            <AFKOverlay show={userMode === 'afk'} onWakeUp={handleWakeUp} />

            <BreakSuggestion
                show={showBreakSuggestion}
                onStartBreak={startBreak}
                onSkipBreak={skipBreak}
            />

            <MusicPlayer
                show={showMusicSuggestion}
                onClose={() => setShowMusicSuggestion(false)}
                onToggle={toggleMusic}
                isPlaying={musicPlaying}
            />

            <Notification
                notifications={notifications}
                onClose={closeNotification}
            />

            <TaskModal
                task={editingTask}
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingTask(null);
                }}
                onSave={saveTask}
            />

            {/* Основной контент */}
            <div className="max-w-4xl mx-auto">
                {/* Заголовок */}
                <h1 className="text-4xl font-bold mb-2 text-center">
                    Адаптивный Таск-Менеджер
                </h1>
                <p className="text-center text-gray-400 mb-8">
                    Интерфейс адаптируется под ваш стиль работы
                </p>

                {/* Дашборд метрик */}
                <MetricsDashboard
                    config={effectiveConfig}
                    activityScore={activityScore}
                    clicks={clicks}
                    mouseSpeed={mouseSpeed}
                    typingSpeed={typingSpeed}
                    backspaceCount={backspaceCount}
                    isStressed={isStressed}
                    animDuration={animDuration}
                />

                {/* Форма добавления */}
                <TaskInput
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onSubmit={addTask}
                    config={effectiveConfig}
                    animDuration={animDuration}
                />

                {/* Список задач */}
                <div className={`flex flex-col ${effectiveConfig.cardSpacing}`}>
                    <AnimatePresence mode="popLayout">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                config={effectiveConfig}
                                animDuration={animDuration}
                                isStressed={isStressed}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                                onClick={() => openEditModal(task)}
                                viewMode={viewMode}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Пустой список */}
                {tasks.length === 0 && (
                    <div className="text-center text-gray-500 mt-12">
                        <p className={effectiveConfig.fontSize}>
                            {userMode === 'active' ? 'Добавьте задачи!' : 'Пока нет задач. Добавьте первую!'}
                        </p>
                    </div>
                )}

                {/* Подсказки */}
                {effectiveConfig.showTooltips && userMode !== 'afk' && (
                    <div className="mt-8 text-center text-sm text-gray-400 space-y-2">
                        <p>💡 Кликайте на задачу для редактирования деталей</p>
                        <p>😴 Не двигайте мышью 30 секунд, чтобы увидеть режим AFK</p>
                        <p>⌨️ Попробуйте часто нажимать Backspace при вводе...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default App;
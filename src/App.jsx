import React from 'react';
import { AnimatePresence } from 'framer-motion';

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
import { useTaskManager } from './hooks/useTaskManager';
import { useUserMode } from './hooks/useUserMode';
import { useStressDetection } from './hooks/useStressDetection';
import { useMusicPlayer } from './hooks/useMusicPlayer';
import { useWorkTimer } from './hooks/useWorkTimer';
import { useTimeOfDay } from './hooks/useTimeOfDay';

// Утилиты
import { MODE_CONFIG, TIME_OF_DAY_GRADIENTS, WORK_DURATION } from './utils/constants';
import { getViewMode } from './utils/helpers';

function App() {
    // Трекинг поведения
    const {
        clicks,
        mouseSpeed,
        typingSpeed,
        backspaceCount,
        lastActivityTime,
        trackTyping,
        trackBackspace
    } = useBehaviorTracking();

    // Уведомления
    const { notifications, showNotification, closeNotification } = useNotifications();

    // Определение режима пользователя
    const { userMode, activityScore, handleWakeUp } = useUserMode(
        clicks,
        mouseSpeed,
        typingSpeed,
        lastActivityTime
    );

    // Управление задачами
    const {
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
    } = useTaskManager(showNotification, userMode);

    // Детекция стресса
    const {
        isStressed,
        showMusicSuggestion,
        setShowMusicSuggestion,
        closeMusicSuggestion
    } = useStressDetection(backspaceCount);

    // Музыкальный плеер
    const { musicPlaying, toggleMusic } = useMusicPlayer();

    // Таймер работы и перерывов
    const {
        workTimer,
        breakTimer,
        isOnBreak,
        showBreakSuggestion,
        breakFinished,
        startBreak,
        skipBreak
    } = useWorkTimer(lastActivityTime, showNotification);

    // Время суток
    const timeOfDay = useTimeOfDay();

    // Обработчики ввода
    const handleInputChange = (e) => {
        trackTyping();
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            trackBackspace();
        }
    };

    // Конфигурация режима и стиля
    const config = MODE_CONFIG[userMode];
    const viewMode = getViewMode(tasks.length);

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

            <WorkTimer
                workTimer={workTimer}
                breakTimer={breakTimer}
                isOnBreak={isOnBreak}
                workDuration={WORK_DURATION}
            />

            <AFKOverlay show={userMode === 'afk'} onWakeUp={handleWakeUp} />

            <BreakSuggestion
                show={showBreakSuggestion}
                onStartBreak={startBreak}
                onSkipBreak={skipBreak}
                isOnBreak={isOnBreak}
                breakTimer={breakTimer}
                breakFinished={breakFinished}
            />

            <MusicPlayer
                show={showMusicSuggestion}
                onClose={closeMusicSuggestion}
                onToggle={() => toggleMusic(setShowMusicSuggestion)}
                isPlaying={musicPlaying}
            />

            <Notification
                notifications={notifications}
                onClose={closeNotification}
            />

            <TaskModal
                task={editingTask}
                isOpen={modalOpen}
                onClose={closeModal}
                onSave={saveTask}
            />

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 text-center">
                    Адаптивный Таск-Менеджер
                </h1>
                <p className="text-center text-gray-400 mb-8">
                    Интерфейс адаптируется под ваш стиль работы
                </p>

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

                <TaskInput
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onSubmit={addTask}
                    config={effectiveConfig}
                    animDuration={animDuration}
                />

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

                {tasks.length === 0 && (
                    <div className="text-center text-gray-500 mt-12">
                        <p className={effectiveConfig.fontSize}>
                            {userMode === 'active' ? 'Добавьте задачи!' : 'Пока нет задач. Добавьте первую!'}
                        </p>
                    </div>
                )}

                {effectiveConfig.showTooltips && userMode !== 'afk' && (
                    <div className="mt-8 text-center text-sm text-gray-400 space-y-2">
                        <p>Не двигайте мышью 30 секунд, чтобы увидеть режим AFK</p>
                        <p>Попробуйте часто нажимать Backspace при вводе</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
export const MODE_CONFIG = {
    active: {
        duration: 0.2,
        cardSpacing: 'gap-2',
        padding: 'p-3',
        fontSize: 'text-sm',
        buttonSize: 'p-2',
        showTooltips: false,
        colors: 'bg-gradient-to-br from-red-500 to-orange-500',
        label: 'Активный',
        cardBg: 'bg-gray-800',
        border: 'border-2 border-red-500',
        description: 'Молния! Быстрый режим активирован'
    },
    normal: {
        duration: 0.3,
        cardSpacing: 'gap-3',
        padding: 'p-4',
        fontSize: 'text-base',
        buttonSize: 'p-3',
        showTooltips: true,
        colors: 'bg-gradient-to-br from-blue-500 to-cyan-500',
        label: 'Нормальный',
        cardBg: 'bg-gray-700',
        border: 'border border-blue-500',
        description: 'Комфортный темп работы'
    },
    calm: {
        duration: 0.5,
        cardSpacing: 'gap-4',
        padding: 'p-6',
        fontSize: 'text-lg',
        buttonSize: 'p-4',
        showTooltips: true,
        colors: 'bg-gradient-to-br from-purple-500 to-pink-500',
        label: 'Спокойный',
        cardBg: 'bg-gray-600',
        border: 'border-2 border-purple-500',
        description: 'Размеренная работа с подсказками'
    },
    afk: {
        duration: 0.5,
        cardSpacing: 'gap-4',
        padding: 'p-6',
        fontSize: 'text-lg',
        buttonSize: 'p-4',
        showTooltips: true,
        colors: 'bg-gradient-to-br from-gray-700 to-gray-900',
        label: '💤 AFK',
        cardBg: 'bg-gray-600',
        border: 'border-2 border-gray-500',
        description: 'Отдыхаете?'
    }
};

export const TIME_OF_DAY_GRADIENTS = {
    morning: 'from-blue-900 via-indigo-900 to-purple-900',
    day: 'from-gray-900 via-gray-800 to-gray-900',
    night: 'from-gray-900 via-black to-gray-900'
};

export const WORK_DURATION = 1500; // 25 минут в секундах
export const BREAK_DURATION = 300; // 5 минут
export const AFK_TIMEOUT = 30; // 30 секунд
export const STRESS_THRESHOLD = 10; // Backspace порог
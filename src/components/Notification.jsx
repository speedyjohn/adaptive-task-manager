import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Notification = ({ notifications, onClose }) => {
    const getGradient = (type) => {
        switch (type) {
            case 'success': return 'from-green-600 to-emerald-600';
            case 'warning': return 'from-yellow-600 to-orange-600';
            case 'error': return 'from-red-600 to-pink-600';
            default: return 'from-blue-600 to-cyan-600';
        }
    };

    return (
        <AnimatePresence>
            {notifications.slice(-3).map((notif, idx) => (
                <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    style={{ bottom: `${8 + idx * 6}rem` }}
                    className={`fixed right-8 z-40 max-w-md rounded-2xl p-6 shadow-2xl bg-gradient-to-br ${getGradient(notif.type)}`}
                >
                    <button
                        onClick={() => onClose(notif.id)}
                        className="absolute top-2 right-2 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X size={16} />
                    </button>
                    <div className="flex items-start gap-3">
                        <div className="text-3xl">{notif.emoji}</div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">{notif.title}</h3>
                            <p className="text-sm opacity-90">{notif.text}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

export default Notification;
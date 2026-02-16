import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-rose-500';
    const icon = type === 'success' ? '✅' : '❌';

    return (
        <div className={`fixed bottom-5 right-5 ${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideIn z-[9999] backdrop-blur-sm bg-opacity-90`}>
            <span className="text-xl">{icon}</span>
            <p className="font-bold uppercase tracking-wide text-sm">{message}</p>
        </div>
    );
};

export default Toast;

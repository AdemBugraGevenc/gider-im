import React from 'react';
import { X, Bell, Info, AlertTriangle, Target, CreditCard, CheckCircle2, Trash2 } from 'lucide-react';
import { Notification } from '../types';

interface BildirimlerModalProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
    onClearAll: () => void;
}

export const BildirimlerModal: React.FC<BildirimlerModalProps> = ({
    isOpen,
    onClose,
    notifications,
    onMarkAsRead,
    onDelete,
    onClearAll
}) => {
    if (!isOpen) return null;

    const getIcon = (type: Notification['type'], priority: Notification['priority']) => {
        const iconClass = priority === 'high' ? 'text-rose-500' : priority === 'medium' ? 'text-amber-500' : 'text-blue-500';

        switch (type) {
            case 'budget': return <AlertTriangle className={`w-4 h-4 ${iconClass}`} />;
            case 'goal': return <Target className={`w-4 h-4 ${iconClass}`} />;
            case 'card': return <CreditCard className={`w-4 h-4 ${iconClass}`} />;
            default: return <Info className={`w-4 h-4 ${iconClass}`} />;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

            <div className="relative w-full max-w-[414px] bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500 flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="px-6 pt-8 pb-4 flex items-center justify-between border-b border-slate-50 sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-900 leading-none mb-1">Bildirimler</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                                {notifications.filter(n => !n.isRead).length} Yeni Mesaj
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {notifications.length > 0 && (
                            <button
                                onClick={onClearAll}
                                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                title="Tümünü Temizle"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl text-slate-400 active:scale-90 transition-all">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
                    {notifications.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-4 animate-pulse">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-sm font-black text-slate-900 mb-1">Her Şey Güncel!</h3>
                            <p className="text-xs text-slate-400 font-medium">Şu an için yeni bir bildirim bulunmuyor.</p>
                        </div>
                    ) : (
                        notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(notification => (
                            <div
                                key={notification.id}
                                onClick={() => onMarkAsRead(notification.id)}
                                className={`group relative p-4 rounded-3xl border transition-all active:scale-[0.98] cursor-pointer ${notification.isRead
                                        ? 'bg-white border-slate-50 opacity-60'
                                        : 'bg-white border-slate-100 shadow-sm shadow-slate-200/50'
                                    }`}
                            >
                                {!notification.isRead && (
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-rose-500 rounded-full ring-4 ring-rose-50" />
                                )}

                                <div className="flex gap-4">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${notification.type === 'budget' ? 'bg-amber-50' :
                                            notification.type === 'goal' ? 'bg-indigo-50' :
                                                notification.type === 'card' ? 'bg-violet-50' : 'bg-blue-50'
                                        }`}>
                                        {getIcon(notification.type, notification.priority)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h4 className="font-bold text-slate-900 text-xs truncate pr-4">{notification.title}</h4>
                                            <span className="text-[8px] font-black text-slate-300 uppercase shrink-0">
                                                {new Date(notification.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{notification.message}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(notification.id);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 transition-all self-center"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Tip */}
                {notifications.length > 0 && (
                    <div className="px-6 py-4 bg-slate-50/50 text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Bildirime tıklayarak okundu olarak işaretleyebilirsin
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

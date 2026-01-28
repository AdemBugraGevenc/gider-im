import React, { useMemo } from 'react';
import { Trash2, CalendarClock } from 'lucide-react'; // Using correct icons
import { Subscription } from '../types';

interface AboneliklerProps {
    subscriptions: Subscription[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onOpenAddModal: () => void;
    onProcessToTransactions: () => void;
    formatCurrency: (amount: number) => string;
}

export const Abonelikler: React.FC<AboneliklerProps> = ({
    subscriptions,
    onDelete,
    onToggle,
    onOpenAddModal,
    onProcessToTransactions,
    formatCurrency
}) => {

    const totalMonthly = useMemo(() => {
        return subscriptions
            .filter(s => s.isActive)
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [subscriptions]);

    return (
        <div className="px-5 py-4 space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Aylık Sabit Gider</p>
                    <h2 className="text-3xl font-black tracking-tight mb-4">{formatCurrency(totalMonthly)}</h2>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-white/10 px-3 py-1.5 rounded-full w-fit">
                            <CalendarClock className="w-3.5 h-3.5" />
                            <span>{subscriptions.length} Aktif Abonelik</span>
                        </div>
                    </div>

                    <button
                        onClick={onProcessToTransactions}
                        className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-xs active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        Bu Ayın Giderlerine Ekle
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-sm font-bold text-slate-900">Aboneliklerim</h3>
                    <button
                        onClick={onOpenAddModal}
                        className="text-[10px] font-bold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full active:bg-violet-100 transition-colors"
                    >
                        + YENİ EKLE
                    </button>
                </div>

                {subscriptions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400 space-y-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                            <CalendarClock className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-xs font-medium">Henüz abonelik eklenmemiş.</p>
                    </div>
                ) : (
                    subscriptions.map((sub) => (
                        <div key={sub.id} className={`group relative bg-white p-4 rounded-2xl shadow-sm border border-slate-100 transition-all ${!sub.isActive ? 'opacity-60 grayscale' : ''}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg shadow-inner">
                                        {sub.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900">{sub.title}</h4>
                                        <p className="text-[10px] font-medium text-slate-400">Her ayın {sub.paymentDay}. günü</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-900">{formatCurrency(sub.amount)}</span>

                                    {/* Toggle Switch */}
                                    <div
                                        onClick={() => onToggle(sub.id)}
                                        className={`w-8 h-5 rounded-full p-1 cursor-pointer transition-colors relative ${sub.isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                    >
                                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${sub.isActive ? 'translate-x-[12px]' : 'translate-x-0'}`} />
                                    </div>

                                    <button
                                        onClick={() => onDelete(sub.id)}
                                        className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

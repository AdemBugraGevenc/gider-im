import React, { useState } from 'react';
import { Trash2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Transaction } from '../types';

interface KaydirilebilirIslemProps {
    transaction: Transaction;
    onDelete: (id: string) => void;
    onToggleStatus?: (id: string) => void;
    formatCurrency: (amount: number) => string;
    isDeletable?: boolean;
    onClick?: () => void;
}

export const KaydirilebilirIslem: React.FC<KaydirilebilirIslemProps> = ({
    transaction,
    onDelete,
    onToggleStatus,
    formatCurrency,
    isDeletable = true,
    onClick
}) => {
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const deleteThreshold = -80;
    const toggleThreshold = 80;

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const diff = e.touches[0].clientX - startX;

        // Limit swipe range
        if (diff < 0) {
            // Swiping Left (Delete)
            if (!isDeletable) {
                setCurrentX(0);
                return;
            }
            setCurrentX(Math.max(diff, -100));
        } else {
            // Swiping Right (Toggle Status)
            setCurrentX(Math.min(diff, 100));
        }
    };

    const handleTouchEnd = () => {
        if (currentX < deleteThreshold) {
            // Keep open for delete
            setCurrentX(-80);
        } else if (currentX > toggleThreshold) {
            // Trigger Toggle
            if (onToggleStatus) {
                onToggleStatus(transaction.id);
            }
            setCurrentX(0); // Snap back after toggle
        } else {
            setCurrentX(0);
        }
    };

    // Determine swipe right background color based on what it WILL become
    const swipeRightBg = transaction.status === 'completed'
        ? 'bg-amber-500' // Will become pending
        : 'bg-sky-400'; // Will become completed (Light Blue)

    const swipeRightText = transaction.status === 'completed'
        ? 'BEKLİYOR'
        : 'ÖDENDİ';

    return (
        <div className={`relative overflow-hidden rounded-2xl ${currentX > 0 ? swipeRightBg : 'bg-rose-500'}`}>
            {/* Background (Delete Action - Left) */}
            <div
                className="absolute inset-y-0 right-0 flex items-center justify-end px-6 text-white cursor-pointer w-1/2 ml-auto"
                style={{ opacity: currentX < 0 ? 1 : 0 }}
                onClick={() => onDelete(transaction.id)}
            >
                <Trash2 className="w-5 h-5" />
            </div>

            {/* Background (Toggle Action - Right) */}
            <div
                className="absolute inset-y-0 left-0 flex items-center px-6 text-white w-1/2 font-black text-[10px] tracking-widest uppercase"
                style={{ opacity: currentX > 0 ? 1 : 0 }}
            >
                {swipeRightText}
            </div>

            {/* Foreground (Card Content) */}
            <div
                className={`relative bg-white p-3.5 flex items-center justify-between transition-transform duration-200 ease-out border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] ${onClick ? 'cursor-pointer' : ''}`}
                style={{ transform: `translateX(${currentX}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={onClick}
            >
                <div className="flex items-center gap-3 min-w-0">
                    {/* LEFT: STATUS TOGGLE (Moved here) */}
                    <div className="flex flex-col items-center justify-center gap-1 pl-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onToggleStatus) onToggleStatus(transaction.id);
                            }}
                            className={`w-5 h-5 rounded-full border-[3px] transition-all cursor-pointer flex items-center justify-center ${transaction.status === 'completed'
                                ? 'bg-sky-400 border-sky-400'
                                : 'bg-transparent border-slate-200 hover:border-sky-400'
                                }`}
                            aria-label="Toggle Status"
                        >
                            {transaction.status === 'completed' && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                        </button>
                    </div>

                    <div className="min-w-0 flex flex-col justify-center">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight leading-none mb-1">
                            {new Date(transaction.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                        </p>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-xs truncate leading-tight mb-0.5">{transaction.title}</h4>
                            {onClick && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="m6 9 6 6 6-6" /></svg>}
                        </div>
                        <div className="flex items-center gap-1.5 overflow-hidden">
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate opacity-80 leading-none">{transaction.category}</p>
                            {transaction.paymentMethod === 'credit_card' && (
                                <div className="flex items-center gap-1 bg-violet-50 text-violet-500 px-1 rounded-sm text-[8px] font-black uppercase shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                    {transaction.installment ? `T ${transaction.installment.current}/${transaction.installment.total}` : 'KART'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT: AMOUNT & ICON (Moved here) */}
                <div className="text-right flex items-center gap-3 min-w-fit pl-2">
                    <p className={`font-black text-xs whitespace-nowrap leading-none ${transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>

                    <div className={`w-9 h-9 min-w-[2.25rem] rounded-xl flex items-center justify-center shadow-sm ${transaction.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                        {transaction.type === 'income' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

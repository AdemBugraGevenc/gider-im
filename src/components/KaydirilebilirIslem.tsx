import React, { useState } from 'react';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from '../types';

interface KaydirilebilirIslemProps {
    transaction: Transaction;
    onDelete: (id: string) => void;
    formatCurrency: (amount: number) => string;
}

export const KaydirilebilirIslem: React.FC<KaydirilebilirIslemProps> = ({
    transaction,
    onDelete,
    formatCurrency
}) => {
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const threshold = -80;

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const diff = e.touches[0].clientX - startX;
        if (diff < 0) {
            setCurrentX(Math.max(diff, -100));
        } else {
            setCurrentX(0);
        }
    };

    const handleTouchEnd = () => {
        if (currentX < threshold) {
            setCurrentX(-80);
        } else {
            setCurrentX(0);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-rose-500">
            {/* Background (Delete Action) */}
            <div
                className="absolute inset-0 flex items-center justify-end px-6 text-white cursor-pointer"
                onClick={() => onDelete(transaction.id)}
            >
                <Trash2 className="w-5 h-5" />
            </div>

            {/* Foreground (Card Content) */}
            <div
                className="relative bg-white p-3.5 flex items-center justify-between transition-transform duration-200 ease-out border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]"
                style={{ transform: `translateX(${currentX}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 min-w-[2.25rem] rounded-xl flex items-center justify-center shadow-sm ${transaction.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                        {transaction.type === 'income' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0 flex flex-col">
                        <h4 className="font-bold text-slate-900 text-xs truncate leading-tight mb-0.5">{transaction.title}</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate opacity-80 leading-none">{transaction.category}</p>
                    </div>
                </div>
                <div className="text-right flex flex-col items-end min-w-fit pl-2">
                    <p className={`font-black text-xs whitespace-nowrap leading-none ${transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                </div>
            </div>
        </div>
    );
};

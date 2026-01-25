import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Goal } from '../types';

interface ParaEkleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (amount: number) => void;
    goal: Goal | undefined;
    formatCurrency: (amount: number) => string;
}

export const ParaEkleModal: React.FC<ParaEkleModalProps> = ({ isOpen, onClose, onAdd, goal, formatCurrency }) => {
    const [amount, setAmount] = useState('');

    if (!isOpen || !goal) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const value = parseFloat(amount);
        if (isNaN(value)) return;
        onAdd(value);
        setAmount('');
    };

    return (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-between mb-5 px-1">
                    <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Para Ekle</h2>
                    <button onClick={onClose} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 mb-4 border border-emerald-100">
                        <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Hedef</p>
                        <p className="text-sm font-black text-slate-900">
                            {goal.title}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-[9px] font-bold text-slate-600">
                            <span>{formatCurrency(goal.currentAmount || 0)}</span>
                            <span className="text-slate-400">/</span>
                            <span>{formatCurrency(goal.targetAmount || 0)}</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Eklenecek Tutar</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-2xl leading-none">₺</span>
                            <input
                                type="number"
                                required
                                inputMode="decimal"
                                placeholder="0.00"
                                autoFocus
                                className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-2xl text-3xl font-black focus:outline-none border border-slate-100 shadow-sm"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl text-sm shadow-xl active:scale-95 transition-all mt-2 tracking-[0.1em] uppercase shadow-emerald-600/20"
                    >
                        PARA EKLE
                    </button>
                </form>
            </div>
        </div>
    );
};

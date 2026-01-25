import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Goal } from '../types';

interface HedefEkleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (goal: Goal) => void;
}

export const HedefEkleModal: React.FC<HedefEkleModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [goalFormData, setGoalFormData] = useState({
        title: '',
        targetAmount: '',
        category: '',
        deadline: '',
        icon: '🎯',
        color: 'from-violet-500 to-purple-600'
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!goalFormData.title || !goalFormData.targetAmount) return;

        const newGoal: Goal = {
            id: Date.now().toString(),
            title: goalFormData.title,
            targetAmount: parseFloat(goalFormData.targetAmount),
            currentAmount: 0,
            category: goalFormData.category || 'Genel',
            deadline: goalFormData.deadline || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            icon: goalFormData.icon,
            color: goalFormData.color
        };

        onAdd(newGoal);
        setGoalFormData({
            title: '',
            targetAmount: '',
            category: '',
            deadline: '',
            icon: '🎯',
            color: 'from-violet-500 to-purple-600'
        });
    };

    return (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-between mb-5 px-1">
                    <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Yeni Hedef Oluştur</h2>
                    <button onClick={onClose} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Hedef Adı</label>
                        <input
                            type="text"
                            required
                            placeholder="Örn: Yaz Tatili"
                            className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm"
                            value={goalFormData.title}
                            onChange={(e) => setGoalFormData({ ...goalFormData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Hedef Tutar</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-lg leading-none">₺</span>
                                <input
                                    type="number"
                                    required
                                    inputMode="decimal"
                                    placeholder="0"
                                    className="w-full pl-10 pr-4 py-4 bg-slate-50 rounded-2xl text-lg font-black focus:outline-none border border-slate-100 shadow-sm"
                                    value={goalFormData.targetAmount}
                                    onChange={(e) => setGoalFormData({ ...goalFormData, targetAmount: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Kategori</label>
                            <select
                                className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm appearance-none bg-white"
                                value={goalFormData.category}
                                onChange={(e) => setGoalFormData({ ...goalFormData, category: e.target.value })}
                            >
                                <option value="">Seçiniz...</option>
                                <option value="Tatil">🏖️ Tatil</option>
                                <option value="Tasarruf">🛡️ Tasarruf</option>
                                <option value="Teknoloji">💻 Teknoloji</option>
                                <option value="Ulaşım">🚗 Ulaşım</option>
                                <option value="Eğitim">📚 Eğitim</option>
                                <option value="Sağlık">🏥 Sağlık</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Bitiş Tarihi</label>
                        <input
                            type="date"
                            className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm"
                            value={goalFormData.deadline}
                            onChange={(e) => setGoalFormData({ ...goalFormData, deadline: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-violet-600 text-white font-black rounded-2xl text-sm shadow-xl active:scale-95 transition-all mt-2 tracking-[0.1em] uppercase shadow-violet-600/20"
                    >
                        HEDEF OLUŞTUR
                    </button>
                </form>
            </div>
        </div>
    );
};

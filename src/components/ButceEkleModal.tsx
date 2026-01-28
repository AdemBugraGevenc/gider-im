import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Budget } from '../types';

interface ButceEkleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (budget: Budget) => void;
}

export const ButceEkleModal: React.FC<ButceEkleModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        category: '',
        limitAmount: '',
        icon: '💰', // Default icon
        color: 'bg-emerald-500' // Default color class for progress bar or dot
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.category || !formData.limitAmount) return;

        const newBudget: Budget = {
            id: Date.now().toString(),
            category: formData.category,
            limitAmount: parseFloat(formData.limitAmount),
            icon: formData.icon,
            color: formData.color
        };

        onAdd(newBudget);
        setFormData({
            category: '',
            limitAmount: '',
            icon: '💰',
            color: 'bg-emerald-500'
        });
    };

    return (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-between mb-5 px-1">
                    <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Yeni Bütçe Limiti</h2>
                    <button onClick={onClose} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Kategori</label>
                        <select
                            className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm appearance-none bg-white"
                            value={formData.category}
                            onChange={(e) => {
                                const val = e.target.value;
                                let icon = '💰';
                                if (val === 'Kira') icon = '🏠';
                                else if (val === 'Fatura') icon = '🧾';
                                else if (val === 'Gıda') icon = '🍔';
                                else if (val === 'Ulaşım') icon = '🚕';
                                else if (val === 'Hizmet') icon = '💻';
                                else if (val === 'Eğlence') icon = '🎉';
                                else if (val === 'Diğer') icon = '📦';

                                setFormData({ ...formData, category: val, icon });
                            }}
                        >
                            <option value="">Seçiniz...</option>
                            <option value="Kira">🏠 Kira</option>
                            <option value="Fatura">🧾 Fatura</option>
                            <option value="Gıda">🍔 Gıda</option>
                            <option value="Ulaşım">🚕 Ulaşım</option>
                            <option value="Hizmet">💻 Hizmet</option>
                            <option value="Eğlence">🎉 Eğlence</option>
                            <option value="Diğer">📦 Diğer</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Aylık Limit</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-lg leading-none">₺</span>
                            <input
                                type="number"
                                required
                                inputMode="decimal"
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-4 bg-slate-50 rounded-2xl text-lg font-black focus:outline-none border border-slate-100 shadow-sm"
                                value={formData.limitAmount}
                                onChange={(e) => setFormData({ ...formData, limitAmount: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl text-sm shadow-xl active:scale-95 transition-all mt-2 tracking-[0.1em] uppercase shadow-emerald-600/20"
                    >
                        BÜTÇE OLUŞTUR
                    </button>
                </form>
            </div>
        </div>
    );
};

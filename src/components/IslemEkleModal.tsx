import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Transaction, TransactionType } from '../types';

interface IslemEkleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (transaction: Transaction) => void;
}

export const IslemEkleModal: React.FC<IslemEkleModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({ title: '', amount: '', type: 'expense', category: '' });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) return;

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            title: formData.title,
            amount: parseFloat(formData.amount),
            type: formData.type as TransactionType,
            category: formData.category || 'Genel',
            date: new Date().toISOString().split('T')[0],
            status: 'completed'
        };

        onAdd(newTransaction);
        setFormData({ title: '', amount: '', type: 'expense', category: '' });
    };

    return (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-between mb-5 px-1">
                    <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Yeni Kayıt Oluştur</h2>
                    <button onClick={onClose} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100"><X className="w-4 h-4" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                    <div className="bg-slate-100 p-1.5 rounded-2xl flex shadow-inner border border-slate-200">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'expense' })}
                            className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${formData.type === 'expense' ? 'bg-white text-rose-600 shadow-md' : 'text-slate-400'}`}
                        >
                            GİDER
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'income' })}
                            className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${formData.type === 'income' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-400'}`}
                        >
                            GELİR
                        </button>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Harcama/Gelir Tutarı</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-xl leading-none">₺</span>
                            <input
                                type="number"
                                required
                                inputMode="decimal"
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-4 bg-slate-50 rounded-2xl text-2xl font-black focus:outline-none border border-slate-100 shadow-sm"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Kategori</label>
                            <select
                                className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm appearance-none bg-white"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Seçiniz...</option>
                                <option value="Kira">🏠 Kira</option>
                                <option value="Fatura">🧾 Fatura</option>
                                <option value="Gıda">🍔 Gıda</option>
                                <option value="Ulaşım">🚕 Ulaşım</option>
                                <option value="Hizmet">💻 Hizmet</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Açıklama</label>
                            <input
                                type="text"
                                required
                                placeholder="Örn: Kahve"
                                className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-sm shadow-xl active:scale-95 transition-all mt-2 tracking-[0.1em] uppercase shadow-slate-900/20"
                    >
                        KAYIT EKLE
                    </button>
                </form>
            </div>
        </div>
    );
};

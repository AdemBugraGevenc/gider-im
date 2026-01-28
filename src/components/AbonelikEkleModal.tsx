import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Subscription } from '../types';

interface AbonelikEkleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (subscription: Subscription) => void;
}

export const AbonelikEkleModal: React.FC<AbonelikEkleModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        paymentDay: '',
        category: '',
        icon: '📅'
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.amount || !formData.paymentDay) return;

        const newSubscription: Subscription = {
            id: Date.now().toString(),
            title: formData.title,
            amount: parseFloat(formData.amount),
            paymentDay: parseInt(formData.paymentDay),
            category: formData.category || 'Genel',
            icon: formData.icon,
            isActive: true
        };

        onAdd(newSubscription);
        setFormData({
            title: '',
            amount: '',
            paymentDay: '',
            category: '',
            icon: '📅'
        });
    };

    return (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-between mb-5 px-1">
                    <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Yeni Abonelik</h2>
                    <button onClick={onClose} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Abonelik Adı</label>
                        <input
                            type="text"
                            required
                            placeholder="Örn: Netflix"
                            className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Aylık Tutar</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-lg leading-none">₺</span>
                                <input
                                    type="number"
                                    required
                                    inputMode="decimal"
                                    placeholder="0"
                                    className="w-full pl-10 pr-4 py-4 bg-slate-50 rounded-2xl text-lg font-black focus:outline-none border border-slate-100 shadow-sm"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Ödeme Günü (1-31)</label>
                            <input
                                type="number"
                                required
                                min="1"
                                max="31"
                                placeholder="1"
                                className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm"
                                value={formData.paymentDay}
                                onChange={(e) => setFormData({ ...formData, paymentDay: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Kategori</label>
                        <select
                            className="w-full px-4 py-4 bg-slate-50 rounded-2xl text-[11px] font-bold focus:outline-none border border-slate-100 shadow-sm appearance-none bg-white"
                            value={formData.category}
                            onChange={(e) => {
                                const val = e.target.value;
                                let icon = '📅';
                                if (val === 'Eğlence') icon = '🍿';
                                else if (val === 'Fatura') icon = '💡';
                                else if (val === 'Kira') icon = '🏠';
                                else if (val === 'Eğitim') icon = '📚';
                                else if (val === 'Sağlık') icon = '🏥';
                                else if (val === 'Yazılım') icon = '💻';
                                else if (val === 'Diğer') icon = '📦';

                                setFormData({ ...formData, category: val, icon });
                            }}
                        >
                            <option value="">Seçiniz...</option>
                            <option value="Eğlence">🍿 Eğlence</option>
                            <option value="Fatura">💡 Fatura</option>
                            <option value="Kira">🏠 Kira</option>
                            <option value="Eğitim">📚 Eğitim</option>
                            <option value="Sağlık">🏥 Sağlık</option>
                            <option value="Yazılım">💻 Yazılım</option>
                            <option value="Diğer">📦 Diğer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl text-sm shadow-xl active:scale-95 transition-all mt-2 tracking-[0.1em] uppercase shadow-emerald-500/20"
                    >
                        KAYDET
                    </button>
                </form>
            </div>
        </div>
    );
};

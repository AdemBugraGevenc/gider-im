import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { Transaction, TransactionType, CreditCard as CreditCardType } from '../types';

interface IslemEkleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (transaction: Transaction) => void;
    creditCards: CreditCardType[]; // Pass available credit cards
}

export const IslemEkleModal: React.FC<IslemEkleModalProps> = ({ isOpen, onClose, onAdd, creditCards = [] }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense' as TransactionType,
        category: '',
        isRecurring: false,
        recurrenceType: 'monthly' as 'monthly' | 'quarterly' | 'yearly' | 'custom',
        recurrenceCount: 1,
        customPeriod: 1,
        isPaid: true,
        paymentMethod: 'cash' as 'cash' | 'credit_card',
        creditCardId: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) return;
        if (formData.paymentMethod === 'credit_card' && !formData.creditCardId) {
            alert('Lütfen bir kredi kartı seçiniz.');
            return;
        }

        const amount = parseFloat(formData.amount);
        const baseDate = new Date();

        const commonData = {
            title: formData.title,
            amount: amount,
            type: formData.type,
            category: formData.category || 'Genel',
            paymentMethod: formData.paymentMethod,
            creditCardId: formData.paymentMethod === 'credit_card' ? formData.creditCardId : undefined
        };

        // Single transaction
        if (!formData.isRecurring || formData.recurrenceCount <= 1) {
            const newTransaction: Transaction = {
                id: Date.now().toString(),
                date: baseDate.toISOString().split('T')[0],
                status: formData.isPaid ? 'completed' : 'pending',
                ...commonData
            };
            onAdd(newTransaction);
        } else {
            // Recurring transactions
            for (let i = 0; i < formData.recurrenceCount; i++) {
                const nextDate = new Date(baseDate);

                if (formData.recurrenceType === 'monthly') {
                    nextDate.setMonth(baseDate.getMonth() + i);
                } else if (formData.recurrenceType === 'quarterly') {
                    nextDate.setMonth(baseDate.getMonth() + (i * 3));
                } else if (formData.recurrenceType === 'yearly') {
                    nextDate.setFullYear(baseDate.getFullYear() + i);
                } else if (formData.recurrenceType === 'custom') {
                    nextDate.setMonth(baseDate.getMonth() + (i * formData.customPeriod));
                }

                // Adjust for date overflow
                const day = baseDate.getDate();
                if (nextDate.getDate() !== day) {
                    nextDate.setDate(0);
                }
                const offset = nextDate.getTimezoneOffset();
                const adjustedDate = new Date(nextDate.getTime() - (offset * 60 * 1000));

                const status = i === 0 ? (formData.isPaid ? 'completed' : 'pending') : 'pending';

                onAdd({
                    ...commonData,
                    id: `${Date.now()}-${i}`,
                    title: `${formData.title} (${i + 1}/${formData.recurrenceCount})`,
                    date: adjustedDate.toISOString().split('T')[0],
                    status: status,
                    installment: {
                        current: i + 1,
                        total: formData.recurrenceCount
                    }
                });
            }
        }

        setFormData({
            title: '',
            amount: '',
            type: 'expense',
            category: '',
            isRecurring: false,
            recurrenceType: 'monthly',
            recurrenceCount: 1,
            customPeriod: 1,
            isPaid: true,
            paymentMethod: 'cash',
            creditCardId: ''
        });
    };

    return (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-between mb-5 px-1">
                    <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Yeni Kayıt Oluştur</h2>
                    <button onClick={onClose} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100"><X className="w-4 h-4" /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                    {/* TYPE SWITCHER */}
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

                    {/* AMOUNT */}
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

                    {formData.type === 'expense' && (
                        <div className="space-y-3 pt-2">
                            {/* PAYMENT METHOD */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, paymentMethod: 'cash', creditCardId: '' })}
                                    className={`flex-1 py-3 px-2 rounded-xl border-2 text-[10px] font-bold uppercase tracking-wide transition-all ${formData.paymentMethod === 'cash'
                                        ? 'border-slate-900 bg-slate-900 text-white'
                                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                                        }`}
                                >
                                    Nakit / Hesap
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                                    className={`flex-1 py-3 px-2 rounded-xl border-2 text-[10px] font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${formData.paymentMethod === 'credit_card'
                                        ? 'border-violet-600 bg-violet-600 text-white'
                                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                                        }`}
                                >
                                    <CreditCard className="w-3.5 h-3.5" />
                                    Kredi Kartı
                                </button>
                            </div>

                            {/* CARD SELECTION */}
                            {formData.paymentMethod === 'credit_card' && (
                                <div className="animate-in slide-in-from-top-2 fade-in">
                                    <select
                                        className="w-full p-3 bg-violet-50 rounded-xl text-xs font-bold text-violet-900 border border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-200"
                                        value={formData.creditCardId}
                                        onChange={(e) => setFormData({ ...formData, creditCardId: e.target.value })}
                                        required
                                    >
                                        <option value="">Kredi Kartı Seçiniz...</option>
                                        {creditCards.map(card => (
                                            <option key={card.id} value={card.id}>
                                                {card.icon} {card.name} (Lim: {card.limit.toLocaleString('tr-TR')}₺)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}


                    {/* STATUS SWITCH (PAID/PENDING) */}
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Durum</span>
                        <div className="flex bg-slate-200 p-0.5 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isPaid: true })}
                                className={`px-3 py-1.5 rounded-md text-[9px] font-black transition-all ${formData.isPaid ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                            >
                                GERÇEKLEŞTİ
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isPaid: false })}
                                className={`px-3 py-1.5 rounded-md text-[9px] font-black transition-all ${!formData.isPaid ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-400'}`}
                            >
                                BEKLİYOR
                            </button>
                        </div>
                    </div>

                    {/* RECURRING OPTION */}
                    <div className="border-t border-b border-slate-100 py-3 space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-slate-600 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-offset-0 focus:ring-2 focus:ring-slate-900"
                                    checked={formData.isRecurring}
                                    onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                                />
                                Tekrarlı / Taksitli İşlem?
                            </label>
                            {formData.isRecurring && (
                                <span className="text-[9px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded">
                                    Taksit olarak eklenir
                                </span>
                            )}
                        </div>

                        {formData.isRecurring && (
                            <div className="grid grid-cols-2 gap-3 pl-6 animate-in slide-in-from-top-2">
                                <div className="space-y-1">
                                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">Sıklık</label>
                                    <select
                                        className="w-full p-2 bg-slate-50 rounded-xl text-[10px] font-bold border border-slate-200"
                                        value={formData.recurrenceType}
                                        onChange={(e) => setFormData({ ...formData, recurrenceType: e.target.value as any })}
                                    >
                                        <option value="monthly">Her Ay</option>
                                        <option value="quarterly">3 Ayda Bir</option>
                                        <option value="yearly">Yıllık</option>
                                        <option value="custom">Özel Periyot</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">Tekrar Sayısı</label>
                                    <select
                                        className="w-full p-2 bg-slate-50 rounded-xl text-[10px] font-bold border border-slate-200"
                                        value={formData.recurrenceCount}
                                        onChange={(e) => setFormData({ ...formData, recurrenceCount: parseInt(e.target.value) })}
                                    >
                                        {[...Array(11)].map((_, i) => (
                                            <option key={i + 2} value={i + 2}>{i + 2} Taksit/Kez</option>
                                        ))}
                                    </select>
                                </div>

                                {formData.recurrenceType === 'custom' && (
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">Kaç Ayda Bir?</label>
                                        <select
                                            className="w-full p-2 bg-slate-50 rounded-xl text-[10px] font-bold border border-slate-200"
                                            value={formData.customPeriod}
                                            onChange={(e) => setFormData({ ...formData, customPeriod: parseInt(e.target.value) })}
                                        >
                                            {[...Array(12)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1} Ayda Bir</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* CATEGORY & TITLE */}
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
                                <option value="Eğlence">🎉 Eğlence</option>
                                <option value="Diğer">📦 Diğer</option>
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

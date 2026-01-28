import React, { useState } from 'react';
import { CreditCard as CardIcon, Plus, Trash2, Calendar, ShieldCheck, X } from 'lucide-react';
import { CreditCard as CreditCardType, Transaction } from '../types';

interface KrediKartlariProps {
    cards: CreditCardType[];
    transactions: Transaction[];
    onAddCard: (card: CreditCardType) => void;
    onDeleteCard: (id: string) => void;
    formatCurrency: (amount: number) => string;
}

export const KrediKartlari: React.FC<KrediKartlariProps> = ({
    cards,
    transactions,
    onAddCard,
    onDeleteCard,
    formatCurrency
}) => {
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

    // New Card Form State
    const [newCard, setNewCard] = useState({
        name: '',
        limit: '',
        cutoffDay: '',
        paymentDueDay: '',
        color: 'from-slate-700 to-slate-900',
        icon: '💳'
    });

    const selectedCard = cards.find(c => c.id === selectedCardId);
    const cardTransactions = transactions.filter(t => t.creditCardId === selectedCardId);

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCard.name || !newCard.limit) return;

        onAddCard({
            id: Date.now().toString(),
            name: newCard.name,
            limit: parseFloat(newCard.limit),
            currentDebt: 0,
            cutoffDay: parseInt(newCard.cutoffDay) || 1,
            paymentDueDay: parseInt(newCard.paymentDueDay) || 10,
            color: newCard.color,
            icon: newCard.icon
        });

        setIsAdding(false);
        setNewCard({
            name: '',
            limit: '',
            cutoffDay: '',
            paymentDueDay: '',
            color: 'from-slate-700 to-slate-900',
            icon: '💳'
        });
    };

    if (selectedCard) {
        return (
            <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div
                    className={`p-6 text-white ${selectedCard.color.startsWith('#') ? '' : `bg-gradient-to-br ${selectedCard.color}`} shadow-lg relative`}
                    style={selectedCard.color.startsWith('#') ? { backgroundColor: selectedCard.color } : {}}
                >
                    <button
                        onClick={() => setSelectedCardId(null)}
                        className="absolute top-6 right-6 p-2 bg-white/20 rounded-xl backdrop-blur-md active:scale-90 transition-all flex items-center gap-1.5 px-3 text-[10px] font-black uppercase tracking-widest border border-white/10"
                    >
                        <X className="w-4 h-4" />
                        Geri
                    </button>

                    <div className="pt-4">
                        <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">{selectedCard.icon} Kredi Kartı Detayı</p>
                        <h2 className="text-2xl font-black">{selectedCard.name}</h2>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                                <p className="text-[8px] font-bold opacity-70 uppercase tracking-widest mb-1">Güncel Borç</p>
                                <p className="text-lg font-black">{formatCurrency(selectedCard.currentDebt)}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                                <p className="text-[8px] font-bold opacity-70 uppercase tracking-widest mb-1">Kalan Limit</p>
                                <p className="text-lg font-black">{formatCurrency(selectedCard.limit - selectedCard.currentDebt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="flex-1 overflow-y-auto p-5 pb-24">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Harcanan İşlemler</h3>
                        <span className="text-[10px] font-black py-1 px-2.5 bg-slate-100 rounded-full text-slate-500 uppercase">{cardTransactions.length} Kayıt</span>
                    </div>

                    <div className="space-y-3">
                        {cardTransactions.length === 0 ? (
                            <div className="text-center py-20 opacity-30">
                                <CardIcon className="w-12 h-12 mx-auto mb-3" />
                                <p className="text-xs font-bold uppercase tracking-widest">İşlem Bulunamadı</p>
                            </div>
                        ) : (
                            cardTransactions.map(t => (
                                <div key={t.id} className="bg-white p-4 rounded-[1.25rem] border border-slate-100 shadow-sm flex items-center justify-between group active:scale-98 transition-all">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500 shrink-0">
                                            <CardIcon className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-slate-900 text-xs truncate leading-tight mb-0.5">{t.title}</h4>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{t.category} • {new Date(t.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</p>
                                        </div>
                                    </div>
                                    <div className="text-right ml-2 shrink-0">
                                        <p className="font-black text-xs text-rose-500 leading-none mb-1">-{formatCurrency(t.amount)}</p>
                                        {t.installment && (
                                            <span className="text-[8px] font-black text-slate-400 uppercase bg-slate-50 px-1 rounded-sm">Taksit {t.installment.current}/{t.installment.total}</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-5 py-4 space-y-6">

            {/* Header / Add Button */}
            {!isAdding ? (
                <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h2 className="text-xl font-black mb-1">Kartlarım</h2>
                                <p className="text-[10px] opacity-70 font-medium">Toplam Limit: {formatCurrency(cards.reduce((acc, c) => acc + c.limit, 0))}</p>
                            </div>
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <CardIcon className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <button
                            onClick={() => setIsAdding(true)}
                            className="mt-4 w-full py-3 bg-white text-indigo-900 font-black rounded-xl text-xs active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            YENİ KART EKLE
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 animate-in slide-in-from-top duration-300">
                    <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                        <Plus className="w-4 h-4 text-violet-600" />
                        Yeni Kart Bilgileri
                    </h3>

                    <form onSubmit={handleAddSubmit} className="space-y-4">
                        <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Kart Adı</label>
                            <input
                                type="text"
                                placeholder="Örn: Bonus"
                                className="w-full p-3 bg-slate-50 rounded-xl text-xs font-bold border border-slate-100 focus:outline-none focus:border-violet-300 transition-colors"
                                value={newCard.name}
                                onChange={e => setNewCard({ ...newCard, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Limit</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full p-3 bg-slate-50 rounded-xl text-xs font-bold border border-slate-100 focus:outline-none focus:border-violet-300 transition-colors"
                                value={newCard.limit}
                                onChange={e => setNewCard({ ...newCard, limit: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Hesap Kesim</label>
                                <input
                                    type="number"
                                    placeholder="Gün (1-31)"
                                    min="1" max="31"
                                    className="w-full p-3 bg-slate-50 rounded-xl text-xs font-bold border border-slate-100 focus:outline-none focus:border-violet-300 transition-colors"
                                    value={newCard.cutoffDay}
                                    onChange={e => setNewCard({ ...newCard, cutoffDay: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Son Ödeme</label>
                                <input
                                    type="number"
                                    placeholder="Gün (1-31)"
                                    min="1" max="31"
                                    className="w-full p-3 bg-slate-50 rounded-xl text-xs font-bold border border-slate-100 focus:outline-none focus:border-violet-300 transition-colors"
                                    value={newCard.paymentDueDay}
                                    onChange={e => setNewCard({ ...newCard, paymentDueDay: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Kart Rengi</label>
                            <div className="flex gap-2 mt-1 overflow-x-auto pb-2 scrollbar-hide">
                                {['from-slate-700 to-slate-900', 'from-blue-600 to-blue-800', 'from-emerald-600 to-teal-700', 'from-rose-500 to-pink-600', 'from-amber-500 to-orange-600', 'from-violet-600 to-purple-700'].map(c => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setNewCard({ ...newCard, color: c })}
                                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${c} flex-shrink-0 ring-2 ring-offset-2 ${newCard.color === c ? 'ring-slate-900 scale-110' : 'ring-transparent opacity-70 hover:opacity-100'} transition-all`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-500 font-bold rounded-xl text-xs"
                            >
                                İPTAL
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl text-xs"
                            >
                                KAYDET
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Cards List */}
            <div className="space-y-4 pb-20">
                {cards.length === 0 && !isAdding && (
                    <div className="text-center py-10 opacity-50">
                        <CardIcon className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                        <p className="text-xs font-bold text-slate-400">Henüz kart eklenmemiş.</p>
                    </div>
                )}

                {cards.map(card => {
                    // Calculate used percentage
                    const usedPercent = Math.min((card.currentDebt / card.limit) * 100, 100);

                    return (
                        <div
                            key={card.id}
                            onClick={() => setSelectedCardId(card.id)}
                            className={`group relative h-48 rounded-[1.5rem] ${card.color.startsWith('#') ? '' : `bg-gradient-to-br ${card.color}`} p-6 text-white shadow-lg overflow-hidden transition-transform active:scale-[0.98] cursor-pointer`}
                            style={card.color.startsWith('#') ? { backgroundColor: card.color } : {}}
                        >
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-0.5">{card.icon === '💳' ? 'Kredi Kartı' : card.icon}</p>
                                        <h3 className="text-lg font-black tracking-wide">{card.name}</h3>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                                        <CardIcon className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Numbers */}
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest mb-0.5">Güncel Borç</p>
                                            <p className="text-xl font-bold font-mono">{formatCurrency(card.currentDebt)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest mb-0.5">Limit</p>
                                            <p className="text-sm font-bold opacity-90">{formatCurrency(card.limit)}</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div>
                                        <div className="flex justify-between text-[8px] font-bold opacity-70 mb-1">
                                            <span>Kullanım</span>
                                            <span>%{Math.round(usedPercent)}</span>
                                        </div>
                                        <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white/90 rounded-full transition-all duration-1000"
                                                style={{ width: `${usedPercent}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Dates Badges */}
                                    <div className="flex gap-2 mt-1">
                                        <div className="bg-black/20 px-2 py-0.5 rounded text-[8px] font-bold flex items-center gap-1">
                                            <Calendar className="w-2.5 h-2.5" />
                                            Kesim: {card.cutoffDay}
                                        </div>
                                        <div className="bg-black/20 px-2 py-0.5 rounded text-[8px] font-bold flex items-center gap-1">
                                            <ShieldCheck className="w-2.5 h-2.5" />
                                            Son Ödeme: {card.paymentDueDay}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); onDeleteCard(card.id); }}
                                className="absolute top-4 right-4 bg-white/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity active:bg-rose-500 active:text-white"
                            >
                                <Trash2 className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

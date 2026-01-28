import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, ArrowUpRight } from 'lucide-react';
import { SummaryStats, TimelineItem, Transaction } from '../types';
import { KaydirilebilirIslem } from '../components/KaydirilebilirIslem';

interface OzetProps {
    stats: SummaryStats;
    timelineItems: TimelineItem[];
    currentDate: Date;
    changeMonth: (direction: 'prev' | 'next') => void;
    filter: 'all' | 'income' | 'expense';
    setFilter: (filter: 'all' | 'income' | 'expense') => void;
    setConfirmDeleteId: (id: string) => void;
    onToggleStatus: (id: string) => void;
    formatCurrency: (amount: number) => string;
    formatDateTitle: (date: string) => string;
    formatMonthYear: (date: Date) => string;
    goToAnalysis: () => void;
    transactions: import('../types').Transaction[];
}

export const Ozet: React.FC<OzetProps> = ({
    stats,
    timelineItems,
    currentDate,
    changeMonth,
    filter,
    setFilter,
    setConfirmDeleteId,
    onToggleStatus,
    formatCurrency,
    formatDateTitle,
    formatMonthYear,
    goToAnalysis,
    transactions = [] // Pass all transactions to filter for card events
}) => {
    const [balanceView, setBalanceView] = React.useState<'current' | 'projected'>('current');
    const [expandedEventId, setExpandedEventId] = React.useState<string | null>(null);

    const displayedBalance = balanceView === 'current' ? stats.totalBalance : stats.projectedBalance || stats.totalBalance;
    const balanceLabel = balanceView === 'current' ? 'GÜNCEL VARLIK' : 'ÖNGÖRÜLEN VARLIK';

    const getCardTransactions = (cardId: string) => {
        // Simple logic for now: all transactions for this card
        return (transactions as Transaction[]).filter((t: Transaction) => t.creditCardId === cardId);
    };

    return (
        <div className="p-4 space-y-6">
            {/* Balance Card */}
            {/* Balance Card */}
            {/* Balance Card */}
            <div className="bg-slate-900 rounded-[2rem] p-5 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 flex gap-4">

                    {/* Left Column (50%) - Total Balance */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide opacity-80">{balanceLabel}</p>
                            <button
                                onClick={() => setBalanceView(prev => prev === 'current' ? 'projected' : 'current')}
                                className="bg-white/10 p-1 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat"><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></svg>
                            </button>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight truncate">{formatCurrency(displayedBalance)}</h2>
                    </div>

                    {/* Right Column (50%) - Analysis & Breakdown */}
                    <div className="flex-1 flex flex-col justify-between gap-3">
                        {/* Analysis Button - Top Right */}
                        <div className="self-end">
                            <button
                                onClick={goToAnalysis}
                                className="px-4 py-2 bg-white text-slate-900 font-bold rounded-lg text-[10px] active:scale-95 transition-all flex items-center gap-1.5 shadow-lg hover:bg-slate-50"
                            >
                                <span>Analiz</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Income/Expense - Bottom Row (Side by Side) */}
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-white/5 rounded-xl p-2 border border-white/10 backdrop-blur-sm min-w-0">
                                <p className="text-[7px] text-emerald-400 font-bold mb-0.5 uppercase tracking-tighter truncate">Ay Geliri</p>
                                <p className="text-[10px] sm:text-xs font-bold truncate">{formatCurrency(stats.monthlyIncome)}</p>
                            </div>
                            <div className="flex-1 bg-white/5 rounded-xl p-2 border border-white/10 backdrop-blur-sm min-w-0">
                                <p className="text-[7px] text-rose-400 font-bold mb-0.5 uppercase tracking-tighter truncate">Ay Gideri</p>
                                <p className="text-[10px] sm:text-xs font-bold truncate">{formatCurrency(stats.monthlyExpense)}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* MONTH NAVIGATION & FILTER */}
            <div className="flex flex-col gap-3">
                {/* Month Selector */}
                <div className="flex items-center justify-between bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                    <button
                        onClick={() => changeMonth('prev')}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-black text-slate-800 tracking-widest min-w-[100px] text-center">
                        {formatMonthYear(currentDate)}
                    </span>
                    <button
                        onClick={() => changeMonth('next')}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter Pills */}
                <div className="bg-slate-200/50 rounded-xl p-0.5 flex">
                    {(['all', 'income', 'expense'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`flex-1 py-1.5 rounded-lg text-[8px] font-black transition-all ${filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {f === 'all' ? 'TÜMÜ' : f === 'income' ? 'GELİR' : 'GİDER'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline List */}
            {/* Vertical Line Container */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 -z-10"></div>

                {timelineItems.length === 0 && (
                    <div className="text-center py-12 opacity-40">
                        <CalendarDays className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-none text-slate-400">Bu ayda işlem yok</p>
                    </div>
                )}

                {timelineItems.map((item, index) => {
                    if (item.type === 'summary') {
                        return (
                            <div key={`sum-${index}`} className="flex flex-col items-center my-2 relative z-10 w-12 left-0">
                                <div className="flex flex-col gap-0.5 items-center w-full">
                                    {/* Cap at 5 dots to avoid UI clutter, or just show all if small number */}
                                    {[...Array(Math.min(item.count, 7))].map((_, i) => (
                                        <div key={i} className="w-1 h-1 bg-slate-200 rounded-full" />
                                    ))}
                                    {item.count > 7 && (
                                        <div className="text-[6px] font-bold text-slate-300">+{item.count - 7}</div>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    if (item.type === 'event') {
                        const isExpanded = expandedEventId === `${item.cardId}-${item.eventType}-${index}`;
                        const cardTransactions = getCardTransactions(item.cardId);

                        if (item.eventType === 'payment') {
                            const virtualTx: Transaction = {
                                id: `v-pay-${item.cardId}-${index}`,
                                title: `${item.cardName} Ödemesi`,
                                amount: item.amount || 0,
                                type: 'expense',
                                category: 'Kredi Kartı',
                                date: item.date,
                                status: 'pending',
                                paymentMethod: 'cash'
                            };

                            return (
                                <div key={virtualTx.id} className="flex flex-col mb-4 relative z-10 pl-12 pr-4">
                                    <div className={`absolute left-[18px] top-6 -translate-y-1/2 w-3 h-3 rounded-full border-[2px] border-white z-10 shadow-sm bg-slate-900`}></div>
                                    <KaydirilebilirIslem
                                        transaction={virtualTx}
                                        onDelete={() => { }} // No delete
                                        isDeletable={false}
                                        formatCurrency={formatCurrency}
                                        onClick={() => setExpandedEventId(isExpanded ? null : `${item.cardId}-${item.eventType}-${index}`)}
                                        onToggleStatus={(id) => onToggleStatus(id)}
                                    />

                                    {isExpanded && (
                                        <div className="mt-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm animate-in zoom-in-95 fade-in duration-200 origin-top">
                                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-50">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bağlı Harcamalar</span>
                                                <span className="text-[9px] font-black text-slate-900">{cardTransactions.length} Adet</span>
                                            </div>
                                            {cardTransactions.length === 0 ? (
                                                <p className="text-[10px] text-center py-2 text-slate-400 font-medium">İşlem bulunamadı.</p>
                                            ) : (
                                                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                                    {(cardTransactions as Transaction[]).map((ctx: Transaction) => (
                                                        <div key={ctx.id} className="flex items-center justify-between group">
                                                            <div className="min-w-0">
                                                                <p className="text-[10px] font-bold text-slate-800 truncate leading-none mb-1">{ctx.title}</p>
                                                                <p className="text-[8px] font-medium text-slate-400 leading-none">
                                                                    {new Date(ctx.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                                                </p>
                                                            </div>
                                                            <span className="text-[10px] font-black text-rose-500">-{formatCurrency(ctx.amount)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // For Cutoff Events, keep the badge-like view but slightly refined
                        return (
                            <div key={`${item.cardId}-${item.eventType}-${index}`} className="flex flex-col mb-4 relative z-10">
                                <div className="flex items-center pl-12">
                                    <div className={`absolute left-[18px] top-4 -translate-y-1/2 w-3 h-3 rounded-full border-[2px] border-white z-10 shadow-sm bg-slate-900`}></div>
                                    <div
                                        onClick={() => setExpandedEventId(isExpanded ? null : `${item.cardId}-${item.eventType}-${index}`)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all active:scale-95 cursor-pointer hover:shadow-md bg-slate-50 border-slate-200 text-slate-600`}
                                    >
                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${item.color}`}></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                                            {item.cardName} KESİM GÜNÜ
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="ml-12 mr-4 mt-2 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm animate-in zoom-in-95 fade-in duration-200 origin-top">
                                        {/* ... card transactions list ... */}
                                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-50">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bağlı Harcamalar</span>
                                            <span className="text-[9px] font-black text-slate-900">{cardTransactions.length} Adet</span>
                                        </div>
                                        {cardTransactions.length === 0 ? (
                                            <p className="text-[10px] text-center py-2 text-slate-400 font-medium">İşlem bulunamadı.</p>
                                        ) : (
                                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                                {(cardTransactions as Transaction[]).map((ctx: Transaction) => (
                                                    <div key={ctx.id} className="flex items-center justify-between group">
                                                        <div className="min-w-0">
                                                            <p className="text-[10px] font-bold text-slate-800 truncate leading-none mb-1">{ctx.title}</p>
                                                            <p className="text-[8px] font-medium text-slate-400 leading-none">
                                                                {new Date(ctx.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                                            </p>
                                                        </div>
                                                        <span className="text-[10px] font-black text-rose-500">-{formatCurrency(ctx.amount)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return item.type === 'empty' ? (
                        <div key={item.date} className="flex items-center mb-4 h-4 relative z-10">
                            {new Date(item.date).toDateString() === new Date().toDateString() ? (
                                <>
                                    <div className="absolute left-[19px] w-2.5 h-2.5 rounded-full bg-slate-900 z-10 border border-white shadow-[0_0_10px_rgba(15,23,42,0.3)] animate-pulse"></div>
                                    <span className="ml-12 text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        {new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                        <span className="bg-slate-900 text-white text-[7px] px-1.5 py-0.5 rounded-full">BUGÜN</span>
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="absolute left-[21px] w-1.5 h-1.5 rounded-full bg-slate-300 z-10 border border-slate-50"></div>
                                    <span className="ml-12 text-[8px] font-bold text-slate-300 uppercase tracking-tight opacity-60">
                                        {formatDateTitle(item.date).toUpperCase()}
                                    </span>
                                </>
                            )}
                        </div>
                    ) : (
                        <div key={item.date} className="mb-2 relative z-10">
                            {/* Date Header for days with transactions */}
                            <div className="flex items-center mb-2 h-4 relative z-10">
                                {new Date(item.date).toDateString() === new Date().toDateString() ? (
                                    <>
                                        <div className="absolute left-[19px] w-2.5 h-2.5 rounded-full bg-slate-900 z-10 border border-white shadow-[0_0_10px_rgba(15,23,42,0.3)] animate-pulse"></div>
                                        <span className="ml-12 text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                            {new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                            <span className="bg-slate-900 text-white text-[7px] px-1.5 py-0.5 rounded-full">BUGÜN</span>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute left-[21px] w-1.5 h-1.5 rounded-full bg-slate-300 z-10 border border-slate-50"></div>
                                        <span className="ml-12 text-[8px] font-bold text-slate-300 uppercase tracking-tight opacity-60">
                                            {formatDateTitle(item.date).toUpperCase()}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="space-y-3">
                                {item.transactions?.map((t) => (
                                    <div key={t.id} className="relative pl-12 pr-4">
                                        <div className={`absolute left-[18px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-[2px] border-white z-10 shadow-sm ${t.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'
                                            }`}></div>
                                        <KaydirilebilirIslem
                                            transaction={t}
                                            onDelete={(id) => setConfirmDeleteId(id)}
                                            onToggleStatus={onToggleStatus}
                                            formatCurrency={formatCurrency}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

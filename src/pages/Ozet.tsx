import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { SummaryStats, TimelineItem } from '../types';
import { KaydirilebilirIslem } from '../components/KaydirilebilirIslem';

interface OzetProps {
    stats: SummaryStats;
    timelineItems: TimelineItem[];
    currentDate: Date;
    changeMonth: (direction: 'prev' | 'next') => void;
    filter: 'all' | 'income' | 'expense';
    setFilter: (filter: 'all' | 'income' | 'expense') => void;
    setConfirmDeleteId: (id: string) => void;
    formatCurrency: (amount: number) => string;
    formatDateTitle: (date: string) => string;
    formatMonthYear: (date: Date) => string;
}

export const Ozet: React.FC<OzetProps> = ({
    stats,
    timelineItems,
    currentDate,
    changeMonth,
    filter,
    setFilter,
    setConfirmDeleteId,
    formatCurrency,
    formatDateTitle,
    formatMonthYear
}) => {
    return (
        <div className="p-4 space-y-6">
            {/* Balance Card */}
            <div className="bg-slate-900 rounded-[2rem] p-5 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide mb-1 opacity-80">Toplam Varlık</p>
                    <h2 className="text-3xl font-black mb-5 tracking-tight">{formatCurrency(stats.totalBalance)}</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 backdrop-blur-sm">
                            <p className="text-[8px] text-emerald-400 font-bold mb-0.5 uppercase tracking-tighter">Ay Geliri</p>
                            <p className="text-sm font-bold truncate">{formatCurrency(stats.monthlyIncome)}</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 backdrop-blur-sm">
                            <p className="text-[8px] text-rose-400 font-bold mb-0.5 uppercase tracking-tighter">Ay Gideri</p>
                            <p className="text-sm font-bold truncate">{formatCurrency(stats.monthlyExpense)}</p>
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
            <div className="relative pl-4 pr-1">
                {/* Vertical Line */}
                <div className="absolute left-[20px] top-2 bottom-0 w-0.5 bg-slate-200/60 -z-0"></div>

                {timelineItems.length === 0 && (
                    <div className="text-center py-12 opacity-40">
                        <CalendarDays className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-none text-slate-400">Bu ayda işlem yok</p>
                    </div>
                )}

                {timelineItems.map((item, index) => {
                    if (item.type === 'summary') {
                        return (
                            <div key={`sum-${index}`} className="flex flex-col items-start my-3 relative py-0.5 z-10">
                                <div className="ml-10 py-1.5 px-3 bg-slate-100 border border-slate-200 rounded-full text-[7px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                                    {item.count} GÜN BOŞ GEÇTİ
                                </div>
                            </div>
                        );
                    }

                    return item.type === 'empty' ? (
                        <div key={item.date} className="flex items-center mb-3 h-3 relative z-10">
                            <div className="absolute left-[5.5px] w-1.5 h-1.5 rounded-full bg-slate-300 z-10 border border-slate-50 shadow-sm"></div>
                            <span className="ml-8 text-[7px] font-bold text-slate-300 uppercase tracking-tight italic opacity-80">
                                {new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                            </span>
                        </div>
                    ) : (
                        <div key={item.date} className="mb-6 relative z-10">
                            <div className="flex items-center mb-3 relative">
                                <div className={`absolute left-[0px] w-4 h-4 rounded-full border-2 z-10 bg-white shadow-sm ${index === 0 ? 'border-slate-300' : 'border-slate-900 ring-4 ring-slate-50'}`}></div>
                                <span className={`ml-9 text-[10px] font-black uppercase tracking-widest leading-none ${index === 0 ? 'text-slate-400' : 'text-slate-900'}`}>{formatDateTitle(item.date)}</span>
                            </div>

                            <div className="space-y-2.5 pl-8">
                                {item.transactions?.map((t) => (
                                    <KaydirilebilirIslem
                                        key={t.id}
                                        transaction={t}
                                        onDelete={(id) => setConfirmDeleteId(id)}
                                        formatCurrency={formatCurrency}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

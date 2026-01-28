import React, { useState } from 'react';
import { Trophy, Plus, TrendingUp, Sparkles, Wallet, Trash2 } from 'lucide-react';
import { Goal, Budget } from '../types';

interface HedeflerProps {
    goals: Goal[];
    budgets: Budget[];
    openAddMoneyModal: (id: string) => void;
    setIsGoalModalOpen: (open: boolean) => void;
    onOpenAddBudgetModal: () => void;
    onDeleteBudget: (id: string) => void;
    formatCurrency: (amount: number) => string;
}

export const Hedefler: React.FC<HedeflerProps> = ({
    goals,
    budgets,
    openAddMoneyModal,
    setIsGoalModalOpen,
    onOpenAddBudgetModal,
    onDeleteBudget,
    formatCurrency
}) => {
    const [activeTab, setActiveTab] = useState<'goals' | 'budgets'>('goals');

    return (
        <div className="p-4 space-y-6">
            {/* Tab Switcher */}
            <div className="bg-slate-200/50 p-1 rounded-xl flex">
                <button
                    onClick={() => setActiveTab('goals')}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'goals'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    HEDEFLERİM
                </button>
                <button
                    onClick={() => setActiveTab('budgets')}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'budgets'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    BÜTÇE LİMİTLERİ
                </button>
            </div>

            {activeTab === 'goals' ? (
                /* GOALS CONTENT */
                <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Total Progress Card */}
                    <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-90">Toplam İlerleme</p>
                                <Trophy className="w-5 h-5 opacity-80" />
                            </div>
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-black">
                                        {goals.length > 0 ? Math.round((goals.reduce((acc, g) => acc + g.currentAmount, 0) / goals.reduce((acc, g) => acc + g.targetAmount, 0)) * 100) : 0}%
                                    </span>
                                    <span className="text-sm opacity-80">tamamlandı</span>
                                </div>
                                <p className="text-[9px] opacity-75">
                                    {formatCurrency(goals.reduce((acc, g) => acc + g.currentAmount, 0))} / {formatCurrency(goals.reduce((acc, g) => acc + g.targetAmount, 0))}
                                </p>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-500"
                                    style={{ width: `${goals.length > 0 ? (goals.reduce((acc, g) => acc + g.currentAmount, 0) / goals.reduce((acc, g) => acc + g.targetAmount, 0)) * 100 : 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Goals List */}
                    <div className="space-y-4">
                        {goals.length === 0 && (
                            <div className="text-center py-12 opacity-40">
                                <Trophy className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                                <p className="text-[10px] font-bold uppercase tracking-widest leading-none text-slate-400">Henüz hedef yok</p>
                            </div>
                        )}
                        {goals.map((goal) => {
                            const progress = (goal.currentAmount / goal.targetAmount) * 100;
                            const remaining = goal.targetAmount - goal.currentAmount;
                            const deadline = new Date(goal.deadline);
                            const today = new Date();
                            const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                            const isUrgent = daysLeft < 30 && daysLeft > 0;
                            const isOverdue = daysLeft < 0;

                            return (
                                <div key={goal.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-2xl shadow-lg`}>
                                                {goal.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-black text-slate-900 leading-tight mb-0.5">{goal.title}</h3>
                                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{goal.category}</p>
                                            </div>
                                        </div>
                                        <div className={`px-2 py-1 rounded-lg text-[7px] font-black ${isOverdue ? 'bg-rose-50 text-rose-600' :
                                            isUrgent ? 'bg-amber-50 text-amber-600' :
                                                'bg-slate-50 text-slate-600'
                                            }`}>
                                            {isOverdue ? 'GEÇTİ' : `${daysLeft} GÜN`}
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[9px] font-bold text-slate-500">
                                                {formatCurrency(goal.currentAmount)}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-900">
                                                {formatCurrency(goal.targetAmount)}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
                                                style={{ width: `${Math.min(progress, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">İlerleme</p>
                                                <p className="text-sm font-black text-slate-900">{Math.round(progress)}%</p>
                                            </div>
                                            <div>
                                                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Kalan</p>
                                                <p className="text-sm font-black text-rose-600">{formatCurrency(remaining)}</p>
                                            </div>
                                        </div>
                                        {progress >= 100 ? (
                                            <div className="flex items-center gap-1 text-emerald-600">
                                                <Sparkles className="w-4 h-4" />
                                                <span className="text-[8px] font-black uppercase">Tamamlandı!</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => openAddMoneyModal(goal.id)}
                                                className="px-3 py-1.5 bg-slate-900 text-white text-[8px] font-black rounded-lg uppercase tracking-widest active:scale-95 transition-all"
                                            >
                                                Para Ekle
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Add New Goal Button */}
                    <button
                        onClick={() => setIsGoalModalOpen(true)}
                        className="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Yeni Hedef Ekle</span>
                    </button>
                </div>
            ) : (
                /* BUDGETS CONTENT */
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Aktif Bütçeler</h3>
                            <button
                                onClick={onOpenAddBudgetModal}
                                className="bg-slate-900 text-white p-2 rounded-xl active:scale-90 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {budgets.length === 0 ? (
                            <div className="text-center py-12 opacity-40">
                                <Wallet className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                                <p className="text-[10px] font-bold uppercase tracking-widest leading-none text-slate-400">Tanımlı bütçe yok</p>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {budgets.map(budget => (
                                    <div key={budget.id} className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100 group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl shadow-sm">
                                                {budget.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-slate-900">{budget.category}</h4>
                                                <p className="text-[9px] font-bold text-slate-400">Limit: {formatCurrency(budget.limitAmount)}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onDeleteBudget(budget.id)}
                                            className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-[10px] font-bold text-slate-600 leading-relaxed mb-1">
                            "Küçük adımlar büyük değişimler yaratır. Her tasarruf sizi hedefinize bir adım daha yaklaştırır."
                        </p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Motivasyon</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

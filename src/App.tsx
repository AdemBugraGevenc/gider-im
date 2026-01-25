import { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
    LayoutDashboard,
    Target,
    Settings as SettingsIcon,
    Plus,
    ArrowUpCircle,
    Bell
} from 'lucide-react';
import { Transaction, Goal, SummaryStats, TimelineItem, SettingsState } from './types';
import { INITIAL_DATA, INITIAL_GOALS } from './data/mockData';
import { formatCurrency, formatMonthYear, formatDateTitle } from './utils/formatters';
import { Ozet } from './pages/Ozet';
import { Analiz } from './pages/Analiz';
import { Hedefler } from './pages/Hedefler';
import { Settings } from './pages/Settings';
import { IslemEkleModal } from './components/IslemEkleModal';
import { HedefEkleModal } from './components/HedefEkleModal';
import { ParaEkleModal } from './components/ParaEkleModal';
import { OnayModal } from './components/OnayModal';

export default function App() {
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', INITIAL_DATA);
    const [goals, setGoals] = useLocalStorage<Goal[]>('goals', INITIAL_GOALS);
    const [activeTab, setActiveTab] = useState<'home' | 'goals' | 'stats' | 'settings'>('home');
    const [activePage, setActivePage] = useState<'main' | 'help' | 'privacy' | 'terms'>('main');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

    // GOALS STATE
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

    // SETTINGS STATE
    const [settings, setSettings] = useLocalStorage<SettingsState>('settings', {
        profile: {
            name: 'Buğra G.',
            email: 'Bugra@example.com',
            avatar: '👤'
        },
        preferences: {
            currency: 'TRY',
            theme: 'light'
        },
        notifications: {
            email: false,
            budgetAlerts: true,
            goalReminders: true
        }
    });

    // DATE STATE
    const [currentDate, setCurrentDate] = useState(new Date());

    // Apply theme to document
    useMemo(() => {
        if (settings.preferences.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [settings.preferences.theme]);

    // Helper to change months
    const changeMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') newDate.setMonth(prev.getMonth() - 1);
            else newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    };

    // Filter transactions by selected month/year
    const monthlyTransactions = useMemo(() => {
        return transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate.getMonth() === currentDate.getMonth() &&
                tDate.getFullYear() === currentDate.getFullYear();
        });
    }, [transactions, currentDate]);

    const stats: SummaryStats = useMemo(() => {
        // Total Balance (All time)
        const totalBalance = transactions.reduce((acc, curr) => {
            return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
        }, 0);

        // Monthly Stats (Selected Month Only)
        const { monthlyIncome, monthlyExpense } = monthlyTransactions.reduce((acc, curr) => {
            if (curr.type === 'income') {
                acc.monthlyIncome += curr.amount;
            } else {
                acc.monthlyExpense += curr.amount;
            }
            return acc;
        }, { monthlyIncome: 0, monthlyExpense: 0 });

        return { totalBalance, monthlyIncome, monthlyExpense };
    }, [transactions, monthlyTransactions]);

    // Timeline Logic: 1 to 30 sorting + Empty day summaries
    const timelineItems = useMemo<TimelineItem[]>(() => {
        const groups: Record<string, Transaction[]> = {};

        // Filter by type within the selected month
        const filtered = monthlyTransactions.filter(t => filter === 'all' || t.type === filter);

        if (filtered.length === 0) return [];

        filtered.forEach(t => {
            if (!groups[t.date]) groups[t.date] = [];
            groups[t.date].push(t);
        });

        // Sort ESC (1st to 30th)
        const sortedDates = Object.keys(groups).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        const items: TimelineItem[] = [];

        for (let i = 0; i < sortedDates.length; i++) {
            const currentDateStr = sortedDates[i];
            items.push({ type: 'data', date: currentDateStr, transactions: groups[currentDateStr] });

            if (i < sortedDates.length - 1) {
                const nextDate = sortedDates[i + 1];
                const currentObj = new Date(currentDateStr);
                const nextObj = new Date(nextDate);

                if (isNaN(currentObj.getTime()) || isNaN(nextObj.getTime())) continue;

                const diffTime = Math.abs(nextObj.getTime() - currentObj.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

                if (diffDays >= 4) {
                    const firstEmpty = new Date(currentObj);
                    firstEmpty.setDate(firstEmpty.getDate() + 1);
                    items.push({ type: 'empty', date: firstEmpty.toISOString().split('T')[0] });
                    items.push({ type: 'summary', count: diffDays - 2 });
                    const lastEmpty = new Date(currentObj);
                    lastEmpty.setDate(lastEmpty.getDate() + diffDays);
                    items.push({ type: 'empty', date: lastEmpty.toISOString().split('T')[0] });
                } else if (diffDays > 0) {
                    for (let j = 1; j <= diffDays; j++) {
                        const emptyDate = new Date(currentObj);
                        emptyDate.setDate(emptyDate.getDate() + j);
                        try {
                            items.push({ type: 'empty', date: emptyDate.toISOString().split('T')[0] });
                        } catch { continue; }
                    }
                }
            }
        }
        return items;
    }, [monthlyTransactions, filter]);

    const handleAddTransaction = (newTransaction: Transaction) => {
        setTransactions(prev => [...prev, newTransaction]);
        setIsModalOpen(false);
    };

    const handleFinalDelete = () => {
        if (confirmDeleteId) {
            setTransactions(prev => prev.filter(t => t.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        }
    };

    // GOAL HANDLERS
    const handleAddGoal = (newGoal: Goal) => {
        setGoals(prev => [...prev, newGoal]);
        setIsGoalModalOpen(false);
    };

    const handleAddMoney = (amount: number) => {
        if (!selectedGoalId) return;

        setGoals(prev => prev.map(goal =>
            goal.id === selectedGoalId
                ? { ...goal, currentAmount: goal.currentAmount + amount }
                : goal
        ));

        setIsAddMoneyModalOpen(false);
        setSelectedGoalId(null);
    };

    const openAddMoneyModal = (goalId: string) => {
        setSelectedGoalId(goalId);
        setIsAddMoneyModalOpen(true);
    };

    // Wrapper for format currency to pass settings
    const formatCurrencyWithSettings = (amount: number) => {
        return formatCurrency(amount, settings.preferences.currency);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans antialiased text-slate-900 overflow-hidden">
            <div className="w-full max-w-[414px] h-screen bg-slate-50 overflow-hidden relative flex flex-col">

                {/* Header */}
                <header className="bg-white/95 backdrop-blur-md px-5 pt-7 pb-2.5 flex items-center justify-between sticky top-0 z-30 border-b border-slate-100 shadow-sm">
                    <div className="flex flex-col">
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-0.5">
                            {activeTab === 'stats' ? 'Analiz' : activeTab === 'goals' ? 'Hedeflerim' : activeTab === 'settings' ? 'Ayarlar' : 'Cüzdanım'}
                        </p>
                        <h1 className="text-sm font-bold text-slate-900 leading-tight">
                            {activeTab === 'stats' ? formatMonthYear(currentDate) : activeTab === 'goals' ? `${goals.length} Hedef` : activeTab === 'settings' ? settings.profile.name : 'Buğra G.'}
                        </h1>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100 relative active:scale-90 transition-transform">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto pb-20 scroll-smooth bg-slate-50">
                    {activeTab === 'stats' ? (
                        <Analiz
                            stats={stats}
                            monthlyTransactions={monthlyTransactions}
                            currentDate={currentDate}
                            changeMonth={changeMonth}
                            formatCurrency={formatCurrencyWithSettings}
                            formatMonthYear={formatMonthYear}
                        />
                    ) : activeTab === 'goals' ? (
                        <Hedefler
                            goals={goals}
                            openAddMoneyModal={openAddMoneyModal}
                            setIsGoalModalOpen={setIsGoalModalOpen}
                            formatCurrency={formatCurrencyWithSettings}
                        />
                    ) : activeTab === 'settings' ? (
                        <Settings
                            settings={settings}
                            setSettings={setSettings}
                            activePage={activePage}
                            setActivePage={setActivePage}
                        />
                    ) : (
                        <Ozet
                            stats={stats}
                            timelineItems={timelineItems}
                            currentDate={currentDate}
                            changeMonth={changeMonth}
                            filter={filter}
                            setFilter={setFilter}
                            setConfirmDeleteId={setConfirmDeleteId}
                            formatCurrency={formatCurrencyWithSettings}
                            formatDateTitle={formatDateTitle}
                            formatMonthYear={formatMonthYear}
                        />
                    )}
                </main>

                {/* Bottom Nav */}
                <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 pt-3 pb-5 flex justify-between items-center z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">
                    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-slate-900 scale-105' : 'text-slate-300 hover:text-slate-400'}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-[7px] font-black uppercase tracking-widest">Özet</span>
                    </button>
                    <button onClick={() => setActiveTab('goals')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'goals' ? 'text-slate-900 scale-105' : 'text-slate-300 hover:text-slate-400'}`}>
                        <Target className="w-5 h-5" />
                        <span className="text-[7px] font-black uppercase tracking-widest">Hedefler</span>
                    </button>

                    <div className="-mt-12">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(0,0,0,0.25)] active:scale-90 transition-all border-[4px] border-slate-50"
                        >
                            <Plus className="w-6 h-6" />
                        </button>
                    </div>

                    <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'stats' ? 'text-slate-900 scale-105' : 'text-slate-300 hover:text-slate-400'}`}>
                        <ArrowUpCircle className="w-5 h-5" />
                        <span className="text-[7px] font-black uppercase tracking-widest">Analiz</span>
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'settings' ? 'text-slate-900 scale-105' : 'text-slate-300 hover:text-slate-400'}`}>
                        <SettingsIcon className="w-5 h-5" />
                        <span className="text-[7px] font-black uppercase tracking-widest">Ayar</span>
                    </button>
                </nav>

                {/* Modals */}
                <IslemEkleModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddTransaction}
                />

                <HedefEkleModal
                    isOpen={isGoalModalOpen}
                    onClose={() => setIsGoalModalOpen(false)}
                    onAdd={handleAddGoal}
                />

                <ParaEkleModal
                    isOpen={isAddMoneyModalOpen}
                    onClose={() => setIsAddMoneyModalOpen(false)}
                    onAdd={handleAddMoney}
                    goal={goals.find(g => g.id === selectedGoalId)}
                    formatCurrency={formatCurrencyWithSettings}
                />

                <OnayModal
                    isOpen={!!confirmDeleteId}
                    onClose={() => setConfirmDeleteId(null)}
                    onConfirm={handleFinalDelete}
                />
            </div>
        </div>
    );
}

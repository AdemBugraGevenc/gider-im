import { useState, useMemo } from 'react';
import {
    LayoutDashboard,
    Target,
    Settings,
    Plus,
    ArrowUpCircle,
    ArrowDownCircle,
    Bell,
    X,
    CalendarDays,
    Trash2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    PiggyBank,
    Sparkles,
    Trophy,
    User,
    Download,
    Trash,
    HelpCircle,
    Moon,
    Sun
} from 'lucide-react';

/**
 * TYPE DEFINITIONS
 */
type TransactionType = 'income' | 'expense';

interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
    status: 'completed' | 'pending';
}

interface SummaryStats {
    monthlyIncome: number;
    monthlyExpense: number;
    totalBalance: number;
}

type TimelineItem =
    | { type: 'data'; date: string; transactions: Transaction[] }
    | { type: 'empty'; date: string }
    | { type: 'summary'; count: number };

interface Goal {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    category: string;
    deadline: string;
    icon: string;
    color: string;
}

/**
 * MOCK DATA
 * Current Date assumed: Jan 2026
 */
const INITIAL_DATA: Transaction[] = [
    // ARALIK 2025 (1 Ay Önce)
    { id: 'prev1', title: 'Yıl Sonu Primi', amount: 25000, type: 'income', category: 'Maaş', date: '2025-12-28', status: 'completed' },
    { id: 'prev2', title: 'Kış Tatili', amount: 12000, type: 'expense', category: 'Eğlence', date: '2025-12-15', status: 'completed' },
    { id: 'prev3', title: 'Doğalgaz', amount: 1500, type: 'expense', category: 'Fatura', date: '2025-12-10', status: 'completed' },

    // OCAK 2026 (Şu An)
    { id: 'curr1', title: 'Freelance Proje', amount: 18500, type: 'income', category: 'Hizmet', date: '2026-01-05', status: 'completed' },
    { id: 'curr2', title: 'Market Alışverişi', amount: 3200, type: 'expense', category: 'Gıda', date: '2026-01-12', status: 'completed' },
    { id: 'curr3', title: 'Sunucu Yenileme', amount: 2400, type: 'expense', category: 'Altyapı', date: '2026-01-15', status: 'completed' },
    { id: 'curr4', title: 'Yatırım Getirisi', amount: 4500, type: 'income', category: 'Yatırım', date: '2026-01-16', status: 'completed' },

    // ŞUBAT 2026 (1 Ay Sonra)
    { id: 'next1', title: 'Ev Kirası', amount: 15000, type: 'expense', category: 'Kira', date: '2026-02-01', status: 'pending' },
    { id: 'next2', title: 'Maaş', amount: 45000, type: 'income', category: 'Maaş', date: '2026-02-05', status: 'pending' },
];

const INITIAL_GOALS: Goal[] = [
    { id: 'goal1', title: 'Yaz Tatili', targetAmount: 30000, currentAmount: 18500, category: 'Tatil', deadline: '2026-06-01', icon: '🏖️', color: 'from-cyan-500 to-blue-600' },
    { id: 'goal2', title: 'Acil Fon', targetAmount: 50000, currentAmount: 32000, category: 'Tasarruf', deadline: '2026-12-31', icon: '🛡️', color: 'from-emerald-500 to-teal-600' },
    { id: 'goal3', title: 'Yeni Laptop', targetAmount: 45000, currentAmount: 12000, category: 'Teknoloji', deadline: '2026-04-15', icon: '💻', color: 'from-violet-500 to-purple-600' },
    { id: 'goal4', title: 'Araba Peşinatı', targetAmount: 100000, currentAmount: 25000, category: 'Ulaşım', deadline: '2026-09-01', icon: '🚗', color: 'from-orange-500 to-red-600' },
];

/**
 * SWIPEABLE COMPONENT
 */
const SwipeableTransaction = ({
    transaction,
    onDelete,
    formatCurrency
}: {
    transaction: Transaction;
    onDelete: (id: string) => void;
    formatCurrency: (amount: number) => string;
}) => {
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const threshold = -80;

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const diff = e.touches[0].clientX - startX;
        if (diff < 0) {
            setCurrentX(Math.max(diff, -100));
        } else {
            setCurrentX(0);
        }
    };

    const handleTouchEnd = () => {
        if (currentX < threshold) {
            setCurrentX(-80);
        } else {
            setCurrentX(0);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-rose-500">
            {/* Background (Delete Action) */}
            <div
                className="absolute inset-0 flex items-center justify-end px-6 text-white cursor-pointer"
                onClick={() => onDelete(transaction.id)}
            >
                <Trash2 className="w-5 h-5" />
            </div>

            {/* Foreground (Card Content) */}
            <div
                className="relative bg-white p-3.5 flex items-center justify-between transition-transform duration-200 ease-out border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]"
                style={{ transform: `translateX(${currentX}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 min-w-[2.25rem] rounded-xl flex items-center justify-center shadow-sm ${transaction.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                        {transaction.type === 'income' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0 flex flex-col">
                        <h4 className="font-bold text-slate-900 text-xs truncate leading-tight mb-0.5">{transaction.title}</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate opacity-80 leading-none">{transaction.category}</p>
                    </div>
                </div>
                <div className="text-right flex flex-col items-end min-w-fit pl-2">
                    <p className={`font-black text-xs whitespace-nowrap leading-none ${transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                </div>
            </div>
        </div>
    );
};

/**
 * MAIN APP COMPONENT
 */
export default function App() {
    const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);
    const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
    const [activeTab, setActiveTab] = useState<'home' | 'goals' | 'stats' | 'settings'>('home');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

    // GOALS STATE
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
    const [goalFormData, setGoalFormData] = useState({
        title: '',
        targetAmount: '',
        category: '',
        deadline: '',
        icon: '🎯',
        color: 'from-violet-500 to-purple-600'
    });
    const [addMoneyAmount, setAddMoneyAmount] = useState('');

    // SETTINGS STATE
    const [settings, setSettings] = useState({
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

    const [formData, setFormData] = useState({ title: '', amount: '', type: 'expense', category: '' });

    const handleAddTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.amount) return;
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            title: formData.title,
            amount: parseFloat(formData.amount),
            type: formData.type as TransactionType,
            category: formData.category || 'Genel',
            date: new Date().toISOString().split('T')[0], // Adds to today regardless of view
            status: 'completed'
        };
        setTransactions(prev => [...prev, newTransaction]);
        setIsModalOpen(false);
        setFormData({ title: '', amount: '', type: 'expense', category: '' });
    };

    const handleFinalDelete = () => {
        if (confirmDeleteId) {
            setTransactions(prev => prev.filter(t => t.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        }
    };

    // GOAL HANDLERS
    const handleAddGoal = (e: React.FormEvent) => {
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

        setGoals(prev => [...prev, newGoal]);
        setIsGoalModalOpen(false);
        setGoalFormData({
            title: '',
            targetAmount: '',
            category: '',
            deadline: '',
            icon: '🎯',
            color: 'from-violet-500 to-purple-600'
        });
    };

    const handleAddMoney = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedGoalId || !addMoneyAmount) return;

        const amount = parseFloat(addMoneyAmount);
        setGoals(prev => prev.map(goal =>
            goal.id === selectedGoalId
                ? { ...goal, currentAmount: goal.currentAmount + amount }
                : goal
        ));

        setIsAddMoneyModalOpen(false);
        setSelectedGoalId(null);
        setAddMoneyAmount('');
    };

    const openAddMoneyModal = (goalId: string) => {
        setSelectedGoalId(goalId);
        setIsAddMoneyModalOpen(true);
    };

    const formatCurrency = (amount: number) => {
        const currencyMap: Record<string, string> = {
            'TRY': 'tr-TR',
            'USD': 'en-US',
            'EUR': 'de-DE'
        };
        const locale = currencyMap[settings.preferences.currency] || 'tr-TR';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: settings.preferences.currency,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDateTitle = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === today.toDateString()) return 'Bugün';
        if (date.toDateString() === yesterday.toDateString()) return 'Dün';
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'short' });
    };

    const formatMonthYear = (date: Date) => {
        return date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }).toUpperCase();
    };

    // Category-based statistics
    const categoryStats = useMemo(() => {
        const categories: Record<string, { income: number; expense: number; count: number }> = {};

        monthlyTransactions.forEach(t => {
            if (!categories[t.category]) {
                categories[t.category] = { income: 0, expense: 0, count: 0 };
            }
            if (t.type === 'income') {
                categories[t.category].income += t.amount;
            } else {
                categories[t.category].expense += t.amount;
            }
            categories[t.category].count++;
        });

        return Object.entries(categories)
            .map(([name, data]) => ({
                name,
                total: data.income + data.expense,
                income: data.income,
                expense: data.expense,
                count: data.count
            }))
            .sort((a, b) => b.total - a.total);
    }, [monthlyTransactions]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans antialiased text-slate-900 overflow-hidden">
            <div className="w-full max-w-[414px] h-screen bg-slate-50 overflow-hidden relative flex flex-col">

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
                        /* ANALYTICS PAGE */
                        <div className="p-4 space-y-6">
                            {/* Month Navigation */}
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

                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
                                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-80 mb-1">Toplam Gelir</p>
                                    <p className="text-xl font-black tracking-tight">{formatCurrency(stats.monthlyIncome)}</p>
                                    <div className="mt-2 flex items-center gap-1">
                                        <ArrowUpCircle className="w-3 h-3" />
                                        <span className="text-[9px] font-bold opacity-90">
                                            {monthlyTransactions.filter(t => t.type === 'income').length} işlem
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-4 text-white shadow-lg">
                                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-80 mb-1">Toplam Gider</p>
                                    <p className="text-xl font-black tracking-tight">{formatCurrency(stats.monthlyExpense)}</p>
                                    <div className="mt-2 flex items-center gap-1">
                                        <ArrowDownCircle className="w-3 h-3" />
                                        <span className="text-[9px] font-bold opacity-90">
                                            {monthlyTransactions.filter(t => t.type === 'expense').length} işlem
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Net Balance */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Net Bakiye</p>
                                    <div className={`px-2 py-1 rounded-lg text-[8px] font-black ${stats.monthlyIncome - stats.monthlyExpense >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        {stats.monthlyIncome - stats.monthlyExpense >= 0 ? 'FAZLA' : 'EKSİ'}
                                    </div>
                                </div>
                                <p className={`text-2xl font-black ${stats.monthlyIncome - stats.monthlyExpense >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {formatCurrency(Math.abs(stats.monthlyIncome - stats.monthlyExpense))}
                                </p>
                                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                                        style={{ width: `${stats.monthlyIncome + stats.monthlyExpense > 0 ? (stats.monthlyIncome / (stats.monthlyIncome + stats.monthlyExpense)) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <div className="mt-2 flex justify-between text-[8px] font-bold text-slate-400">
                                    <span>Gelir: {stats.monthlyIncome + stats.monthlyExpense > 0 ? Math.round((stats.monthlyIncome / (stats.monthlyIncome + stats.monthlyExpense)) * 100) : 0}%</span>
                                    <span>Gider: {stats.monthlyIncome + stats.monthlyExpense > 0 ? Math.round((stats.monthlyExpense / (stats.monthlyIncome + stats.monthlyExpense)) * 100) : 0}%</span>
                                </div>
                            </div>

                            {/* Category Breakdown */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Kategori Dağılımı</h3>
                                {categoryStats.length === 0 ? (
                                    <div className="text-center py-8 opacity-40">
                                        <CalendarDays className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Bu ayda veri yok</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {categoryStats.map((cat, idx) => {
                                            const maxTotal = categoryStats[0]?.total || 1;
                                            const percentage = (cat.total / maxTotal) * 100;

                                            return (
                                                <div key={cat.name} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-violet-500' : idx === 1 ? 'bg-blue-500' : idx === 2 ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                                                            <span className="text-[10px] font-bold text-slate-900">{cat.name}</span>
                                                        </div>
                                                        <span className="text-[9px] font-black text-slate-600">{formatCurrency(cat.total)}</span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full transition-all duration-500 ${idx === 0 ? 'bg-gradient-to-r from-violet-500 to-violet-600' : idx === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : idx === 2 ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-slate-400'}`}
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <div className="mt-1 flex items-center gap-3 text-[8px] font-bold text-slate-400">
                                                            {cat.income > 0 && <span className="text-emerald-600">+{formatCurrency(cat.income)}</span>}
                                                            {cat.expense > 0 && <span className="text-rose-600">-{formatCurrency(cat.expense)}</span>}
                                                            <span>• {cat.count} işlem</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ortalama</p>
                                    <p className="text-sm font-black text-slate-900">
                                        {monthlyTransactions.length > 0
                                            ? formatCurrency(monthlyTransactions.reduce((acc, t) => acc + t.amount, 0) / monthlyTransactions.length)
                                            : formatCurrency(0)
                                        }
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">En Yüksek</p>
                                    <p className="text-sm font-black text-slate-900">
                                        {monthlyTransactions.length > 0
                                            ? formatCurrency(Math.max(...monthlyTransactions.map(t => t.amount)))
                                            : formatCurrency(0)
                                        }
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">İşlem</p>
                                    <p className="text-sm font-black text-slate-900">{monthlyTransactions.length}</p>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'goals' ? (
                        /* GOALS PAGE */
                        <div className="p-4 space-y-6">
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
                                                {Math.round((goals.reduce((acc, g) => acc + g.currentAmount, 0) / goals.reduce((acc, g) => acc + g.targetAmount, 0)) * 100)}%
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
                                            style={{ width: `${(goals.reduce((acc, g) => acc + g.currentAmount, 0) / goals.reduce((acc, g) => acc + g.targetAmount, 0)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Goals List */}
                            <div className="space-y-4">
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
                    ) : activeTab === 'settings' ? (
                        /* SETTINGS PAGE */
                        <div className="p-4 space-y-4">
                            {/* Profile Section */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                                <div className="relative z-10 flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
                                        {settings.profile.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-black mb-0.5">{settings.profile.name}</h3>
                                        <p className="text-[10px] text-slate-300 font-medium">{settings.profile.email}</p>
                                    </div>
                                    <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* App Preferences */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Uygulama Tercihleri</h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {/* Currency */}
                                    <div className="px-4 py-3.5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                                                <span className="text-sm font-black text-emerald-600">
                                                    {settings.preferences.currency === 'TRY' ? '₺' : settings.preferences.currency === 'USD' ? '$' : '€'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">Para Birimi</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Tüm sistemde geçerli</p>
                                            </div>
                                        </div>
                                        <select
                                            value={settings.preferences.currency}
                                            onChange={(e) => setSettings({ ...settings, preferences: { ...settings.preferences, currency: e.target.value } })}
                                            className="px-3 py-1.5 bg-slate-50 rounded-lg text-[10px] font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        >
                                            <option value="TRY">₺ TRY</option>
                                            <option value="USD">$ USD</option>
                                            <option value="EUR">€ EUR</option>
                                        </select>
                                    </div>

                                    {/* Theme */}
                                    <div className="px-4 py-3.5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                                                {settings.preferences.theme === 'light' ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-amber-600" />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">Tema</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Görünüm modu</p>
                                            </div>
                                        </div>
                                        <select
                                            value={settings.preferences.theme}
                                            onChange={(e) => setSettings({ ...settings, preferences: { ...settings.preferences, theme: e.target.value } })}
                                            className="px-3 py-1.5 bg-slate-50 rounded-lg text-[10px] font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        >
                                            <option value="light">☀️ Açık</option>
                                            <option value="dark">🌙 Koyu</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Bildirimler</h3>
                                </div>
                                <div className="divide-y divide-slate-100">

                                    {/* Email Notifications */}
                                    <div className="px-4 py-3.5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                                <span className="text-sm">📧</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">E-posta Bildirimleri</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Haftalık özet</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, notifications: { ...settings.notifications, email: !settings.notifications.email } })}
                                            className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications.email ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                        >
                                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${settings.notifications.email ? 'left-[26px]' : 'left-0.5'}`}></div>
                                        </button>
                                    </div>

                                    {/* Budget Alerts */}
                                    <div className="px-4 py-3.5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
                                                <AlertCircle className="w-4 h-4 text-rose-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">Bütçe Uyarıları</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Limit aşımı bildirimleri</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, notifications: { ...settings.notifications, budgetAlerts: !settings.notifications.budgetAlerts } })}
                                            className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications.budgetAlerts ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                        >
                                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${settings.notifications.budgetAlerts ? 'left-[26px]' : 'left-0.5'}`}></div>
                                        </button>
                                    </div>

                                    {/* Goal Reminders */}
                                    <div className="px-4 py-3.5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                                                <Target className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">Hedef Hatırlatıcıları</p>
                                                <p className="text-[9px] text-slate-400 font-medium">İlerleme bildirimleri</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, notifications: { ...settings.notifications, goalReminders: !settings.notifications.goalReminders } })}
                                            className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications.goalReminders ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                        >
                                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${settings.notifications.goalReminders ? 'left-[26px]' : 'left-0.5'}`}></div>
                                        </button>
                                    </div>
                                </div>
                            </div>



                            {/* Data Management */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Veri Yönetimi</h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {/* Export Data */}
                                    <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                                <Download className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-slate-900">Verileri Dışa Aktar</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Excel/CSV formatında</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </button>

                                    {/* Clear Cache */}
                                    <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                                                <Trash className="w-4 h-4 text-orange-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-slate-900">Önbelleği Temizle</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Geçici dosyaları sil</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </button>
                                </div>
                            </div>

                            {/* About */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Hakkında</h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {/* Version */}
                                    <div className="px-4 py-3.5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                                                <span className="text-sm">ℹ️</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">Versiyon</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Uygulama sürümü</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">v1.0.0</span>
                                    </div>

                                    {/* Help */}
                                    <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                                                <HelpCircle className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-slate-900">Yardım & Destek</p>
                                                <p className="text-[9px] text-slate-400 font-medium">SSS ve iletişim</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </button>

                                    {/* Privacy Policy */}
                                    <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                                                <span className="text-sm">📄</span>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-slate-900">Gizlilik Politikası</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Veri koruma</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </button>

                                    {/* Terms */}
                                    <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                                                <span className="text-sm">📋</span>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-slate-900">Kullanım Koşulları</p>
                                                <p className="text-[9px] text-slate-400 font-medium">Şartlar ve koşullar</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm border border-rose-100">
                                Çıkış Yap
                            </button>

                            {/* Footer Info */}
                            <div className="text-center py-4">
                                <p className="text-[9px] text-slate-400 font-medium">
                                    Made by Buğra
                                </p>
                                <p className="text-[8px] text-slate-300 font-medium mt-1">
                                    © 2026 HesApp.im Projesi
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* HOME PAGE - TIMELINE */
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
                                                    <SwipeableTransaction
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
                        <Settings className="w-5 h-5" />
                        <span className="text-[7px] font-black uppercase tracking-widest">Ayar</span>
                    </button>
                </nav>

                {/* Action Modal */}
                {isModalOpen && (
                    <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
                        <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
                        <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500">
                            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                            <div className="flex items-center justify-between mb-5 px-1">
                                <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Yeni Kayıt Oluştur</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100"><X className="w-4 h-4" /></button>
                            </div>

                            <form onSubmit={handleAddTransaction} className="space-y-4 pb-4">
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
                )}

                {/* Add Goal Modal */}
                {isGoalModalOpen && (
                    <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
                        <div className="absolute inset-0" onClick={() => setIsGoalModalOpen(false)} />
                        <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
                            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                            <div className="flex items-center justify-between mb-5 px-1">
                                <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Yeni Hedef Oluştur</h2>
                                <button onClick={() => setIsGoalModalOpen(false)} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={handleAddGoal} className="space-y-4 pb-4">
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
                )}

                {/* Add Money Modal */}
                {isAddMoneyModalOpen && selectedGoalId && (
                    <div className="absolute inset-0 z-[100] flex flex-col justify-end bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
                        <div className="absolute inset-0" onClick={() => setIsAddMoneyModalOpen(false)} />
                        <div className="relative bg-white rounded-t-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-500">
                            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
                            <div className="flex items-center justify-between mb-5 px-1">
                                <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Para Ekle</h2>
                                <button onClick={() => setIsAddMoneyModalOpen(false)} className="p-1.5 bg-slate-50 rounded-full text-slate-400 active:bg-slate-100">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={handleAddMoney} className="space-y-4 pb-4">
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 mb-4 border border-emerald-100">
                                    <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Hedef</p>
                                    <p className="text-sm font-black text-slate-900">
                                        {goals.find(g => g.id === selectedGoalId)?.title}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 text-[9px] font-bold text-slate-600">
                                        <span>{formatCurrency(goals.find(g => g.id === selectedGoalId)?.currentAmount || 0)}</span>
                                        <span className="text-slate-400">/</span>
                                        <span>{formatCurrency(goals.find(g => g.id === selectedGoalId)?.targetAmount || 0)}</span>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 ml-1 uppercase tracking-widest leading-none opacity-80">Eklenecek Tutar</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-2xl leading-none">₺</span>
                                        <input
                                            type="number"
                                            required
                                            inputMode="decimal"
                                            placeholder="0.00"
                                            autoFocus
                                            className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-2xl text-3xl font-black focus:outline-none border border-slate-100 shadow-sm"
                                            value={addMoneyAmount}
                                            onChange={(e) => setAddMoneyAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl text-sm shadow-xl active:scale-95 transition-all mt-2 tracking-[0.1em] uppercase shadow-emerald-600/20"
                                >
                                    PARA EKLE
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Confirmation Modal */}
                {confirmDeleteId && (
                    <div className="absolute inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-[6px] p-6 animate-in fade-in duration-300">
                        <div className="bg-white rounded-[2.5rem] p-7 w-full max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-[1.25rem] flex items-center justify-center mb-5 shadow-inner">
                                    <AlertCircle className="w-7 h-7" />
                                </div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Bu İşlem Silinsin Mi?</h3>
                                <p className="text-[10px] font-bold text-slate-400 leading-relaxed mb-7 px-2">Seçili haraketi kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="flex-1 py-4 bg-slate-50 text-slate-400 text-[10px] font-black rounded-xl uppercase tracking-widest active:scale-95 transition-all"
                                    >
                                        İPTAL
                                    </button>
                                    <button
                                        onClick={handleFinalDelete}
                                        className="flex-1 py-4 bg-rose-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-rose-200 active:scale-95 transition-all"
                                    >
                                        EVET, SİL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

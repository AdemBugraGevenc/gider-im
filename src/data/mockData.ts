import { Transaction, Goal, Subscription, Budget } from '../types';

/**
 * MOCK DATA
 * Current Date assumed: Jan 2026
 */
export const INITIAL_DATA: Transaction[] = [
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

export const INITIAL_GOALS: Goal[] = [
    { id: 'goal1', title: 'Yaz Tatili', targetAmount: 30000, currentAmount: 18500, category: 'Tatil', deadline: '2026-06-01', icon: '🏖️', color: 'from-cyan-500 to-blue-600' },
    { id: 'goal2', title: 'Acil Fon', targetAmount: 50000, currentAmount: 32000, category: 'Tasarruf', deadline: '2026-12-31', icon: '🛡️', color: 'from-emerald-500 to-teal-600' },
    { id: 'goal3', title: 'Yeni Laptop', targetAmount: 45000, currentAmount: 12000, category: 'Teknoloji', deadline: '2026-04-15', icon: '💻', color: 'from-violet-500 to-purple-600' },
    { id: 'goal4', title: 'Araba Peşinatı', targetAmount: 100000, currentAmount: 25000, category: 'Ulaşım', deadline: '2026-09-01', icon: '🚗', color: 'from-orange-500 to-red-600' },
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
    { id: 'sub1', title: 'Netflix', amount: 229, paymentDay: 5, category: 'Eğlence', icon: '🎬', isActive: true },
    { id: 'sub2', title: 'Spotify', amount: 59, paymentDay: 12, category: 'Eğlence', icon: '🎵', isActive: true },
    { id: 'sub3', title: 'Ev Kirası', amount: 15000, paymentDay: 1, category: 'Kira', icon: '🏠', isActive: true },
    { id: 'sub4', title: 'Spor Salonu', amount: 1200, paymentDay: 15, category: 'Sağlık', icon: '💪', isActive: true },
];

export const INITIAL_BUDGETS: Budget[] = [
    { id: 'bud1', category: 'Gıda', limitAmount: 5000, icon: '🛒', color: 'bg-orange-500' },
    { id: 'bud2', category: 'Eğlence', limitAmount: 2000, icon: '🎉', color: 'bg-purple-500' },
    { id: 'bud3', category: 'Kira', limitAmount: 16000, icon: '🏠', color: 'bg-rose-500' },
    { id: 'bud4', category: 'Altyapı', limitAmount: 3000, icon: '📡', color: 'bg-blue-500' },
];

export const INITIAL_CREDIT_CARDS: import('../types').CreditCard[] = [
    {
        id: 'cc1',
        name: 'Axess Platinum',
        limit: 100000,
        currentDebt: 12450.50,
        cutoffDay: 10,
        paymentDueDay: 20,
        color: 'from-amber-600 to-yellow-600',
        icon: '💳'
    },
    {
        id: 'cc2',
        name: 'Bonus Gold',
        limit: 50000,
        currentDebt: 3200.00,
        cutoffDay: 1,
        paymentDueDay: 10,
        color: 'from-emerald-600 to-teal-600',
        icon: '💳'
    }
];

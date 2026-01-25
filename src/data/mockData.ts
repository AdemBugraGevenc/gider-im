import { Transaction, Goal } from '../types';

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

export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
    status: 'completed' | 'pending';
    paymentMethod?: 'cash' | 'credit_card';
    creditCardId?: string;
    installment?: {
        current: number;
        total: number;
    };
}

export interface CreditCard {
    id: string;
    name: string;
    limit: number;
    currentDebt: number;
    cutoffDay: number; // Hesap kesim günü (1-31)
    paymentDueDay: number; // Son ödeme günü (1-31) - Basitlik için sadece gün
    color: string; // Kart rengi (gradient class)
    icon: string; // Kart markası/ikonu
}

export interface SummaryStats {
    monthlyIncome: number;
    monthlyExpense: number;
    totalBalance: number;
    projectedBalance?: number;
}

export type TimelineItem =
    | { type: 'data'; date: string; transactions: Transaction[] }
    | { type: 'empty'; date: string }
    | { type: 'summary'; count: number }
    | { type: 'event'; date: string; eventType: 'cutoff' | 'payment'; cardId: string; cardName: string; amount?: number; color: string };

export interface Goal {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    category: string;
    deadline: string;
    icon: string;
    color: string;
}

export interface Subscription {
    id: string;
    title: string;
    amount: number;
    paymentDay: number; // 1-31
    category: string;
    icon: string; // Emoji
    isActive: boolean;
}

export interface Budget {
    id: string;
    category: string;
    limitAmount: number;
    icon: string; // Emoji
    color: string; // Tailwind color class
}

export interface UserProfile {
    name: string;
    email: string;
    avatar: string;
}

export interface AppPreferences {
    currency: string;
    theme: string;
    isSetupComplete?: boolean; // For v2 onboarding check if needed, mostly just persistence
}

export interface AppNotifications {
    email: boolean;
    budgetAlerts: boolean;
    goalReminders: boolean;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'budget' | 'goal' | 'card' | 'system';
    date: string;
    isRead: boolean;
    priority: 'low' | 'medium' | 'high';
}

export interface SettingsState {
    profile: UserProfile;
    preferences: AppPreferences;
    notifications: AppNotifications;
}

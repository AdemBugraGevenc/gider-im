export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
    status: 'completed' | 'pending';
}

export interface SummaryStats {
    monthlyIncome: number;
    monthlyExpense: number;
    totalBalance: number;
}

export type TimelineItem =
    | { type: 'data'; date: string; transactions: Transaction[] }
    | { type: 'empty'; date: string }
    | { type: 'summary'; count: number };

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

export interface UserProfile {
    name: string;
    email: string;
    avatar: string;
}

export interface AppPreferences {
    currency: string;
    theme: string;
}

export interface AppNotifications {
    email: boolean;
    budgetAlerts: boolean;
    goalReminders: boolean;
}

export interface SettingsState {
    profile: UserProfile;
    preferences: AppPreferences;
    notifications: AppNotifications;
}

import React, { useState } from 'react';
import { CreditCard as CardIcon, Repeat } from 'lucide-react';
import { CreditCard as CreditCardType, Transaction, Subscription } from '../types';
import { KrediKartlari } from './KrediKartlari';
import { Abonelikler } from './Abonelikler';

interface CuzdanProps {
    cards: CreditCardType[];
    transactions: Transaction[];
    subscriptions: Subscription[];
    onAddCard: (card: CreditCardType) => void;
    onDeleteCard: (id: string) => void;
    onDeleteSubscription: (id: string) => void;
    onToggleSubscription: (id: string) => void;
    onOpenAddSubscriptionModal: () => void;
    onProcessSubscriptionsToTransactions: () => void;
    formatCurrency: (amount: number) => string;
}

export const Cuzdan: React.FC<CuzdanProps> = ({
    cards,
    transactions,
    subscriptions,
    onAddCard,
    onDeleteCard,
    onDeleteSubscription,
    onToggleSubscription,
    onOpenAddSubscriptionModal,
    onProcessSubscriptionsToTransactions,
    formatCurrency
}) => {
    const [activeSubTab, setActiveSubTab] = useState<'cards' | 'subs'>('cards');

    return (
        <div className="flex flex-col h-full">
            {/* Tab Selector */}
            <div className="px-5 pt-4 pb-2">
                <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setActiveSubTab('cards')}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeSubTab === 'cards'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <CardIcon className="w-4 h-4" />
                        Kartlar
                    </button>
                    <button
                        onClick={() => setActiveSubTab('subs')}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeSubTab === 'subs'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <Repeat className="w-4 h-4" />
                        Abonelikler
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
                {activeSubTab === 'cards' ? (
                    <KrediKartlari
                        cards={cards}
                        transactions={transactions}
                        onAddCard={onAddCard}
                        onDeleteCard={onDeleteCard}
                        formatCurrency={formatCurrency}
                    />
                ) : (
                    <Abonelikler
                        subscriptions={subscriptions}
                        onDelete={onDeleteSubscription}
                        onToggle={onToggleSubscription}
                        onOpenAddModal={onOpenAddSubscriptionModal}
                        onProcessToTransactions={onProcessSubscriptionsToTransactions}
                        formatCurrency={formatCurrency}
                    />
                )}
            </div>
        </div>
    );
};

export const formatCurrency = (amount: number, currency: string = 'TRY') => {
    const currencyMap: Record<string, string> = {
        'TRY': 'tr-TR',
        'USD': 'en-US',
        'EUR': 'de-DE'
    };
    const locale = currencyMap[currency] || 'tr-TR';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
    }).format(amount);
};

export const formatDateTitle = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return 'Bugün';
    if (date.toDateString() === yesterday.toDateString()) return 'Dün';
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'short' });
};

export const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }).toUpperCase();
};

export const formatDateItem = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' }).toUpperCase();
};

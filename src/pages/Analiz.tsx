import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpCircle, ArrowDownCircle, CalendarDays, FileDown, FileSpreadsheet } from 'lucide-react';
import { SummaryStats, Transaction, Budget } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AnalizProps {
    stats: SummaryStats;
    monthlyTransactions: Transaction[];
    budgets?: Budget[];
    currentDate: Date;
    changeMonth: (direction: 'prev' | 'next') => void;
    formatCurrency: (amount: number) => string;
    formatMonthYear: (date: Date) => string;
}

export const Analiz: React.FC<AnalizProps> = ({
    stats,
    monthlyTransactions,
    budgets = [],
    currentDate,
    changeMonth,
    formatCurrency,
    formatMonthYear
}) => {

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

    const exportToPDF = () => {
        const doc = new jsPDF();

        // Set font to support Turkish characters better
        doc.setFont('helvetica');

        doc.setFontSize(18);
        doc.text(`Finansal Rapor - ${formatMonthYear(currentDate)}`, 14, 20);

        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Olusturulma Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, 14, 28);

        // Summary Table
        autoTable(doc, {
            startY: 35,
            head: [['Ozet', 'Tutar']],
            body: [
                ['Toplam Gelir', formatCurrency(stats.monthlyIncome)],
                ['Toplam Gider', formatCurrency(stats.monthlyExpense)],
                ['Net Durum', formatCurrency(stats.monthlyIncome - stats.monthlyExpense)],
            ],
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42] },
            styles: {
                font: 'helvetica',
                fontStyle: 'normal'
            }
        });

        // Transactions Table
        const tableData = monthlyTransactions.map(t => [
            new Date(t.date).toLocaleDateString('tr-TR'),
            t.title,
            t.category,
            t.type === 'income' ? 'Gelir' : 'Gider',
            formatCurrency(t.amount),
            t.status === 'completed' ? 'Tamamlandi' : 'Bekliyor'
        ]);

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 15,
            head: [['Tarih', 'Aciklama', 'Kategori', 'Tur', 'Tutar', 'Durum']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [15, 23, 42] },
            styles: {
                font: 'helvetica',
                fontStyle: 'normal'
            }
        });

        doc.save(`Rapor-${formatMonthYear(currentDate)}.pdf`);
    };

    const exportToExcel = () => {
        // Simple CSV export
        const headers = ["Tarih", "Açıklama", "Kategori", "Tür", "Tutar", "Durum"];
        const rows = monthlyTransactions.map(t => [
            new Date(t.date).toLocaleDateString('tr-TR'),
            `"${t.title.replace(/"/g, '""')}"`, // Escape quotes
            t.category,
            t.type === 'income' ? 'Gelir' : 'Gider',
            t.amount,
            t.status === 'completed' ? 'Tamamlandı' : 'Bekliyor'
        ]);

        const csvContent = "data:text/csv;charset=utf-8,\uFEFF"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Rapor-${formatMonthYear(currentDate)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4 space-y-6">
            {/* Month Navigation & Export */}
            <div className="flex flex-col gap-3">
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

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={exportToPDF}
                        className="flex items-center justify-center gap-2 py-3 bg-slate-800 text-white rounded-xl shadow-lg active:scale-95 transition-all outline-none group"
                    >
                        <FileDown className="w-4 h-4 group-hover:animate-bounce" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">PDF İndir</span>
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl shadow-lg active:scale-95 transition-all outline-none group"
                    >
                        <FileSpreadsheet className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Excel'e At</span>
                    </button>
                </div>
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

            {/* BUDGET LIMITS */}
            {budgets.length > 0 && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Bütçe Limitleri</h3>
                        <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Bu Ay</span>
                    </div>

                    <div className="space-y-4">
                        {budgets.map(budget => {
                            // Calculate current expense for this budget category
                            const currentExpense = monthlyTransactions
                                .filter(t => t.type === 'expense' && t.category === budget.category)
                                .reduce((acc, t) => acc + t.amount, 0);

                            const percentage = Math.min((currentExpense / budget.limitAmount) * 100, 100);
                            const isOverBudget = currentExpense > budget.limitAmount;

                            // Determine color based on percentage
                            let progressColor = 'bg-emerald-500';
                            if (percentage > 80) progressColor = 'bg-rose-500';
                            else if (percentage > 50) progressColor = 'bg-amber-500';

                            return (
                                <div key={budget.id} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-[10px]">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-base">{budget.icon}</span>
                                            <span className="font-bold text-slate-700">{budget.category}</span>
                                        </div>
                                        <div className="flex items-center gap-1 font-bold">
                                            <span className={isOverBudget ? 'text-rose-600' : 'text-slate-900'}>
                                                {formatCurrency(currentExpense)}
                                            </span>
                                            <span className="text-slate-300">/</span>
                                            <span className="text-slate-400">{formatCurrency(budget.limitAmount)}</span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${progressColor} ${isOverBudget ? 'animate-pulse' : ''}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    {isOverBudget && (
                                        <p className="text-[8px] font-black text-rose-500 uppercase tracking-wide text-right">
                                            LİMİT AŞILDI!
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

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
    );
};

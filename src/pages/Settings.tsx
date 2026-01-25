import React from 'react';
import { ChevronRight, Sun, Moon, AlertCircle, Target, Download, Trash, User, CalendarDays, HelpCircle, ChevronLeft } from 'lucide-react';
import { SettingsState } from '../types';

interface SettingsProps {
    settings: SettingsState;
    setSettings: (settings: SettingsState) => void;
    activePage: 'main' | 'help' | 'privacy' | 'terms';
    setActivePage: (page: 'main' | 'help' | 'privacy' | 'terms') => void;
}

export const Settings: React.FC<SettingsProps> = ({
    settings,
    setSettings,
    activePage,
    setActivePage
}) => {
    if (activePage === 'main') {
        return (
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
                                    <p className="text-[9px] text-slate-400 font-medium">Güncel sürüm bilgisi</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">v1.0.0</span>
                        </div>

                        {/* Developer */}
                        <div className="px-4 py-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                                    <User className="w-4 h-4 text-violet-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900">Geliştirici</p>
                                    <p className="text-[9px] text-slate-400 font-medium">Uygulama yapımcısı</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-600">Buğra G.</span>
                        </div>

                        {/* Last Update */}
                        <div className="px-4 py-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <CalendarDays className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900">Son Güncelleme</p>
                                    <p className="text-[9px] text-slate-400 font-medium">En son değişiklik tarihi</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">25 Ocak 2026</span>
                        </div>

                        {/* Help */}
                        <button
                            onClick={() => setActivePage('help')}
                            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                                    <HelpCircle className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-900">Yardım & Destek</p>
                                    <p className="text-[9px] text-slate-400 font-medium">SSS, kullanım kılavuzu ve iletişim</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                        </button>

                        {/* Privacy Policy */}
                        <button
                            onClick={() => setActivePage('privacy')}
                            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                                    <span className="text-sm">📄</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-900">Gizlilik Politikası</p>
                                    <p className="text-[9px] text-slate-400 font-medium">Kişisel veri koruma ve güvenlik</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                        </button>

                        {/* Terms */}
                        <button
                            onClick={() => setActivePage('terms')}
                            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                                    <span className="text-sm">📋</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-900">Kullanım Koşulları</p>
                                    <p className="text-[9px] text-slate-400 font-medium">Hizmet şartları ve kullanıcı sözleşmesi</p>
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
        );
    }

    if (activePage === 'help') {
        return (
            /* HELP PAGE */
            <div className="p-4 space-y-4">
                {/* Header with Back Button */}
                <button
                    onClick={() => setActivePage('main')}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-bold">Ayarlara Dön</span>
                </button>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <HelpCircle className="w-6 h-6" />
                        <h2 className="text-lg font-black">Yardım & Destek</h2>
                    </div>
                    <p className="text-[10px] opacity-90">Size yardımcı olmak için buradayız</p>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Sık Sorulan Sorular</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        <div>
                            <p className="text-xs font-bold text-slate-900 mb-1">Nasıl işlem eklerim?</p>
                            <p className="text-[10px] text-slate-600 leading-relaxed">Ana sayfada sağ alt köşedeki + butonuna tıklayarak gelir veya gider ekleyebilirsiniz.</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 mb-1">Hedeflerim nasıl çalışır?</p>
                            <p className="text-[10px] text-slate-600 leading-relaxed">Hedefler sekmesinden yeni hedef oluşturabilir ve para ekleyerek ilerlemenizi takip edebilirsiniz.</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 mb-1">Para birimini nasıl değiştiririm?</p>
                            <p className="text-[10px] text-slate-600 leading-relaxed">Ayarlar &gt; Uygulama Tercihleri bölümünden para biriminizi TRY, USD veya EUR olarak değiştirebilirsiniz.</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 mb-1">Verilerim güvende mi?</p>
                            <p className="text-[10px] text-slate-600 leading-relaxed">Tüm verileriniz tarayıcınızda yerel olarak saklanır ve sunucularımıza gönderilmez.</p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">İletişim</h3>
                    <div className="space-y-2 text-[10px] text-slate-600">
                        <p><span className="font-bold">E-posta:</span> destek@hesapp.im</p>
                        <p><span className="font-bold">Web:</span> www.hesapp.im</p>
                        <p className="text-[9px] text-slate-400 mt-3">Sorularınız için 7/24 destek ekibimize ulaşabilirsiniz.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (activePage === 'privacy') {
        return (
            /* PRIVACY PAGE */
            <div className="p-4 space-y-4">
                {/* Header with Back Button */}
                <button
                    onClick={() => setActivePage('main')}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-bold">Ayarlara Dön</span>
                </button>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">📄</span>
                        <h2 className="text-lg font-black">Gizlilik Politikası</h2>
                    </div>
                    <p className="text-[10px] opacity-90">Son güncelleme: 25 Ocak 2026</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">1. Veri Toplama</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            HesApp, finansal işlemlerinizi ve hedeflerinizi yalnızca cihazınızda saklar.
                            Hiçbir kişisel veya finansal bilginiz sunucularımıza gönderilmez.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">2. Veri Saklama</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            Tüm verileriniz tarayıcınızın yerel depolama alanında (LocalStorage) saklanır.
                            Bu veriler yalnızca sizin erişiminize açıktır.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">3. Üçüncü Taraf Paylaşımı</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            Verileriniz hiçbir şekilde üçüncü taraflarla paylaşılmaz, satılmaz veya kiralanmaz.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">4. Güvenlik</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            Verilerinizin güvenliği için modern web güvenlik standartlarını kullanıyoruz.
                            Ancak internet üzerinden veri iletiminin %100 güvenli olmadığını unutmayın.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">5. Çerezler</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            Uygulama deneyiminizi iyileştirmek için minimal çerez kullanımı yapıyoruz.
                            Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (activePage === 'terms') {
        return (
            /* TERMS PAGE */
            <div className="p-4 space-y-4">
                {/* Header with Back Button */}
                <button
                    onClick={() => setActivePage('main')}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-bold">Ayarlara Dön</span>
                </button>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">📋</span>
                        <h2 className="text-lg font-black">Kullanım Koşulları</h2>
                    </div>
                    <p className="text-[10px] opacity-90">Son güncelleme: 25 Ocak 2026</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">1. Hizmet Kullanımı</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            HesApp'i kullanarak bu kullanım koşullarını kabul etmiş olursunuz.
                            Uygulama kişisel finans yönetimi için tasarlanmıştır.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">2. Kullanıcı Sorumlulukları</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            Girdiğiniz tüm finansal bilgilerin doğruluğundan siz sorumlusunuz.
                            Uygulamayı yasalara uygun şekilde kullanmayı kabul edersiniz.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">3. Hizmet Değişiklikleri</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            Hizmeti önceden haber vermeksizin değiştirme, askıya alma veya sonlandırma hakkımız saklıdır.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">4. Sorumluluk Reddi</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            HesApp "olduğu gibi" sunulmaktadır. Finansal kararlarınızdan doğacak sonuçlardan sorumlu değiliz.
                            Profesyonel finansal danışmanlık için uzmanlarla görüşmenizi öneririz.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">5. Fikri Mülkiyet</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            Uygulamanın tüm içeriği, tasarımı ve kodu telif hakkı ile korunmaktadır.
                            İzinsiz kullanım yasaktır.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2">6. İletişim</h3>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                            Kullanım koşulları hakkında sorularınız için destek@hesapp.im adresinden bize ulaşabilirsiniz.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

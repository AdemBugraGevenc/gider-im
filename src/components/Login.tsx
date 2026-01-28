import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, Fingerprint } from 'lucide-react';

export default function Login() {
    const [activePage, setActivePage] = useState<'main' | 'privacy' | 'terms'>('main');

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`
            }
        });

        if (error) {
            console.error('Giris hatasi:', error.message);
            alert('Giris yaparken bir hata olustu!');
        }
    };

    if (activePage === 'privacy') {
        return (
            <div className="min-h-screen bg-slate-900 p-4 space-y-4 overflow-y-auto">
                <button
                    onClick={() => setActivePage('main')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-bold">Giriş Ekranına Dön</span>
                </button>

                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-5 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">📄</span>
                        <h2 className="text-lg font-black">Gizlilik Politikası</h2>
                    </div>
                    <p className="text-[10px] opacity-90">Son güncelleme: 25 Ocak 2026</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 space-y-5">
                    <div>
                        <h3 className="text-xs font-black text-white mb-2 uppercase tracking-widest">1. Veri Toplama</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                            Gider.im, finansal işlemlerinizi ve hedeflerinizi yalnızca cihazınızda veya güvenli bulut hesabınızda saklar.
                            Hiçbir hassas finansal bilginiz üçüncü taraflarla paylaşılmaz.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white mb-2 uppercase tracking-widest">2. Veri Saklama</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                            Verileriniz Supabase altyapısı üzerinde güvenli bir şekilde saklanır.
                            Bu verilere yalnızca sizin kimlik bilgilerinizle erişilebilir.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white mb-2 uppercase tracking-widest">3. Üçüncü Taraf Paylaşımı</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                            Verileriniz hiçbir şekilde üçüncü taraflarla reklam veya satış amacıyla paylaşılmaz.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white mb-2 uppercase tracking-widest">4. Güvenlik</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                            Verilerinizin güvenliği için endüstri standardı şifreleme yöntemleri kullanıyoruz.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (activePage === 'terms') {
        return (
            <div className="min-h-screen bg-slate-900 p-4 space-y-4 overflow-y-auto">
                <button
                    onClick={() => setActivePage('main')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-bold">Giriş Ekranına Dön</span>
                </button>

                <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-5 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">📋</span>
                        <h2 className="text-lg font-black">Kullanım Koşulları</h2>
                    </div>
                    <p className="text-[10px] opacity-90">Son güncelleme: 25 Ocak 2026</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 space-y-5">
                    <div>
                        <h3 className="text-xs font-black text-white mb-2 uppercase tracking-widest">1. Hizmet Kullanımı</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                            Gider.im'i kullanarak bu kullanım koşullarını kabul etmiş olursunuz.
                            Uygulama kişisel finans yönetimi için tasarlanmıştır.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white mb-2 uppercase tracking-widest">2. Kullanıcı Sorumlulukları</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                            Girdiğiniz tüm finansal bilgilerin doğruluğundan siz sorumlusunuz.
                            Uygulamayı yasalara uygun şekilde kullanmayı kabul edersiniz.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white mb-2 uppercase tracking-widest">3. Sorumluluk Reddi</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                            Gider.im "olduğu gibi" sunulmaktadır. Finansal kararlarınızdan doğacak sonuçlardan Gider.im sorumlu tutulamaz.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#050608] font-sans">
            {/* CSS Only Background - Pure Premium Aesthetics */}
            <div className="absolute inset-0 z-0">
                {/* Dark Base Layer */}
                <div className="absolute inset-0 bg-slate-950"></div>

                {/* Dynamic CSS Orbs */}
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

                {/* Subtle Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,6,8,0.8)_80%)]"></div>

                {/* Micro-grid Texture */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            </div>

            <div className="w-full max-w-[400px] px-6 relative z-10 animate-in fade-in zoom-in-95 duration-1000">
                <div className="bg-white/[0.01] backdrop-blur-[40px] rounded-[2.5rem] p-10 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] relative overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    <div className="text-center mb-12">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-violet-600/10 rounded-[1.8rem] relative flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-md">
                                <Fingerprint className="w-10 h-10 text-white stroke-[1.25] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
                            Gider.<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">im</span>
                        </h1>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[240px] mx-auto">
                            Finansal özgürlüğe giden <br /> modern yol arkadaşınız.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full h-[60px] bg-white text-slate-950 font-black rounded-2xl flex items-center justify-center gap-3 transition-all relative group overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_35px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                            {/* Neon Border Glow (Subtle) */}
                            <div className="absolute inset-0 rounded-2xl border border-indigo-500/0 group-hover:border-indigo-500/30 transition-colors"></div>

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

                            <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="relative z-10 text-[14px] uppercase tracking-[0.1em] mt-0.5">Google ile Giriş Yap</span>
                        </button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-[10px] text-slate-500 text-center font-bold tracking-widest leading-none mb-3">YASAL BİLGİLER</p>
                        <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-tighter">
                            <button
                                onClick={() => setActivePage('terms')}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                Hizmet Şartları
                            </button>
                            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                            <button
                                onClick={() => setActivePage('privacy')}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                Gizlilik Politikası
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Quote */}
                <p className="mt-8 text-center text-[10px] text-slate-500 font-medium tracking-wide opacity-50 uppercase">
                    Modern Finans Deneyimi • © 2026
                </p>
            </div>
        </div>
    );
}

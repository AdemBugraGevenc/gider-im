HesApp.im - Teknik Şartname ve Geliştirme Planı

Bu döküman, antigravity kodlama süreci için ana rehber niteliğindedir. Uygulama "Mobile-Only" vizyonuyla, finansal verilerin zaman çizelgesi üzerinde takibini hedefler.

1. Teknoloji Yığını

Framework: Next.js 14+ (App Router - Client Side)

Dil: TypeScript

Styling: Tailwind CSS

İkon Seti: Lucide React

Durum Yönetimi: React State (useState, useMemo)

2. Temel Mimari Prensipler

Mobile-Only: Masaüstü görünümü olmayacak. max-w-[414px] bir container içinde telefon simülasyonu yapılacak.

Kronolojik Akış: Tüm işlemler ayın 1'inden 30'una doğru (eskiden yeniye) sıralanacak.

Zaman Çizelgesi Mantığı:

İşlem olan günler büyük noktalarla gösterilecek.

İşlem olmayan günler küçük içi boş noktalarla gösterilecek.

4 gün ve üzeri boşluklar 1 Nokta + [X Gün Boş Geçti] Etiketi + 1 Nokta şeklinde özetlenecek.

3. Özellik Seti

A. Takvim Sistemi

Üst kısımda ay ismi ve sağa/sola ok işaretleri.

Ay değiştiğinde liste o aya göre filtrelenecek.

Veriler; Ocak 2026 (güncel), Aralık 2025 (geçmiş) ve Şubat 2026 (gelecek) için hazır bulunacak.

B. Dashboard ve İstatistikler

Genel Bakiye: Tüm zamanların toplamı.

Ay Geliri/Gideri: Sadece seçili ayın toplamı.

Filtreleme: Gelir, Gider ve Tümü seçenekleri.

C. İşlem Yönetimi

Yeni İşlem: Bottom-sheet modalı ile eklenecek.

Swipe-to-Delete: İşlem bloğu sola kaydırıldığında silme ikonu çıkacak.

Onay Mekanizması: Silme işleminden önce özel bir modal ile onay istenecek.

4. UI/UX Detayları

Header: Kompakt, bildirim ikonu içeren temiz tasarım.

Bottom Nav: Özet, Cüzdan, (+) FAB Butonu, Analiz, Ayarlar.

Kartlar: rounded-2xl, hafif gölgeli (shadow-sm), modern slate tonları.

Etkileşim: Tüm butonlarda active:scale-95 animasyonu.

5. Geliştirme Adımları

Proje iskeletinin Next.js ve Tailwind ile kurulması.

Takvim ve Ay bazlı filtreleme mantığının kurulması.

Zaman çizelgesi (Timeline) algoritmasının (boş gün özetleme dahil) yazılması.

Kaydırarak silme (Swipe) ve Modal onay sisteminin entegre edilmesi.

Yeni işlem ekleme formunun validasyonlarla birlikte eklenmesi.
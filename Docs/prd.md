# Proje Tanımı ve Gereksinim Dokümanı (PRD)

## 1. Proje Özeti
**Proje Adı:** Gider-im (Kişisel Finans ve Harcama Takip Uygulaması)
**Amaç:** Kullanıcıların gelir ve giderlerini takip edebileceği, tasarruf hedefleri oluşturabileceği ve finansal durumlarını analiz edebileceği mobil öncelikli bir web uygulaması geliştirmek.

## 2. Teknoloji Yığını
- **Frontend Framework:** React (Vite)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **İkonlar:** Lucide React
- **Paket Yöneticisi:** pnpm

## 3. Temel Özellikler

### A. Dashboard (Ana Sayfa)
- **Özet Kartlar:** Toplam Bakiye, Aylık Gelir, Aylık Gider.
- **Zaman Çizelgesi (Timeline):** İşlemlerin gün bazlı listelenmesi. İşlem olmayan günlerin görselleştirilmesi.
- **Tarih Filtresi:** Aylık bazda geçmiş ve gelecek verilere erişim.

### B. Cüzdan ve İşlem Yönetimi
- **İşlem Ekleme:** Gelir veya Gider türünde yeni kayıt ekleme (Kategori, Tutar, Tarih).
- **İşlem Silme:** Kaydırma (Swipe) hareketi ile işlemleri silme.
- **Kategoriler:** Harcamalar için özelleştirilmiş kategoriler.

### C. Hedefler (Goals)
- **Hedef Oluşturma:** Hedef tutarı, kategori ve bitiş tarihi ile tasarruf hedefi ekleme.
- **Para Ekleme:** Mevcut hedeflere bakiye ekleme ve ilerleme çubuğunu (progress bar) güncelleme.
- **Görselleştirme:** Hedeflerin ikon ve renklerle listelenmesi.

### D. Ayarlar
- **Profil:** Kullanıcı adı, e-posta ve avatar düzenleme.
- **Tercihler:** Para birimi ve tema (Karanlık/Aydınlık mod) seçimi.
- **Veri Yönetimi:** Verileri dışa aktarma, önbelleği temizleme.

## 4. Kullanıcı Arayüzü (UI) ve Deneyim (UX)
- **Mobile-First:** 414px genişliğinde mobil simülasyonu.
- **Navigasyon:** Alt menü (Bottom Tab Bar) ile sayfalar arası geçiş.
- **Etkileşim:** Modal pencereler, animasyonlu geçişler ve kullanıcı dostu form elemanları.

## 5. Veri Kaynağı
- **Mock Data:** Proje geliştirme aşamasında statik başlangıç verisi kullanılır.
- **State Management:** React `useState` ve `useMemo` ile istemci taraflı veri yönetimi.

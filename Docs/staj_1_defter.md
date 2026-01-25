# Staj Defteri - 20 Günlük Çalışma Planı
Bu dosya, Gider-im projesinin 20 günlük staj süresince adım adım geliştirilmesini ve her gün yapılan çalışmaları detaylandırmaktadır.

## 1. Hafta: Temel Kurulum ve Arayüz İskeleti

### 1. Gün: Proje Kurulumu ve Geliştirme Ortamı
- **Yapılan İş:** Node.js ve pnpm kullanılarak Vite tabanlı React projesi oluşturuldu. TypeScript şablonu seçildi.
- **Teknik Detay:** `pnpm create vite my-app --template react-ts` komutu kullanıldı. Proje bağımlılıkları yüklendi (`npm install`). Dosya yapısı incelendi.

### 2. Gün: Tailwind CSS Entegrasyonu
- **Yapılan İş:** CSS framework olarak Tailwind CSS projeye dahil edildi.
- **Teknik Detay:** `postcss.config.js` ve `tailwind.config.js` dosyaları yapılandırıldı. `index.css` dosyasına Tailwind direktifleri eklendi. Renk paleti ve font ayarları (Inter) tanımlandı.

### 3. Gün: Klasör Yapısı ve İkon Seti
- **Yapılan İş:** Proje klasörleri (`components`, `types`, `assets`) düzenlendi. İkon kütüphanesi eklendi.
- **Teknik Detay:** `lucide-react` paketi kuruldu. Projede kullanılacak temel ikonlar (Home, Wallet, Plus, Settings) belirlendi ve test bileşeninde görüntülendi.

### 4. Gün: Ana Layout ve Responsive Tasarım
- **Yapılan İş:** Mobil öncelikli (Mobile-First) tasarım için ana kapsayıcı (container) oluşturuldu.
- **Teknik Detay:** `max-w-[414px]` genişliğinde, ekranın ortasında duran ve mobil cihazı simüle eden ana `div` yapısı kodlandı. Arka plan renkleri ayarlandı.

### 5. Gün: Bottom Navigation (Alt Menü)
- **Yapılan İş:** Sayfalar arası geçişi sağlayacak alt navigasyon çubuğu tasarlandı.
- **Teknik Detay:** `lucide-react` ikonları kullanılarak 5 elemanlı (Dashboard, Wallet, Add, Goals, Settings) bir menü oluşturuldu. Aktif sekme (`activeTab`) state'i tanımlandı.

---

## 2. Hafta: Veri Yapısı ve Dashboard Geliştirmesi

### 6. Gün: Veri Modellerinin (Types) Oluşturulması
- **Yapılan İş:** Uygulamada kullanılacak veri tipleri TypeScript arayüzleri (interface) olarak tanımlandı.
- **Teknik Detay:** `Transaction` (id, title, amount, date...), `Goal`, `SummaryStats` gibi interface'ler oluşturuldu. Type güvenliği sağlandı.

### 7. Gün: Mock Veri ve State Hazırlığı
- **Yapılan İş:** Arayüzü test etmek için kapsamlı sahte veriler (Mock Data) hazırlandı.
- **Teknik Detay:** `INITIAL_DATA` ve `INITIAL_GOALS` sabit değişkenleri oluşturuldu. React `useState` kullanılarak bu veriler ana bileşene state olarak bağlandı.

### 8. Gün: Dashboard Özet Kartları
- **Yapılan İş:** Ana sayfada görülecek "Toplam Bakiye", "Gelir" ve "Gider" kartları kodlandı.
- **Teknik Detay:** `useMemo` hook'u kullanılarak, mevcut ayın verileri üzerinden toplam gelir ve gider hesaplamaları performanslı bir şekilde yapıldı.

### 9. Gün: Ay Değiştirme ve Filtreleme
- **Yapılan İş:** Verileri aylık bazda görüntülemek için tarih seçici (önceki/sonraki ay) yapıldı.
- **Teknik Detay:** `currentDate` state'i oluşturuldu. Tarih değiştirme fonksiyonları ile gösterilen verilerin seçili aya göre filtrelenmesi sağlandı.

### 10. Gün: Timeline (Zaman Çizelgesi) Mantığı
- **Yapılan İş:** İşlemlerin tarih sırasına göre gruplandırılması ve listelenmesi sağlandı.
- **Teknik Detay:** İşlemler tarihe göre sıralandı. Veri olmayan günler için "Boş Gün" (Empty State) mantığı geliştirildi ve arayüze yansıtıldı.

---

## 3. Hafta: İşlem Yönetimi ve Hedefler

### 11. Gün: İşlem Listesi Bileşenleri
- **Yapılan İş:** Her bir gelir/gider kalemini gösteren liste elemanları tasarlandı.
- **Teknik Detay:** Kategorilere göre ikon ve renk değişimi (Gelir için yeşil, Gider için kırmızı) dinamik hale getirildi.

### 12. Gün: İşlem Ekleme Modalı
- **Yapılan İş:** Yeni işlem eklemek için açılır pencere (Bottom Sheet Modal) tasarlandı.
- **Teknik Detay:** Modal görünürlüğü bir state ile kontrol edildi. Form elemanları (Tutar, Kategori, Tarih) eklendi.

### 13. Gün: Form Validasyonu ve Veri Ekleme
- **Yapılan İş:** Girilen verilerin doğruluğu kontrol edildi ve listeye eklendi.
- **Teknik Detay:** Boş alan kontrolü yapıldı. `setTransactions` fonksiyonu ile yeni veri mevcut diziye (spread operator ile) eklendi.

### 14. Gün: Swipe-to-Delete (Kaydırarak Silme)
- **Yapılan İş:** Mobil deneyimi artırmak için liste elemanını kaydırarak silme özelliği eklendi.
- **Teknik Detay:** `Touch events` (onTouchStart, onTouchMove) kullanılarak kullanıcının kaydırma hareketi algılandı ve silme butonu gösterildi.

### 15. Gün: Hedefler (Goals) Sayfası
- **Yapılan İş:** Tasarruf hedeflerinin listelendiği sayfa tasarlandı.
- **Teknik Detay:** Hedef kartları oluşturuldu. Her hedef için `ProgressBar` bileşeni kodlandı (Mevcut Tutar / Hedef Tutar oranı).

---

## 4. Hafta: Gelişmiş Özellikler ve Final

### 16. Gün: Hedefe Para Ekleme
- **Yapılan İş:** Mevcut hedeflere para ekleme fonksiyonu ve arayüzü geliştirildi.
- **Teknik Detay:** Hedef detay modalı içinde "Para Ekle" butonu yapıldı. Girilen tutar hedefin `currentAmount` değerine eklendi.

### 17. Gün: Ayarlar ve Profil Sayfası
- **Yapılan İş:** Kullanıcı profili ve uygulama ayarları sayfası kodlandı.
- **Teknik Detay:** Profil bilgileri (Ad, Email) ve ayarlar (Para Birimi, Dil) için form yapısı oluşturuldu. State yönetimine bağlandı.

### 18. Gün: Tema (Dark/Light Mode) Yönetimi
- **Yapılan İş:** Uygulamaya karanlık mod desteği eklendi.
- **Teknik Detay:** Tailwind'in `darkMode: 'class'` özelliği kullanıldı. Ayarlardan tema değiştirildiğinde `html` etiketine `dark` class'ı ekleyip çıkaran özellik yazıldı.

### 19. Gün: Hata Ayıklama ve İyileştirmeler
- **Yapılan İş:** Uygulamadaki küçük hatalar giderildi ve UX iyileştirmeleri yapıldı.
- **Teknik Detay:** `console.log` ile veri akışı kontrol edildi. Sayı formatlama (Currency Formatter) fonksiyonu tüm uygulamada standart hale getirildi.

### 20. Gün: Dokümantasyon ve Proje Teslimi
- **Yapılan İş:** Proje dokümanları (PRD, Kurulum Rehberi) tamamlandı.
- **Teknik Detay:** `README.md` dosyası güncellendi. Kod içerisinde gerekli yerlere yorum satırları eklendi. Proje sunuma hazır hale getirildi.

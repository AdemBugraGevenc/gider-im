# Staj Gider Projesi - v2 Geliştirme Planı

Bu belge, üniversite staj projesinin (v1) ikinci staj dönemi için "Profesyonel Sürüm"e (v2) yükseltilmesi amacıyla yapılacak geliştirmeleri içerir.

**Hedef:** Uygulamayı sadece görsel bir demodan, verileri saklayan ve akıllı analizler sunan kullanılabilir bir ürüne dönüştürmek.

---

## 1. Veri Kalıcılığı (Data Persistence)
**Amaç:** Sayfa yenilendiğinde verilerin kaybolmasını engellemek ve "gerçek" bir uygulama deneyimi sunmak.

*   **Teknik Yaklaşım:**
    *   `mockData.ts` yerine tarayıcı tabanlı `localStorage` kullanılacak.
    *   Özel bir React Hook (`useLocalStorage`) yazılarak state yönetimi merkezi hale getirilecek.
    *   Uygulama ilk açıldığında `localStorage` kontrol edilecek; boşsa varsayılan (onboarding) verileri, doluysa kullanıcının verileri yüklenecek.
*   **Aksiyonlar:**
    *   `useLocalStorage` hook'unun oluşturulması.
    *   `App.tsx` içindeki `useState` yapılarının bu hook ile değiştirilmesi.
    *   Veri tiplerinin (Types) güncellenmesi.

## 2. Abonelikler ve Sabit Giderler (Subscriptions)
**Amaç:** Netflix, Spotify, Kira gibi her ay tekrarlayan giderlerin otomatik takibi.

*   **Özellikler:**
    *   **Yeni Veri Modeli:** `Subscription` tipi (Ad, Tutar, Ödeme Günü, Kategori, İkon).
    *   **Aboneliklerim Sayfası:** Tüm aktif aboneliklerin listelendiği ve yönetildiği yeni bir sayfa/modal.
    *   **Otomasyon (Simülasyon):** Ay değiştiğinde veya kullanıcı "Ayı Kapat" dediğinde bu harcamaların otomatik olarak o ayın giderlerine eklenmesi.
*   **UI:**
    *   Abonelik ekleme formu (Marka logoları veya emojilerle).
    *   "Toplam Sabit Gider" özeti.

## 3. Akıllı Bütçe Limitleri (Budgeting)
**Amaç:** Kullanıcının harcamalarını kontrol altına almasını sağlayan görsel uyarı sistemi.

*   **Özellikler:**
    *   Kategori bazlı limit belirleme (Örn: Market için 3000 TL, Eğlence için 1000 TL).
    *   **Görsel İlerleme Çubukları (Progress Bars):**
        *   %0 - %50: Yeşil (Güvendesin)
        *   %50 - %80: Sarı (Dikkat)
        *   %80 - %100+: Kırmızı (Limit Aşıldı)
*   **UI Yerleşimi:**
    *   "Analiz" sayfasında kategori detaylarının yanına veya yeni bir "Bütçe" sekmesine eklenecek.

## 4. Raporlama ve Dışa Aktarma (Export)
**Amaç:** Finansal verilerin resmi formatta paylaşılabilir veya yedeklenebilir hale gelmesi.

*   **Özellikler:**
    *   **Excel (CSV) İndir:** Tarih, Başlık, Kategori, Tutar, Tür sütunlarını içeren ham veri dökümü.
    *   **PDF Raporu (Opsiyonel/Basitleştirilmiş):** "Ocak 2026 Özeti" başlığı altında toplam gelir/gider ve bakiyeyi gösteren şık bir çıktı (Print CSS ile).
*   **Kullanım:** Ayarlar veya Profil sayfasında "Verilerimi İndir" butonu.

---

## Uygulama Sırası (Roadmap)

1.  **Faz 1: Altyapı (Persistence):** Önce verileri kalıcı hale getirip sistemi sağlamlaştıralım.
2.  **Faz 2: Yönetim (Subscriptions):** Sabit gider modülünü ekleyip veri girişini kolaylaştıralım.
3.  **Faz 3: Kontrol (Budgeting):** Bütçe ve limit görsellerini ekleyerek UI/UX'i zenginleştirelim.
4.  **Faz 4: Profesyonellik (Export):** Raporlama butonlarını ekleyip projeyi paketleyelim.

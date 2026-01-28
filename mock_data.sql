-- Mock Data - Universite Ogrencisi Senaryosu (Ocak-Mart 2026)
-- Bu script'i calistirmadan once Supabase'de giris yapmis olmalisiniz
-- Kullanici ID'sini auth.uid() otomatik olarak alacak

-- Kredi Kartlari (3 adet)
INSERT INTO credit_cards (user_id, name, card_limit, current_debt, color, cutoff_day, payment_due_day, icon) VALUES
(auth.uid(), 'Ziraat Bankkart Combo', 5000.00, 0, 'from-blue-600 to-blue-800', 15, 25, '💳'),
(auth.uid(), 'Garanti BBVA Flexi', 3000.00, 0, 'from-emerald-600 to-teal-700', 10, 20, '💳'),
(auth.uid(), 'YKB World Ogrenci', 2500.00, 0, 'from-rose-500 to-pink-600', 5, 15, '💳');

-- Abonelikler
INSERT INTO subscriptions (user_id, title, amount, category, payment_day, is_active, icon) VALUES
(auth.uid(), 'Spotify Premium Ogrenci', 12.49, 'Eglence', 5, true, '🎵'),
(auth.uid(), 'Netflix', 119.99, 'Eglence', 12, true, '📺'),
(auth.uid(), 'YouTube Premium', 29.99, 'Eglence', 8, true, '📹'),
(auth.uid(), 'Kampus Yurdu - Kira', 3500.00, 'Konaklama', 1, true, '🏠');

-- Ocak 2026 - Islemler (~10 islem)
INSERT INTO transactions (user_id, title, amount, type, category, date, status, payment_method, credit_card_id) VALUES
-- Gelirler
(auth.uid(), 'Burs Odemesi', 2500.00, 'income', 'Burs', '2026-01-05', 'completed', 'banka', NULL),
(auth.uid(), 'Aile Yardimi', 1500.00, 'income', 'Aile', '2026-01-10', 'completed', 'nakit', NULL),

-- Giderler
(auth.uid(), 'Migros Market Alisverisi', 385.50, 'expense', 'Market', '2026-01-07', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid())),
(auth.uid(), 'Kampus Kafeterya', 125.00, 'expense', 'Yemek', '2026-01-08', 'completed', 'cash', NULL),
(auth.uid(), 'Turkcell Fatura', 150.00, 'expense', 'Fatura', '2026-01-10', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Garanti BBVA Flexi' AND user_id = auth.uid())),
(auth.uid(), 'Matematik Ders Kitabi', 295.00, 'expense', 'Egitim', '2026-01-12', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'YKB World Ogrenci' AND user_id = auth.uid())),
(auth.uid(), 'Otobus Karti Yukleme', 200.00, 'expense', 'Ulasim', '2026-01-14', 'completed', 'cash', NULL),
(auth.uid(), 'Kafe - Arkadas Bulusmasi', 180.00, 'expense', 'Sosyal', '2026-01-18', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid())),
(auth.uid(), 'Trendyol - Kiyafet', 450.00, 'expense', 'Giyim', '2026-01-22', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Garanti BBVA Flexi' AND user_id = auth.uid())),
(auth.uid(), 'Sinema Bileti', 95.00, 'expense', 'Eglence', '2026-01-25', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'YKB World Ogrenci' AND user_id = auth.uid()));

-- Subat 2026 - Islemler (~10 islem)
INSERT INTO transactions (user_id, title, amount, type, category, date, status, payment_method, credit_card_id) VALUES
-- Gelirler
(auth.uid(), 'Burs Odemesi', 2500.00, 'income', 'Burs', '2026-02-05', 'completed', 'banka', NULL),
(auth.uid(), 'Freelance Proje Odemesi', 800.00, 'income', 'Is', '2026-02-15', 'completed', 'banka', NULL),

-- Giderler
(auth.uid(), 'Carrefour Market', 420.00, 'expense', 'Market', '2026-02-03', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid())),
(auth.uid(), 'Universite Kantini', 95.50, 'expense', 'Yemek', '2026-02-06', 'completed', 'cash', NULL),
(auth.uid(), 'Elektrik Faturasi', 185.00, 'expense', 'Fatura', '2026-02-08', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Garanti BBVA Flexi' AND user_id = auth.uid())),
(auth.uid(), 'Kitapyurdu - Referans Kitaplar', 380.00, 'expense', 'Egitim', '2026-02-10', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'YKB World Ogrenci' AND user_id = auth.uid())),
(auth.uid(), 'Metro Karti', 200.00, 'expense', 'Ulasim', '2026-02-12', 'completed', 'cash', NULL),
(auth.uid(), 'Burger King - Cikis', 165.00, 'expense', 'Yemek', '2026-02-14', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid())),
(auth.uid(), 'Amazon - Kulaklik', 550.00, 'expense', 'Elektronik', '2026-02-18', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Garanti BBVA Flexi' AND user_id = auth.uid())),
(auth.uid(), 'Eczane', 85.00, 'expense', 'Saglik', '2026-02-22', 'completed', 'cash', NULL);

-- Mart 2026 - Islemler (~11 islem)
INSERT INTO transactions (user_id, title, amount, type, category, date, status, payment_method, credit_card_id) VALUES
-- Gelirler
(auth.uid(), 'Burs Odemesi', 2500.00, 'income', 'Burs', '2026-03-05', 'completed', 'banka', NULL),
(auth.uid(), 'Aile Yardimi', 1200.00, 'income', 'Aile', '2026-03-08', 'completed', 'cash', NULL),

-- Giderler
(auth.uid(), 'A101 Market', 310.00, 'expense', 'Market', '2026-03-02', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid())),
(auth.uid(), 'Yemekhane', 120.00, 'expense', 'Yemek', '2026-03-04', 'completed', 'cash', NULL),
(auth.uid(), 'Internet Faturasi', 175.00, 'expense', 'Fatura', '2026-03-07', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Garanti BBVA Flexi' AND user_id = auth.uid())),
(auth.uid(), 'Notebook Mouse', 160.00, 'expense', 'Elektronik', '2026-03-10', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'YKB World Ogrenci' AND user_id = auth.uid())),
(auth.uid(), 'Otobus Karti', 200.00, 'expense', 'Ulasim', '2026-03-12', 'completed', 'cash', NULL),
(auth.uid(), 'Starbucks', 155.00, 'expense', 'Sosyal', '2026-03-15', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid())),
(auth.uid(), 'HM - Bahar Alisverisi', 680.00, 'expense', 'Giyim', '2026-03-20', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Garanti BBVA Flexi' AND user_id = auth.uid())),
(auth.uid(), 'Spor Salonu - 1 Aylik', 250.00, 'expense', 'Saglik', '2026-03-22', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'YKB World Ogrenci' AND user_id = auth.uid())),
(auth.uid(), 'Konser Bileti', 350.00, 'expense', 'Eglence', '2026-03-28', 'completed', 'credit_card', (SELECT id FROM credit_cards WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid()));

-- Hedefler
INSERT INTO goals (user_id, title, target_amount, current_amount, category, deadline, icon, color) VALUES
(auth.uid(), 'Yaz Tatili - Cesme', 5000.00, 850.00, 'Tatil', '2026-06-30', '🏖️', 'from-emerald-500 to-teal-600'),
(auth.uid(), 'Yeni Laptop', 15000.00, 2300.00, 'Teknoloji', '2026-09-01', '💻', 'from-blue-500 to-indigo-600'),
(auth.uid(), 'Acil Durum Fonu', 3000.00, 600.00, 'Tasarruf', '2026-12-31', '🆘', 'from-amber-500 to-orange-600');

-- Butceler
INSERT INTO budgets (user_id, category, limit_amount, icon, color) VALUES
(auth.uid(), 'Yemek', 1000.00, '🍔', 'bg-orange-500'),
(auth.uid(), 'Ulasim', 500.00, '🚌', 'bg-indigo-500'),
(auth.uid(), 'Eglence', 600.00, '🎉', 'bg-purple-500'),
(auth.uid(), 'Egitim', 800.00, '📚', 'bg-cyan-500'),
(auth.uid(), 'Market', 1200.00, '🛒', 'bg-emerald-500');

-- Kredi karti borclarini guncelle (toplam harcamalara gore)
-- Ziraat Bankkart Combo
UPDATE credit_cards 
SET current_debt = (
    SELECT COALESCE(SUM(amount), 0) 
    FROM transactions 
    WHERE credit_card_id = (SELECT id FROM credit_cards WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid())
    AND type = 'expense'
)
WHERE name = 'Ziraat Bankkart Combo' AND user_id = auth.uid();

-- Garanti BBVA Flexi
UPDATE credit_cards 
SET current_debt = (
    SELECT COALESCE(SUM(amount), 0) 
    FROM transactions 
    WHERE credit_card_id = (SELECT id FROM credit_cards WHERE name = 'Garanti BBVA Flexi' AND user_id = auth.uid())
    AND type = 'expense'
)
WHERE name = 'Garanti BBVA Flexi' AND user_id = auth.uid();

-- YKB World Ogrenci
UPDATE credit_cards 
SET current_debt = (
    SELECT COALESCE(SUM(amount), 0) 
    FROM transactions 
    WHERE credit_card_id = (SELECT id FROM credit_cards WHERE name = 'YKB World Ogrenci' AND user_id = auth.uid())
    AND type = 'expense'
)
WHERE name = 'YKB World Ogrenci' AND user_id = auth.uid();


Write-Host "Sistem temizliği ve kurulum başlatılıyor..." -ForegroundColor Cyan

# npm önbelleğini temizle ve npm'i güncelle
npm cache clean --force
npm install -g npm@latest

# Projeyi oluştur
npx create-next-app@latest gider-takip --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm

# Klasöre gir ve bağımlılıkları yükle
Set-Location gider-takip
npm install lucide-react

Write-Host "`nKurulum başarıyla tamamlandı!" -ForegroundColor Green
Write-Host "1. Canvas'taki App.tsx kodlarını kopyalayın."
Write-Host "2. gider-takip/app/page.tsx dosyasının içine yapıştırın."
Write-Host "3. Dosyanın en üst satırına 'use client'; ekleyin."
Write-Host "4. 'npm run dev' komutuyla projeyi başlatın."
# Kurulum ve Çalıştırma Rehberi

Bu rehber, HesApp.im projesini yerel bilgisayarınızda nasıl çalıştıracağınızı adım adım anlatır.

## Ön Gereksinimler
Projenin çalışabilmesi için bilgisayarınızda aşağıdaki yazılımların kurulu olması gerekmektedir:
1. **Node.js**: v16.0.0 veya üzeri (LTS sürümü önerilir).
2. **Paket Yöneticisi**: npm (Node.js ile gelir) veya pnpm (önerilen).

## Adım 1: Projeyi İndirme
Proje dosyalarını bilgisayarınıza indirin veya Git kullanarak klonlayın:
```bash
git clone https://github.com/kullaniciadi/hesapp-im.git
cd hesapp-im
```

## Adım 2: Bağımlılıkların Yüklenmesi
Proje dizininde terminali açın ve gerekli kütüphaneleri yüklemek için aşağıdaki komutu çalıştırın:

**pnpm kullanıyorsanız (Önerilen):**
```bash
pnpm install
```

**npm kullanıyorsanız:**
```bash
npm install
```

## Adım 3: Uygulamayı Çalıştırma
Geliştirme sunucusunu başlatmak için:

```bash
pnpm run dev
# veya
npm run dev
```

Komutu çalıştırdıktan sonra terminalde `Local: http://localhost:5173/` gibi bir adres göreceksiniz. Bu adresi tarayıcınızda açarak uygulamayı kullanmaya başlayabilirsiniz.

## Adım 4: Üretime Hazır Build Alma (Opsiyonel)
Projeyi canlı sunucuya yüklemek üzere derlemek (build) isterseniz:

```bash
pnpm run build
```
Bu işlem `dist` klasörü altında optimize edilmiş dosyaları oluşturacaktır.

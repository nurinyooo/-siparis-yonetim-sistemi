1# Sipariş Yönetimi ve Kargo Takip Sistemi

Modern web teknolojileri ile geliştirilmiş, küçük ve orta ölçekli işletmeler için kapsamlı bir sipariş yönetim sistemi.

## Özellikler

### Dashboard (Ana Panel)
- Toplam sipariş, bekleyen sipariş, kargodaki ürünler gibi özet istatistikler
- Gelir özeti ve bugünkü siparişler
- Son siparişlerin hızlı görünümü

### Sipariş Yönetimi
- Siparişlerin listelenmesi
- Gelişmiş filtreleme (Durum, Arama, Tarih)
- Sipariş detay görüntüleme
- Sipariş durumu güncelleme (Beklemede, Hazırlanıyor, Kargolandı, Teslim Edildi, İptal)
- Ürün ve müşteri bilgileri

### Kargo Takibi
- Kargo firması seçimi (Aras, MNG, Yurtiçi, PTT, UPS, DHL)
- Takip numarası girişi
- Kargo firması takip sayfasına otomatik yönlendirme
- Kargo durumu görüntüleme

### Barkod Basımı
- Her sipariş için benzersiz barkod üretimi
- QR kod desteği
- Yazdırılabilir kargo etiketi (A4 format)
- Sipariş ve müşteri bilgilerinin etiket üzerinde görünümü

## Teknolojiler

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **UI Framework:** React 18
- **Stil:** Tailwind CSS
- **Barkod:** react-barcode, qrcode.react
- **State Yönetimi:** Context API
- **İkonlar:** Lucide React
- **Tarih İşlemleri:** date-fns

## Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışmaya başlayacak.

### 3. Production Build

```bash
npm run build
npm start
```

## Proje Yapısı

```
siparis-yonetim-sistemi/
├── app/                        # Next.js App Router sayfaları
│   ├── layout.tsx             # Ana layout
│   ├── page.tsx               # Dashboard
│   ├── globals.css            # Global stiller
│   └── orders/                # Sipariş sayfaları
│       ├── page.tsx           # Sipariş listesi
│       └── [id]/              # Dinamik rotalar
│           ├── page.tsx       # Sipariş detay
│           └── print/
│               └── page.tsx   # Yazdırılabilir etiket
├── components/                 # React bileşenleri
│   ├── ui/                    # Temel UI bileşenleri
│   ├── dashboard/             # Dashboard bileşenleri
│   ├── orders/                # Sipariş bileşenleri
│   ├── barcode/               # Barkod bileşenleri
│   ├── cargo/                 # Kargo bileşenleri
│   └── layout/                # Layout bileşenleri
├── lib/                       # Yardımcı kütüphaneler
│   ├── types.ts              # TypeScript tip tanımları
│   ├── utils.ts              # Yardımcı fonksiyonlar
│   └── mock-data.ts          # Sahte veriler
├── context/                   # Context API
│   └── OrderContext.tsx      # Sipariş state yönetimi
└── public/                    # Statik dosyalar
```

## Kullanım

### Dashboard
Ana sayfada sipariş istatistiklerini ve son siparişleri görüntüleyin.

### Sipariş Listesi
- Tüm siparişleri görüntüleyin
- Durum ve arama kriterlerine göre filtreleyin
- Sipariş detaylarına erişin

### Sipariş Detayı
- Sipariş bilgilerini görüntüleyin
- Sipariş durumunu güncelleyin
- Kargo takip bilgilerini girin
- Barkodu görüntüleyin ve yazdırın

### Barkod Yazdırma
- Sipariş detay sayfasından "Yazdır" butonuna tıklayın
- Yazdırılabilir etiket sayfası açılır
- Tarayıcınızın yazdırma özelliğini kullanın

## Veri Yönetimi

Şu anda uygulama mock (sahte) veri kullanmaktadır. Veriler `lib/mock-data.ts` dosyasında tanımlanmıştır.

### Veritabanı Entegrasyonu (Gelecek)

Gerçek bir veritabanı entegre etmek için:

1. **Context API Güncellemesi**: `context/OrderContext.tsx` dosyasındaki fonksiyonları API çağrıları ile değiştirin
2. **API Routes**: `app/api/` klasörü altında Next.js API route'ları oluşturun
3. **Veritabanı**: MongoDB, PostgreSQL veya tercih ettiğiniz veritabanını entegre edin

Örnek API yapısı:
```
app/api/
├── orders/
│   ├── route.ts          # GET, POST siparişler
│   └── [id]/
│       └── route.ts      # GET, PUT, DELETE tek sipariş
```

## Özelleştirme

### Renkler ve Temalar
`tailwind.config.ts` ve `app/globals.css` dosyalarından renk paletini özelleştirebilirsiniz.

### Kargo Firmaları
`lib/mock-data.ts` dosyasındaki `cargoCompanies` dizisine yeni kargo firmaları ekleyebilirsiniz.

### Sipariş Durumları
`lib/types.ts` dosyasındaki `OrderStatus` tipine yeni durumlar ekleyebilirsiniz.

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

**Not:** Bu bir MVP (Minimum Viable Product) uygulamasıdır. Production kullanımı için:
- Gerçek veritabanı entegrasyonu
- Kullanıcı yetkilendirmesi ve authentication
- Gelişmiş hata yönetimi
- Unit ve integration testleri
- SEO optimizasyonu
- Performance optimizasyonları

gereklidir.
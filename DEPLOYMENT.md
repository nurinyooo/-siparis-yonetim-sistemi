1# 🚀 Production Deployment Rehberi

Bu rehber, projenizi **%100 ücretsiz** olarak MongoDB Atlas ve Vercel kullanarak production ortamına almanız için adım adım talimatlar içerir.

---

## 📋 İçindekiler
1. [MongoDB Atlas Kurulumu](#1-mongodb-atlas-kurulumu)
2. [Local Development Setup](#2-local-development-setup)
3. [Vercel Deployment](#3-vercel-deployment)
4. [Production'da Test](#4-productionda-test)

---

## 1. MongoDB Atlas Kurulumu

### Adım 1.1: MongoDB Atlas Hesabı Oluşturma

1. **MongoDB Atlas'a gidin:** https://www.mongodb.com/cloud/atlas/register
2. **Ücretsiz hesap oluşturun** (Gmail ile sign up yapabilirsiniz)
3. **"Create a Free Cluster"** butonuna tıklayın

### Adım 1.2: Cluster Oluşturma

1. **Shared (Ücretsiz)** seçeneğini seçin
2. **Provider:** AWS (tavsiye edilir)
3. **Region:** Europe (Frankfurt) - Size en yakın bölge
4. **Cluster Tier:** M0 Sandbox (FREE FOREVER) ✅
5. **Cluster Name:** siparis-db (veya istediğiniz bir isim)
6. **"Create Cluster"** butonuna tıklayın (2-3 dakika sürebilir)

### Adım 1.3: Database User Oluşturma

1. Sol menüden **"Database Access"** seçin
2. **"Add New Database User"** butonuna tıklayın
3. **Authentication Method:** Password
4. **Username:** admin (veya istediğiniz kullanıcı adı)
5. **Password:** Güçlü bir şifre oluşturun (kaydedin, sonra lazım olacak!)
6. **Database User Privileges:** "Read and write to any database"
7. **"Add User"** butonuna tıklayın

### Adım 1.4: Network Access (IP Whitelist)

1. Sol menüden **"Network Access"** seçin
2. **"Add IP Address"** butonuna tıklayın
3. **"Allow Access from Anywhere"** seçin (0.0.0.0/0)
   - ⚠️ Not: Bu development için. Production'da daha güvenli olması için Vercel IP'lerini ekleyebilirsiniz
4. **"Confirm"** butonuna tıklayın

### Adım 1.5: Connection String Alma

1. Sol menüden **"Database"** (Clusters) seçin
2. Cluster'ınızın yanındaki **"Connect"** butonuna tıklayın
3. **"Connect your application"** seçin
4. **Driver:** Node.js
5. **Version:** 5.5 or later
6. **Connection string'i kopyalayın:**
   ```
   mongodb+srv://admin:<password>@siparis-db.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. `<password>` kısmını gerçek şifrenizle değiştirin
8. Sonuna database ismi ekleyin: `...mongodb.net/siparis-db?retryWrites=true&w=majority`

**Son hali:**
```
mongodb+srv://admin:SİFRENİZ@siparis-db.xxxxx.mongodb.net/siparis-db?retryWrites=true&w=majority
```

---

## 2. Local Development Setup

### Adım 2.1: Environment Variables Oluşturma

1. Proje klasöründe `.env.local` dosyası oluşturun:

```bash
cp .env.example .env.local
```

2. `.env.local` dosyasını açın ve MongoDB connection string'inizi ekleyin:

```env
MONGODB_URI=mongodb+srv://admin:SİFRENİZ@siparis-db.xxxxx.mongodb.net/siparis-db?retryWrites=true&w=majority
NODE_ENV=development
```

### Adım 2.2: Local Test

1. Development sunucusunu başlatın:

```bash
npm run dev
```

2. Tarayıcıda `http://localhost:3000` adresine gidin
3. Bir sipariş oluşturmayı deneyin
4. MongoDB Atlas Dashboard'da **"Browse Collections"** ile verileri kontrol edin

---

## 3. Vercel Deployment

### Adım 3.1: GitHub Repository Oluşturma

1. GitHub'da yeni bir repository oluşturun
2. Projenizi GitHub'a push edin:

```bash
git init
git add .
git commit -m "Initial commit - Production ready"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/siparis-yonetimi.git
git push -u origin main
```

### Adım 3.2: Vercel Hesabı ve Deployment

1. **Vercel'e gidin:** https://vercel.com/signup
2. **GitHub ile Sign Up** yapın
3. **"Import Project"** veya **"New Project"** butonuna tıklayın
4. GitHub repository'nizi seçin
5. **Configure Project:**
   - **Project Name:** siparis-yonetim (otomatik gelecek)
   - **Framework Preset:** Next.js (otomatik tanınır)
   - **Root Directory:** ./ (değiştirmeyin)
   - **Build Command:** `npm run build` (otomatik gelecek)
   - **Output Directory:** `.next` (otomatik gelecek)

### Adım 3.3: Environment Variables Ekleme

**ÇOK ÖNEMLİ:** Deploy etmeden önce environment variables eklemelisiniz!

1. Vercel'de proje ayarlarında **"Environment Variables"** seçin
2. Şu değişkenleri ekleyin:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://admin:...` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

3. **"Deploy"** butonuna tıklayın

### Adım 3.4: Deployment Tamamlandı! 🎉

1. 2-3 dakika içinde deployment tamamlanacak
2. Vercel size bir URL verecek: `https://siparis-yonetim.vercel.app`
3. Bu URL'i ziyaret edin ve test edin!

---

## 4. Production'da Test

### Test Checklist ✅

1. [ ] Ana sayfaya erişim
2. [ ] Yeni sipariş oluşturma
3. [ ] Sipariş listesini görüntüleme
4. [ ] Sipariş detaylarına bakma
5. [ ] Sipariş durumu güncelleme
6. [ ] Tekrar sipariş uyarısı (aynı telefon ile)
7. [ ] Dashboard istatistikleri
8. [ ] Kargo takip ekleme

### MongoDB'de Veri Kontrolü

1. MongoDB Atlas Dashboard'a gidin
2. **"Browse Collections"** tıklayın
3. **"orders"** collection'ını görüntüleyin
4. Verilerinizin düzgün kaydedildiğini kontrol edin

---

## 🔧 Troubleshooting (Sorun Giderme)

### Hata: "MongooseError: The `uri` parameter to `openUri()` must be a string"

**Çözüm:**
- `.env.local` dosyasında `MONGODB_URI` tanımlı mı kontrol edin
- Vercel'de environment variables eklenmiş mi kontrol edin

### Hata: "MongoServerError: bad auth : authentication failed"

**Çözüm:**
- MongoDB Atlas kullanıcı şifresi doğru mu kontrol edin
- Connection string'de `<password>` kısmını gerçek şifre ile değiştirdiniz mi?

### Hata: "Network Error" veya "ENOTFOUND"

**Çözüm:**
- MongoDB Atlas'ta Network Access'de IP whitelist kontrol edin
- 0.0.0.0/0 ekli mi kontrol edin

### Vercel'de Build Error

**Çözüm:**
- `npm run build` komutunu local'de çalıştırıp hata var mı kontrol edin
- TypeScript hatalarını düzeltin

---

## 🎯 Sonraki Adımlar

### Önerilen İyileştirmeler:

1. **Custom Domain:**
   - Vercel'de kendi domain'inizi ekleyebilirsiniz
   - Örnek: `siparisim.com`

2. **Güvenlik:**
   - Authentication ekleyin (NextAuth.js)
   - API Route'larına middleware ekleyin
   - Rate limiting ekleyin

3. **Analytics:**
   - Vercel Analytics (ücretsiz)
   - Google Analytics

4. **Email Bildirimleri:**
   - Yeni sipariş geldiğinde email
   - Resend.com veya SendGrid (ücretsiz planlar var)

5. **Backup:**
   - MongoDB Atlas otomatik backup yapıyor (ücretsiz planda 2 gün)

---

## 💰 Maliyet Özeti

| Servis | Plan | Maliyet |
|--------|------|---------|
| **MongoDB Atlas** | M0 Sandbox | ✅ **ÜCRETSİZ** (512MB) |
| **Vercel** | Hobby | ✅ **ÜCRETSİZ** |
| **GitHub** | Public Repo | ✅ **ÜCRETSİZ** |
| **TOPLAM** | - | ✅ **0 TL / AY** |

---

## 📞 Destek

Sorun yaşarsanız:
1. MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
2. Vercel Docs: https://vercel.com/docs
3. Next.js Docs: https://nextjs.org/docs

---

**🎉 Tebrikler! Projeniz artık production'da çalışıyor!** 🚀
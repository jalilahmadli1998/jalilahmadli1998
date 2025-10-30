# Gelişmiş Mühendislik & Üretim Web Sitesi

Bu depo, **AEM Precision** markası için çok dilli (Türkçe, İngilizce, Rusça) ve yüksek performans gereksinimlerini karşılayan üretim web sitesini içerir. Proje Next.js 14, TypeScript, Tailwind CSS ve Framer Motion kullanılarak geliştirilmiştir.

## Özellikler
- 🌐 Üç dil desteği ve hreflang etiketleri ile SEO uyumlu i18n yönlendirme
- ⚙️ SSR + ISR mimarisi, dinamik bileşen ayrıştırma ve `next/image` optimizasyonu
- ♿ WCAG 2.2 AA uyumlu bileşenler, klavye navigasyonu ve reduce-motion desteği
- 📈 Schema.org, OpenGraph, Twitter Card, sitemap ve robots yapılandırması
- 🔒 Güvenlik başlıkları, honeypot yaklaşımı, reCAPTCHA entegrasyonu için hazır form
- 🧪 RFQ çok adımlı form için doğrulama testleri ve kritik bileşen snapshot testleri

## Kurulum
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
3. Üretim derlemesi:
   ```bash
   npm run build
   npm run start
   ```

> Not: Bu ortamda npm kayıt deposuna erişim kısıtlı olabilir. Gerekirse şirket içi registry veya offline paketler kullanın.

## Çevre Değişkenleri
`.env.example` dosyasını kopyalayarak `.env.local` oluşturun.
- `NEXT_PUBLIC_RECAPTCHA_KEY`: Google reCAPTCHA v3 site anahtarı
- `RECAPTCHA_SECRET_KEY`: Sunucu tarafı doğrulama anahtarı
- `EMAIL_SMTP_*`: SPF/DKIM uyumlu e-posta gönderimi için SMTP bilgileri

## İçerik Yönetimi
- Statik içerikler `src/content/dictionaries/*.json` dosyalarında tutulur.
- Blog yazıları ve veri kartları bu JSON dosyalarından okunur. Headless CMS entegrasyonu için bu dosyaları dinamik veri kaynağı ile değiştirebilirsiniz.

## Testler
- Jest ve Testing Library ile snapshot ve form doğrulama testleri eklenmiştir.
- Testleri çalıştırmak için:
  ```bash
  npm test
  ```

## Dağıtım
- Proje Vercel veya benzeri platformlarda ISR destekli olarak dağıtılabilir.
- CDN üzerinden görüntü optimizasyonu ve HTTP/2 ön getirme (prefetch) yapılandırmaları Next.js tarafından otomatik sağlanır.

## CMS Opsiyonları
- Statik Markdown dosyaları (`content/blog`) veya Contentful, Sanity gibi headless CMS’ler API route'ları üzerinden entegre edilebilir.
- RFQ formları için harici ERP/MES sistemlerine webhooks veya GraphQL API'leri ile bağlanabilirsiniz.

## Lisans
Bu proje özel bir müşteri projesidir.

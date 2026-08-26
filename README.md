# ArızaNerede

ArızaNerede; cihaz türü → marka → seri/model ailesi → tam model → arıza kodu/belirti hiyerarşisiyle çalışan, resmî kaynak doğrulamalı bir cihaz sorun giderme ve yönlendirme projesidir.

## Temel ilkeler

- Her kalıcı sorun sayfası tek kanonik niyet merkezi olur.
- Resmî üretici destek/kılavuz/yazılım kaynakları önceliklidir.
- Güvenlik seviyesi içerik şemasının parçasıdır; yüksek riskli işlemlerde DIY adımı verilmez.
- Yetkili servis yönlendirmesi üreticinin Türkiye kaynağı ve gerektiğinde SERBİS ile doğrulanır.
- Çözülmeyen garanti/servis/tüketici uyuşmazlıkları ilgili `nereyebasvurulur.com` rotasına bağlanır.
- Site içi arama ve filtre URL’leri indeks hedefi değildir; SEO kalıcı hiyerarşik sayfalarda kurulur.

## Katalog veri katmanları

- `src/catalog-data/market.js`: Akakçe kategori ve yakın alt kategori keşif sinyalleri. Teknik destek veya servis kanıtı olarak kullanılmaz.
- `src/catalog-data/brands.js`: Markaların Türkiye resmî site, destek, kılavuz/yazılım ve yetkili servis kanalları.
- `src/catalog-data/home.js`: Robot/dikey süpürge ve kahve makinesi modelleri.
- `src/catalog-data/computing.js`: Dizüstü ve masaüstü bilgisayar modelleri.
- `src/catalog-data/display-print.js`: Televizyon ve yazıcı modelleri.
- `src/catalog-data/climate-mobility.js`: Klima ve elektrikli scooter modelleri.
- `src/catalog-data/helpers.js`: Yayın koşullarıyla uyumlu model şeması ve kategori bazlı güvenli belirti kümeleri.

Tam model rotası; model kodu, HTTPS resmî destek ve kılavuz kaynağı, kaynaklı belirti kümesi ve pazar keşif rolü bulunmadan sitemap'e girmez. Marka–kategori kaydı olup bu koşulları karşılayan model yoksa sayfa `noindex` support-only durumda kalır. Dashboard kapsam oranları, support-only çiftler, model başına belirti kapsamı ve placeholder sayısını doğrudan bu veriden hesaplar.

## Kontrol

```bash
pnpm install
pnpm run check
```

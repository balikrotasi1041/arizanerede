// Akakçe yalnızca Türkiye pazarında fiilen listelenen envanteri keşfetmek için kullanılır.
// Ürün desteği, kılavuz, yazılım veya yetkili servis kaynağı olarak kullanılmaz.
export const marketInventory=[
  {deviceType:"robot-supurge",sourceUrl:"https://www.akakce.com/robot-supurge.html",observedListings:1036,observedAt:"2026-08-25",note:"Renk ve paket varyantları ayrı ticari kayıt oluşturabilir."},
  {deviceType:"dikey-supurge",sourceUrl:"https://www.akakce.com/dikey-supurge.html",observedListings:1740,observedAt:"2026-08-25",subgroups:["Kablosuz dikey süpürge","Islak-kuru dikey süpürge"]},
  {deviceType:"kahve-makinesi",sourceUrl:"https://www.akakce.com/kahve-makinesi.html",observedListings:null,observedAt:"2026-08-25",subgroups:[{name:"Espresso makinesi",sourceUrl:"https://www.akakce.com/espresso-makinesi.html",observedListings:900},{name:"Filtre kahve makinesi",sourceUrl:"https://www.akakce.com/filtre-kahve-makinesi.html",observedListings:835},{name:"Kapsül kahve makinesi",sourceUrl:"https://www.akakce.com/kapsul-kahve-makinesi.html",observedListings:180}]},
  {deviceType:"dizustu-bilgisayar",sourceUrl:"https://www.akakce.com/laptop-notebook.html",observedListings:196648,observedAt:"2026-08-25",note:"Bellek, depolama, işletim sistemi ve renk SKU'ları ayrı ticari kayıt olabilir."},
  {deviceType:"masaustu-bilgisayar",sourceUrl:"https://www.akakce.com/bilgisayar-masaustu.html",observedListings:126674,observedAt:"2026-08-25",subgroups:["Marka masaüstü bilgisayar","Masaüstü oyun bilgisayarı"],note:"Toplama sistem ve bileşen kombinasyonları toplamı büyütür; katalog üretici model koduna göre tekilleştirilir."},
  {deviceType:"televizyon",sourceUrl:"https://www.akakce.com/televizyon.html",observedListings:1700,observedBrands:81,observedAt:"2026-08-25",note:"Ekran boyu aynı seri içinde ayrı tam model kodudur."},
  {deviceType:"yazici",sourceUrl:"https://www.akakce.com/yazici.html",observedListings:null,observedAt:"2026-08-25",subgroups:[{name:"Lazer yazıcı",sourceUrl:"https://www.akakce.com/lazer-yazici.html",observedListings:525},{name:"Mürekkep püskürtmeli yazıcı",sourceUrl:"https://www.akakce.com/murekkep-puskurtmeli-yazici.html",observedListings:293}],note:"3D, barkod, kart ve endüstriyel yazıcılar bu tüketici sorun giderme kapsamından ayrı tutulur."},
  {deviceType:"klima",sourceUrl:"https://www.akakce.com/klima.html",observedListings:2954,observedBrands:107,observedAt:"2026-08-25",subgroups:["Duvar tipi split klima","Mobil klima"]},
  {deviceType:"elektrikli-scooter",sourceUrl:"https://www.akakce.com/elektrikli-scooter.html",observedListings:221,observedAt:"2026-08-25",note:"Renk ve kasklı paket varyantları aynı model altında tekilleştirilir."}
];

export const marketInventoryByDevice=new Map(marketInventory.map(x=>[x.deviceType,x]));

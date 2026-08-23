const HUB="https://onvo.com.tr/bilgi-merkezi";
const mk=(slug,name,manualUrl=HUB,note="ONVO resmî Bilgi Merkezi")=>({
  deviceType:"elektrikli-scooter",brand:"onvo",family:"elektrikli-scooter-modelleri",slug,name,
  supportUrl:HUB,manualUrl,
  softwareResources:[],officialLabel:note
});

export const scooterFamilies=[
  {deviceType:"elektrikli-scooter",brand:"onvo",slug:"elektrikli-scooter-modelleri",name:"Elektrikli Scooter Modelleri",catalogBasis:"ONVO resmî Bilgi Merkezi model envanteri"}
];

export const scooterModels=[
  mk("rx-09","RX-09","https://files.onvo.com.tr/pdf/SC/RX09-KK.pdf"),
  mk("rx-04","RX-04","https://files.onvo.com.tr/pdf/SC/RX04-KK.pdf"),
  mk("mx-02","MX-02","https://files.onvo.com.tr/pdf/SC/MX02-KK.pdf"),
  mk("ov-013-x-plus","OV-013 X PLUS","https://files.onvo.com.tr/pdf/SC/013XPK-KK.pdf","ONVO OV-013 X PLUS resmî kullanım kılavuzu (kontaklı sürüm)"),
  mk("ov-012-x-plus","OV-012 X PLUS","https://files.onvo.com.tr/pdf/SC/012XPK-KK.pdf","ONVO OV-012 X PLUS resmî kullanım kılavuzu (kontaklı sürüm)"),
  mk("ov-012","OV-012","https://files.onvo.com.tr/pdf/SC/012K-KK.pdf","ONVO OV-012 resmî kullanım kılavuzu (kontaklı sürüm)"),
  mk("ov-007x","OV-007X","https://files.onvo.com.tr/pdf/SC/007X-KK.pdf"),
  mk("kx-03p","KX-03P","https://files.onvo.com.tr/pdf/SC/KX03-KK.pdf"),
  mk("kx-02k","KX-02K","https://files.onvo.com.tr/pdf/SC/KX02-KK.pdf"),
  mk("kx-01k","KX-01K"),
  mk("kx-01m","KX-01M"),
  mk("kx-01s","KX-01S"),
  mk("rx-10","RX-10"),
  mk("mx-01","MX-01","https://files.onvo.com.tr/pdf/SC/MX01-KK.pdf"),
  mk("mx-03","MX-03","https://files.onvo.com.tr/pdf/SC/MX03-KK.pdf"),
  mk("ov-008","OV-008"),
  mk("rx-05","RX-05"),
  mk("rx-07","RX-07","https://files.onvo.com.tr/pdf/SC/RX07-KK.pdf"),
  mk("kx-03k","KX-03K","https://files.onvo.com.tr/pdf/SC/KX03-KK.pdf"),
  mk("kx-03m","KX-03M","https://files.onvo.com.tr/pdf/SC/KX03-KK.pdf"),
  mk("ov-011","OV-011"),
  mk("rx-01","RX-01"),
  mk("rx-06p","RX-06 PLUS","https://files.onvo.com.tr/pdf/SC/RX06P-KK.pdf"),
  mk("ov-007","OV-007"),
  mk("sb-800","SB-800","https://files.onvo.com.tr/pdf/SC/SB800-KK.pdf")
];

 Healty Track

Multipl Miyelom hastaları için günlük yaşamı, ağrı durumunu ve tedavi sürecini takip etmeyi kolaylaştırmak amacıyla geliştirilmiş bir mobil uygulamadır. React Native ve Expo go kullanılarak hazırlanmıştır.

### Özellikler

- **Ana Panel (Dashboard)**: Profil, hatırlatmalar, hastalık eğitim içerikleri, günlük, sağlık akışı, hareket takibi ve geri bildirim ekranlarına hızlı erişim.
- **Profil**: Kullanıcı adı, tema (gece/gündüz modu) ve yazı boyutu ayarları; tümü kalıcı olarak saklanır.
- **Hatırlatmalar**
  - İki sabit hatırlatma alanı: **İlaç Hatırlatma Saati** ve **Doktor Randevusu**.
  - Her ikisi için tarih (opsiyonel) ve saat bilgisi girilebilir.
  - Bilgiler yerel depolamaya kaydedilir, uygulama kapansa bile kaybolmaz.
- **Günlüğüm**
  - Günlük ağrı skoru (0–10 arası) ve not girme.
  - Kayıtlar zaman damgası ile saklanır ve geçmiş liste şeklinde görüntülenir.
- **Hareket Takibi**
  - Günlük yapılacak egzersiz/hareket listesi.
  - Yapıldı/ yapılmadı durumları ile ilerleme çubuğu.
  - Liste ve durumlar kalıcı olarak saklanır.
- **Hastalıklarım (Eğitim İçerikleri)**
  - Multipl Miyelom ile ilgili sabit bilgilendirici içerikler.
  - Kullanıcı yeni eğitim başlıkları ekleyebilir veya mevcutları silebilir.
  - Tüm eğitim konuları kalıcı olarak saklanır.
- **Sağlık Akışı**
  - Yönetici tarafından tanımlanmış bilgilendirici paylaşımlar.
  - Kullanıcı yorum ekleyebilir, beğenme/beğenmeme yapabilir.
  - Kullanıcı yorumları kalıcı olarak saklanır.
- **Görüşlerim (Feedback)**
  - Uygulamayı 1–5 yıldız arasında puanlama.
  - Verilen son puan yerel depolamada saklanır ve yeniden açıldığında korunur.

### Teknik Yapı

- **Teknolojiler**
  - React Native
  - Expo go
  - AsyncStorage (`@react-native-async-storage/async-storage`) ile yerel veri saklanır
 
  - mobil ugulamamın içeri hakkında video : https://youtu.be/PvtXS7JRM2Q



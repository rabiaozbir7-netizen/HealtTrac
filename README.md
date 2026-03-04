## HealTrack

Multipl Miyelom hastaları için günlük yaşamı, ağrı durumunu ve tedavi sürecini takip etmeyi kolaylaştırmak amacıyla geliştirilmiş bir mobil uygulamadır. React Native ve Expo Router kullanılarak hazırlanmıştır.

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
  - Expo (Managed Workflow)
  - Expo Router
  - AsyncStorage (`@react-native-async-storage/async-storage`) ile yerel veri saklama


- **Önemli dosyalar**
  - `app/index.js`: Ana panel (dashboard) ekranı.
  - `app/reminders.js`: Hatırlatmalar ekranı.
  - `app/diary.js`: Günlük/ağrı takibi ekranı.
  - `app/health.js`: Günlük hareket takibi ekranı.
  - `app/education.js`: Hastalık eğitim içerikleri.
  - `app/suggestions.js`: Sağlık akışı ve kullanıcı yorumları.
  - `app/profile.js`: Profil ve görünüm ayarları.
  - `app/feedback.js`: Puanlama (görüşlerim) ekranı.
  - `utils/storage.js`: Tüm kalıcı verilerin yönetildiği yardımcı fonksiyonlar (AsyncStorage).
  - `context/SettingsContext.js`: Tema ve yazı boyutu gibi uygulama genel ayarları.

### Kurulum

1. **Bağımlılıkları yükle**

```bash
npm install
```

2. **Geliştirme sunucusunu başlat**

Mobil (Android/iOS emülatör veya Expo Go uygulaması ile):

```bash
npx expo start
```

Web (tarayıcıda çalıştırmak için):

```bash
npx expo start --web
```

### Geliştirme Notları

- Uygulamadaki çoğu veri (profil, hatırlatmalar, hareketler, günlük kayıtları, eğitim başlıkları, sağlık akışı yorumları, puanlama) **AsyncStorage** ile yerel olarak saklanır.
- Kullanıcı yeni veri eklediğinde veya bir alanı değiştirdiğinde, uygulama kapatılıp açılsa bile kayıtlar korunur.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

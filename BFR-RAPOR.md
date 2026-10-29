# BFR PS4 HOST

Türkçe, lacivert ve mavi tasarımlı PS4 kontrol merkezi. Ana ekran firmware, GoldHEN ve çevrimdışı kullanım durumlarını gösterir. Otomatik başlatma varsayılan olarak kapalıdır; gelişmiş ayarlardan açılır.

## Tarayıcıdan kullanım

Proje dizininde `node bfr-serve.cjs` çalıştırın. Bilgisayar tarayıcısında `http://localhost:8080/g2all/index.html` adresini açın. Arayüz ve ayarlar kullanılabilir. Jailbreak işlemi desteklenen PS4 tarayıcısı ve PS4 donanımı gerektirir; bilgisayar tarayıcısından konsola uzaktan jailbreak uygulanmaz.

Aynı ağdaki PS4 tarayıcısında `http://BILGISAYARIN_YEREL_IP_ADRESI:8080/g2all/index.html` adresini açın. İlk kullanımda önbellek kurulumunu tamamlayın, tarayıcıyı kapatıp yeniden açın ve JAILBREAK BAŞLAT düğmesini kullanın. Sunucuyu durdurmak için Ctrl+C kullanın.

## Düzenlenen dosyalar

- [Host ekranı](g2all/index.html): BFR markası, Türkçe kullanım akışı; referans adları ve eski menü bağlantısı kaldırıldı.
- [Arayüz kontrolü](g2all/bfr-ui.js): BFR durum mesajları ve bilgisayarda tarayıcı modu açıklaması.
- [12.00 önbellek ekranı](g2all/cacheslopkit.html) ve diğer cache ekranları: BFR başlıkları; referans tanıtımları kaldırıldı.
- Beş manifest: bu arayüz düzenlemesi için cache sürümü v2.
- [Stil](g2all/bfr.css), [başlatıcı](g2all/bfr-launch.js), [yerel sunucu](bfr-serve.cjs) ve [test](bfr-check.cjs) kullanılmaya devam eder.

Exploit ve payload dosyaları değiştirilmedi. İlerleme çizgisi yüzdelik tahmin değildir. Başarı yalnızca yükleme akışının bildiriminden gösterilir.

## Doğrulama

`node bfr-check.cjs` ile JS sözdizimi, 12.00 başlangıç yolu, çift tıklama engeli, otomatik başlatma, önbellek yönlendirmesi, başarı/hata bildirimi ve cihaz kontrolleri test edilir. Beş manifestteki 124 kaynak girdisi kontrol edilir. `git diff --check` fark biçimini denetler.

Gerçek PS4 12.00 jailbreak ve internet kapalı yeniden açılış testi henüz yapılmadı. Masaüstü tarayıcıda arayüzün çalışması jailbreak başarısını doğrulamaz. PS4 önbelleği Application Cache kullanır; bu özellik bulunmayan masaüstü tarayıcılar için çevrimdışı destek vaat edilmez.

## GitHub Pages

1. Değişiklikleri inceleyip `bfr-ps4-host` dalında commit oluşturun.
2. `git push -u origin bfr-ps4-host` ile dalı gönderin.
3. GitHub Settings → Pages → Deploy from a branch alanında `bfr-ps4-host` ve `/(root)` seçin.
4. GitHub'ın gösterdiği adresi PS4 tarayıcısında açın ve önbelleği güncelleyin.

## Geri dönüş

Çalışmayı commit veya `git stash push -u -m "BFR work before rollback"` ile saklayın. Ardından `git switch bfr-original-backup` kullanın. Yayında geri dönüş için Pages dalını `main` seçin ve PS4 önbelleğini yeniden kurun. BFR sürümü commit edildi ve kendi GitHub deposuna gönderildi.

Tarayıcı kontrolü: Yerel sunucu HTTP 200 yanıtı verdi; BFR ekranı masaüstü tarayıcısında açıldı. Editör tanılaması ve Git fark biçimi kontrolünde hata bulunmadı.

## Yayın adresi

BFR adresi: https://rstmkkc.github.io/

Depo: https://github.com/RstmKkc/RstmKkc.github.io

Pages kaynağı: bfr-ps4-host dalı, kök dizin. PS4 tarayıcısında kısa adres yeterlidir; bilgisayarın açık olması gerekmez. İlk önbellek kurulumu için internet gerekir.

## Cam tasarım güncellemesi

BFR ana ekranına cam paneller, mavi ışık ve kenar parıltıları eklendi. Bulanıklık desteklemeyen tarayıcılarda yarı saydam renkler ve gölgeler kullanılır. Depo tanıtımı BFR olarak yenilendi; eski menü adresi ana ekrana yönlenir. Exploit ve payload dosyaları değiştirilmedi.

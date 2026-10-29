(function () {
    'use strict';
    function el(id) { return document.getElementById(id); }
    var cache = window.applicationCache;
    var started = false;
    var timer;
    var match = navigator.userAgent.match(/PlayStation 4[ /]([\d.]+)/i);
    el('firmware').textContent = match ? match[1] : 'PS4 algılanmadı';
    function cacheStatus() {
        var labels = ['Kurulu değil', 'Önbellek hazır', 'Güncelleme kontrolü', 'İndiriliyor', 'Yenileme gerekli', 'Önbellek geçersiz'];
        el('offline').textContent = cache ? labels[cache.status] || 'Bilinmiyor' : 'Tarayıcı desteklemiyor';
    }
    function sync() {
        var raw = el('msgs').textContent;
        var state = el('state').textContent;
        var text = state || 'İşlem başlatıldı; sonuç bekleniyor.';
        var mode = 'running';
        if (/Failed to Load|Content not Found|No offsets/.test(raw) || /REBOOT/.test(state)) {
            text = 'İşlem hata bildirdi. Konsolu yeniden başlatın. Ayrıntılar gelişmiş ayarlarda.';
            el('goldhen').textContent = 'Başarı doğrulanmadı'; mode = 'error';
        } else if (/GoldHEN.*Loaded/.test(raw)) {
            text = /Already/.test(raw) ? 'GoldHEN zaten yüklü.' : 'GoldHEN yükleme işlemi başarı bildirdi.';
            el('goldhen').textContent = 'Yüklendi'; mode = 'success';
        } else if (/Unsupported Firmware|Only for PS4/.test(raw)) {
            text = 'Bu cihaz veya firmware sistem tarafından desteklenmiyor.'; mode = 'error';
        }
        var translations = {'running the primitive...':'Tarayıcı aşaması çalışıyor…','scanning libkernel for syscall stubs...':'Sistem hazırlığı sürüyor…','wiring the worker...':'İş parçacığı hazırlanıyor…','setting up the aio batches...':'İşlem hazırlanıyor…','racing...':'Çekirdek aşaması çalışıyor…','stage 8: jailbreak...':'Jailbreak aşaması çalışıyor…','stage 9: kernel patches...':'Çekirdek yamaları uygulanıyor…','stage 10: loading the payload...':'GoldHEN yükleme aşaması çalışıyor…'};
        el('message').textContent = translations[text] || text;
        el('panel').className = 'panel ' + mode;
        el('detail').textContent = raw + '\n' + state;
        if (mode !== 'running') { clearInterval(timer); }
    }
    el('start').onclick = function () {
        if (started) { return; }
        started = true;
        el('start').disabled = true;
        el('auto').disabled = true;
        el('goldhen').textContent = 'Kontrol ediliyor';
        el('panel').className = 'panel running';
        el('message').textContent = 'İşlem başlatılıyor…';
        timer = setInterval(sync, 500);
        window.bfrStart();
    };
    el('settings-button').onclick = function () {
        var open = el('settings').className === 'settings hidden';
        el('settings').className = open ? 'settings' : 'settings hidden';
        this.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    try { el('auto').checked = localStorage.getItem('bfr-auto') === '1'; } catch (e) {}
    el('auto').onchange = function () {
        try { localStorage.setItem('bfr-auto', this.checked ? '1' : '0'); }
        catch (e) { el('preference').textContent = 'Tercih kaydedilemedi; bu oturumla sınırlı.'; }
    };
    if (!match) {
        el('start').disabled = true;
        el('message').textContent = 'BFR tarayıcı modu açık. Ayarları kullanabilirsiniz. Jailbreak için bu adresi PS4 tarayıcısında açın.';
    } else if (!(parseFloat(match[1]) === 5.05 || parseFloat(match[1]) === 5.07 || (parseFloat(match[1]) >= 7 && parseFloat(match[1]) <= 8.52) || (parseFloat(match[1]) >= 9 && parseFloat(match[1]) <= 9.60) || (parseFloat(match[1]) >= 10 && parseFloat(match[1]) <= 11.02) || (parseFloat(match[1]) >= 11.50 && parseFloat(match[1]) <= 12.02) || (parseFloat(match[1]) >= 12.50 && parseFloat(match[1]) <= 13.00) || (parseFloat(match[1]) >= 13.02 && parseFloat(match[1]) <= 13.52))) {
        el('start').disabled = true;
        el('message').textContent = 'Bu firmware sistem tarafından desteklenmiyor.';
    } else if (!cache) {
        el('start').disabled = true;
        el('message').textContent = 'Bu PS4 tarayıcısında gerekli önbellek desteği bulunamadı.';
    }
    cacheStatus();
    if (cache) {
        var events = ['checking','downloading','cached','noupdate','updateready','obsolete','error'];
        for (var i = 0; i < events.length; i++) { cache.addEventListener(events[i], cacheStatus, false); }
    }
    if (el('auto').checked && !el('start').disabled) { el('start').click(); }
}());

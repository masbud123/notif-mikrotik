function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function mintaIzinNotifikasi() {
    console.log("🔄 Meminta izin notifikasi...");
    
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
            console.log("🔔 Status izin:", permission);

            if (permission === "granted") {
                console.log("✅ Notifikasi diizinkan!");
                
                // Simpan status di localStorage
                localStorage.setItem("notif_allowed", "true");

                // Daftarkan Service Worker untuk push notif
                navigator.serviceWorker.register("sw.js")
                    .then(reg => console.log("✅ Service Worker terdaftar:", reg))
                    .catch(err => console.error("❌ Gagal daftar Service Worker:", err));

                // Redirect kembali ke halaman login setelah 1 detik
                setTimeout(() => {
                    const redirectUrl = getParameterByName("redirect");
                    if (redirectUrl) {
                        console.log("🔄 Redirect ke halaman login:", redirectUrl);
                        window.location.href = redirectUrl;
                    }
                }, 1000);
            } else {
                console.log("❌ Izin notifikasi ditolak!");
                alert("⚠️ Anda harus mengaktifkan notifikasi agar bisa login.");
            }
        });
    } else {
        alert("❌ Browser tidak mendukung notifikasi.");
    }
}

// Cek apakah izin sudah diberikan
document.addEventListener("DOMContentLoaded", function () {
    console.log("🔍 Memeriksa status izin...");

    if (localStorage.getItem("notif_allowed") === "true") {
        console.log("✅ Izin notifikasi sudah diberikan sebelumnya.");
        const redirectUrl = getParameterByName("redirect");
        if (redirectUrl) {
            console.log("🔄 Redirect otomatis ke halaman login:", redirectUrl);
            window.location.href = redirectUrl;
        }
    }
});

function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function mintaIzinNotifikasi() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                localStorage.setItem("notif_allowed", "true");
                alert("✅ Notifikasi diizinkan!");

                // Daftarkan Service Worker
                navigator.serviceWorker.register("sw.js")
                    .then(reg => console.log("✅ Service Worker terdaftar:", reg))
                    .catch(err => console.error("❌ Gagal daftar Service Worker:", err));

                // Redirect setelah 1 detik (menghindari masalah redirect di Android)
                setTimeout(() => {
                    const redirectUrl = getParameterByName("redirect");
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    }
                }, 1000);
            } else {
                alert("❌ Izin notifikasi ditolak! Harap aktifkan di pengaturan browser.");
            }
        });
    } else {
        alert("❌ Browser tidak mendukung notifikasi.");
    }
}

// Jika izin sudah diberikan, langsung redirect
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("notif_allowed") === "true") {
        const redirectUrl = getParameterByName("redirect");
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }
});

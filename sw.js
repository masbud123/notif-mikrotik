self.addEventListener("install", event => {
    console.log("✅ Service Worker Terpasang");
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("✅ Service Worker Aktif");
});

self.addEventListener("push", event => {
    console.log("📢 Push Notifikasi diterima!");

    const options = {
        body: "Notifikasi ini muncul secara otomatis!",
        icon: "icon.png",
        badge: "badge.png"
    };

    event.waitUntil(
        self.registration.showNotification("Hotspot Notification", options)
    );
});

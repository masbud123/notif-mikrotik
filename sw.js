self.addEventListener('push', function(event) {
    const options = {
        body: 'Ini adalah notifikasi dari server!',
        icon: 'icons/icon.png',
        badge: 'icons/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification('Hotspot Mikrotik', options)
    );
});

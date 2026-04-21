(function () {

    const MIN_DELAY = 1 * 60 * 1000;
    const MAX_DELAY = 4 * 60 * 1000;

    function getRandomDelay() {
        return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
    }

    function canShowAd() {
        const last = sessionStorage.getItem("lastAdTime");
        if (!last) return true;

        const now = Date.now();
        const delay = sessionStorage.getItem("adDelay");

        return (now - last) > delay;
    }

    function showAd() {
        window.open("https://your-adsterra-direct-link.com", "_blank");

        sessionStorage.setItem("lastAdTime", Date.now());
        sessionStorage.setItem("adDelay", getRandomDelay());
    }

    function handleClick(e) {
        if (canShowAd()) {
            showAd();
        }
    }

    // 👇 IMPORTANT: passive listener, remove nahi karna
    document.addEventListener("click", handleClick, { passive: true });

})();

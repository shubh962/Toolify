(function () {

    const MIN_DELAY = 1 * 60 * 1000;  // 1 min
    const MAX_DELAY = 4 * 60 * 1000;  // 4 min

    function getRandomDelay() {
        return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
    }

    function canShowAd() {
        const lastAdTime = sessionStorage.getItem("lastAdTime");

        if (!lastAdTime) return true;

        const now = Date.now();
        const delay = sessionStorage.getItem("adDelay");

        return (now - lastAdTime) > delay;
    }

    function markAdShown() {
        sessionStorage.setItem("lastAdTime", Date.now());
        sessionStorage.setItem("adDelay", getRandomDelay());
    }

    function loadAd() {
        const script = document.createElement("script");
        script.src = "https://pl29209918.profitablecpmratenetwork.com/27/ef/d9/27efd9b5d96e77f31282f288b5d9ca58.js";
        script.async = true;
        document.body.appendChild(script);
    }

    function handleInteraction() {
        if (canShowAd()) {
            loadAd();
            markAdShown();
        }

        document.removeEventListener("click", handleInteraction);
    }

    document.addEventListener("click", handleInteraction);

})();

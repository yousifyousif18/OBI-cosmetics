/* =========================================================
   OBI LOVE — ANIMATED COUNTERS
========================================================= */

// Start the customer video on page load, independently of scroll animations.
const customerLoveVideo = document.getElementById("customer-love-video");

if (customerLoveVideo) {
    customerLoveVideo.muted = true;
    customerLoveVideo.defaultMuted = true;
    customerLoveVideo.loop = true;
    customerLoveVideo.playsInline = true;

    function startCustomerLoveVideo() {
        if (!customerLoveVideo.paused) return;
        const playback = customerLoveVideo.play();
        if (playback) playback.catch(function () {
            // The browser may defer autoplay until media is ready or a user interacts.
        });
    }

    customerLoveVideo.addEventListener("canplay", startCustomerLoveVideo);
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) startCustomerLoveVideo();
    });
    document.addEventListener("pointerdown", startCustomerLoveVideo, { once: true, passive: true });
    startCustomerLoveVideo();
}

const obiCounters =
    document.querySelectorAll(".obi-counter");


function animateObiCounter(counter) {

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        counter.textContent = Number(counter.dataset.target).toLocaleString() + (counter.dataset.suffix || "");
        return;
    }

    const target =
        Number(counter.dataset.target);

    const suffix =
        counter.dataset.suffix || "";

    const duration = 1800;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
           Smooth ease-out animation
        */

        const easedProgress =
            1 - Math.pow(
                1 - progress,
                4
            );


        const currentValue =
            Math.floor(
                target * easedProgress
            );


        counter.textContent =
            currentValue.toLocaleString()
            + suffix;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target.toLocaleString()
                + suffix;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   START WHEN SECTION ENTERS SCREEN
========================================================= */

const obiCounterObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(
                function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const counter =
                        entry.target;


                    animateObiCounter(
                        counter
                    );


                    observer.unobserve(
                        counter
                    );

                }
            );

        },

        {
            threshold: 0.45
        }

    );


obiCounters.forEach(
    function (counter) {

        obiCounterObserver.observe(
            counter
        );

    }
);

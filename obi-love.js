/* =========================================================
   OBI LOVE — ANIMATED COUNTERS
========================================================= */

const obiCounters =
    document.querySelectorAll(".obi-counter");


function animateObiCounter(counter) {

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
/* =========================================
   OBI SHADE PARADE
========================================= */

const shadeParadeTrack =
    document.getElementById(
        "shade-parade-track"
    );


if (shadeParadeTrack) {

    const homepageShades = [];


    products.forEach(
        function (product) {

            if (
                !Array.isArray(product.shades)
            ) {
                return;
            }


            product.shades.forEach(
                function (shade) {

                    /*
                        Prevent duplicate shade names
                        appearing several times.
                    */

                    const alreadyAdded =
                        homepageShades.some(
                            function (item) {

                                return (
                                    item.name ===
                                    shade.name
                                );

                            }
                        );


                    if (!alreadyAdded) {

                        homepageShades.push({

                            name:
                                shade.name,

                            color:
                                shade.color,

                            category:
                                product.category

                        });

                    }

                }
            );

        }
    );


    /*
        Limit the homepage strip so it
        doesn't become excessively long.
    */

    const visibleShades =
        homepageShades.slice(0, 12);


    if (visibleShades.length === 0) {

        document
            .getElementById(
                "shade-parade"
            )
            .style.display =
                "none";

    } else {

        function createShadeHTML() {

            return visibleShades
                .map(
                    function (shade) {

                       return `
    <div class="shade-parade-item">

        <span
            class="shade-parade-colour"
            style="background-color: ${shade.color};"
        ></span>

        <span class="shade-parade-name">
            ${shade.name}
        </span>

    </div>
`;

                    }
                )
                .join("");

        }


        /*
            We duplicate the same set twice.

            This is what allows the CSS
            marquee to loop continuously
            without a visible empty gap.
        */

        const shadesHTML =
            createShadeHTML();


        shadeParadeTrack.innerHTML =
            shadesHTML +
            shadesHTML;

    }

}

/* =========================================
   HOMEPAGE SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        "[data-reveal]"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    0.15
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

}
else {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "is-visible"
            );

        }
    );

}

/* =========================================
   SHADE PARADE MOBILE PAUSE
========================================= */

const shadeTrack =
    document.querySelector(".shade-parade-track");


if (shadeTrack) {

    shadeTrack.addEventListener(
        "touchstart",
        function () {

            shadeTrack.classList.add(
                "is-paused"
            );

        },
        {
            passive: true
        }
    );


    shadeTrack.addEventListener(
        "touchend",
        function () {

            shadeTrack.classList.remove(
                "is-paused"
            );

        }
    );


    shadeTrack.addEventListener(
        "touchcancel",
        function () {

            shadeTrack.classList.remove(
                "is-paused"
            );

        }
    );

}
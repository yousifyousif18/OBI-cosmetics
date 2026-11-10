const menuButton =
    document.getElementById("menu-button");

const mobileMenu =
    document.getElementById("mobile-menu");

const shopMenuButton =
    document.getElementById("shop-menu-button");

const shopSubmenu =
    document.getElementById("shop-submenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle(
                "open"
            );


            const isOpen =
                mobileMenu.classList.contains(
                    "open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


if (shopMenuButton && shopSubmenu) {

    shopMenuButton.addEventListener(
        "click",
        function () {

            shopSubmenu.classList.toggle(
                "open"
            );


            const symbol =
                shopMenuButton.querySelector(
                    "span:last-child"
                );


            if (
                shopSubmenu.classList.contains(
                    "open"
                )
            ) {

                symbol.textContent = "−";

            } else {

                symbol.textContent = "+";

            }

        }
    );

}
/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (!mobileMenu || !menuButton) {
            return;
        }


        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);


        if (
            mobileMenu.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            mobileMenu.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            /* Close shop submenu too */

            if (shopSubmenu) {
                shopSubmenu.classList.remove("open");
            }


            /* Reset + symbol */

            if (shopMenuButton) {

                const symbol =
                    shopMenuButton.querySelector(
                        "span:last-child"
                    );

                if (symbol) {
                    symbol.textContent = "+";
                }

            }

        }

    }
);
/* =========================================================
   CLOSE MENU AFTER CLICKING A LINK
========================================================= */

if (mobileMenu) {

    const mobileMenuLinks =
        mobileMenu.querySelectorAll("a");


    mobileMenuLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove("open");

                    if (menuButton) {

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );

        }
    );

}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const header =
            document.querySelector(
                "header"
            );

        if (!header) {
            return;
        }


        /* ========================================
           HEADER HEIGHT
        ======================================== */

        function updateHeaderHeight() {

            const height =
                header.offsetHeight;

            document.documentElement.style.setProperty(
                "--obi-header-height",
                height + "px"
            );

        }


        updateHeaderHeight();


        window.addEventListener(
            "resize",
            updateHeaderHeight
        );


        /* ========================================
           SCROLL STATE
        ======================================== */

        let lastScrollY =
            window.scrollY;

        let downDistance =
            0;


        /* ========================================
           CHECK OPEN MENUS
        ======================================== */

        function menuIsOpen() {

            const market =
                document.getElementById(
                    "market-selector"
                );


            const mobileMenu =
                document.querySelector(
                    ".mobile-menu"
                );


            const marketOpen =
                market &&
                market.classList.contains(
                    "open"
                );


            const mobileOpen =
                mobileMenu &&
                mobileMenu.classList.contains(
                    "open"
                );


            return (
                marketOpen ||
                mobileOpen
            );

        }


        /* ========================================
           SCROLL HANDLER
        ======================================== */

        function handleHeaderScroll() {

            const currentScrollY =
                window.scrollY;


            /* TOP OF PAGE */

            if (
                currentScrollY <= 5
            ) {

                header.classList.remove(
                    "obi-header-hidden"
                );

                header.classList.remove(
                    "obi-header-scrolled"
                );

                downDistance =
                    0;

                lastScrollY =
                    currentScrollY;

                return;

            }


            header.classList.add(
                "obi-header-scrolled"
            );


            /* MENU OPEN */

            if (
                menuIsOpen()
            ) {

                header.classList.remove(
                    "obi-header-hidden"
                );

                header.classList.add(
                    "obi-header-locked"
                );

                downDistance =
                    0;

                lastScrollY =
                    currentScrollY;

                return;

            }


            header.classList.remove(
                "obi-header-locked"
            );


            const difference =
                currentScrollY -
                lastScrollY;


            /* ========================================
               SCROLLING DOWN
            ======================================== */

            if (
                difference > 0
            ) {

                downDistance +=
                    difference;


                if (
                    downDistance >= 35 &&
                    currentScrollY > 120
                ) {

                    header.classList.add(
                        "obi-header-hidden"
                    );

                }

            }


            /* ========================================
               SCROLLING UP
            ======================================== */

            else if (
                difference < -2
            ) {

                header.classList.remove(
                    "obi-header-hidden"
                );

                downDistance =
                    0;

            }


            lastScrollY =
                currentScrollY;

        }


        window.addEventListener(
            "scroll",
            handleHeaderScroll,
            {
                passive: true
            }
        );


        /* ========================================
           WATCH MENUS
        ======================================== */

        const observer =
            new MutationObserver(
                function () {

                    if (
                        menuIsOpen()
                    ) {

                        header.classList.remove(
                            "obi-header-hidden"
                        );

                        header.classList.add(
                            "obi-header-locked"
                        );

                    }

                    else {

                        header.classList.remove(
                            "obi-header-locked"
                        );

                    }

                }
            );


        const market =
            document.getElementById(
                "market-selector"
            );


        const mobileMenu =
            document.querySelector(
                ".mobile-menu"
            );


        if (market) {

            observer.observe(
                market,
                {
                    attributes: true,
                    attributeFilter: [
                        "class"
                    ]
                }
            );

        }


        if (mobileMenu) {

            observer.observe(
                mobileMenu,
                {
                    attributes: true,
                    attributeFilter: [
                        "class"
                    ]
                }
            );

        }

    }
);
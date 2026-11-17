const menuButton =
    document.getElementById("menu-button");

const mobileMenu =
    document.getElementById("mobile-menu");

const shopMenuButton =
    document.getElementById("shop-menu-button");

const shopSubmenu =
    document.getElementById("shop-submenu");

if (mobileMenu) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const currentCategory = new URLSearchParams(window.location.search).get("category");
    const currentFavourites = new URLSearchParams(window.location.search).get("favourites") === "1";

    mobileMenu.querySelectorAll("a").forEach(function (link) {
        const destination = new URL(link.href, window.location.href);
        const matchesPage = destination.pathname.split("/").pop() === currentPage;
        const matchesCategory = destination.searchParams.get("category") === currentCategory;
        const matchesFavourites = (destination.searchParams.get("favourites") === "1") === currentFavourites;
        if (matchesPage && matchesCategory && matchesFavourites) {
            link.setAttribute("aria-current", "page");
        }
    });

    if (currentPage === "shop.html" && shopMenuButton) {
        shopMenuButton.classList.add("is-current-section");
    }
}

if (menuButton && mobileMenu) {

    mobileMenu.inert = !mobileMenu.classList.contains("open");
    new MutationObserver(function () {
        const open = mobileMenu.classList.contains("open");
        if (!open && mobileMenu.contains(document.activeElement)) menuButton.focus({ preventScroll: true });
        mobileMenu.inert = !open;
        menuButton.setAttribute("aria-expanded", String(open));
    }).observe(mobileMenu, { attributes: true, attributeFilter: ["class"] });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
            event.preventDefault();
            mobileMenu.classList.remove("open");
            shopSubmenu?.classList.remove("open");
            shopMenuButton?.setAttribute("aria-expanded", "false");
            const symbol = shopMenuButton?.querySelector("span:last-child");
            if (symbol) symbol.textContent = "+";
            menuButton.focus({ preventScroll: true });
        }
    });

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

            shopMenuButton.setAttribute("aria-expanded", shopSubmenu.classList.contains("open"));


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

            // Consume this tap before links or buttons underneath receive it.
            event.preventDefault();
            event.stopImmediatePropagation();

            mobileMenu.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            /* Close shop submenu too */

            if (shopSubmenu) {
                shopSubmenu.classList.remove("open");
                shopMenuButton?.setAttribute("aria-expanded", "false");
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

    },
    { capture: true }
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

            const navbar = header.querySelector(".navbar");
            const height =
                navbar ? navbar.offsetHeight : header.offsetHeight;

            document.documentElement.style.setProperty(
                "--obi-header-height",
                height + "px"
            );

        }


        updateHeaderHeight();

        // Keep spacing accurate after fonts, images and responsive layout settle.
        if ("ResizeObserver" in window) {
            const headerSizeObserver = new ResizeObserver(updateHeaderHeight);
            headerSizeObserver.observe(header.querySelector(".navbar") || header);
        }


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

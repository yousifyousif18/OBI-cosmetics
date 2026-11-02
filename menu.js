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
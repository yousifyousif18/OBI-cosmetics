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
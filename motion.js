(function () {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Set();

    function updateQuestionSymbol(symbol, open) {
        const text = open ? "\u2212" : "+";
        if (symbol.textContent === text) return;
        symbol.textContent = text;
        animate(symbol, [{ opacity: .4, scale: ".75" }, { opacity: 1, scale: "1" }], {
            duration: 220, easing: "cubic-bezier(.16,1,.3,1)"
        });
    }

    document.querySelectorAll("details").forEach(function (details) {
        const summary = details.querySelector(":scope > summary");
        const symbol = summary && Array.from(summary.querySelectorAll("span")).find(function (span) {
            return /^[+\u2212-]$/.test(span.textContent.trim());
        });
        if (!symbol) return;
        symbol.classList.add("question-toggle-symbol");
        symbol.setAttribute("aria-hidden", "true");
        function updateSymbol() { updateQuestionSymbol(symbol, details.open); }
        details.addEventListener("toggle", updateSymbol);
        updateSymbol();
    });

    document.querySelectorAll("button[aria-expanded]").forEach(function (button) {
        const symbol = button.querySelector(".product-details-plus");
        if (!symbol) return;
        symbol.classList.add("question-toggle-symbol");
        symbol.setAttribute("aria-hidden", "true");
        function updateSymbol() {
            const open = button.getAttribute("aria-expanded") === "true";
            updateQuestionSymbol(symbol, open);
            const content = document.getElementById(button.getAttribute("aria-controls") || "product-details-content");
            if (open && content) animate(content, [{ opacity: 0, translate: "0 -6px" }, { opacity: 1, translate: "0 0" }], {
                duration: 280, easing: "ease-out"
            });
        }
        new MutationObserver(updateSymbol).observe(button, { attributes: true, attributeFilter: ["aria-expanded"] });
        updateSymbol();
    });

    function animate(element, frames, options) {
        if (reduced.matches || !element.animate) return;
        const animation = element.animate(frames, options);
        active.add(animation);
        animation.finished.catch(function () {}).finally(function () { active.delete(animation); });
    }
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                observer.unobserve(entry.target);
                animate(entry.target, [
                    { opacity: .4, translate: "0 18px" },
                    { opacity: 1, translate: "0 0" }
                ], {
                    duration: 620,
                    delay: Number(entry.target.dataset.motionDelay || 0),
                    easing: "cubic-bezier(.16,1,.3,1)"
                });
            });
        }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
        document.querySelectorAll(
            "main h1, main h2, .obi-shop-grid > article, .product-grid > article, " +
            ".obi-chat-gallery > figure, .delivery-country-grid > article, " +
            ".contact-options > article, .obi-love-milestone-grid > article"
        ).forEach(function (element) {
            // Existing home reveals and modal contents have their own transitions.
            if (element.closest("[data-reveal], .product-modal, .obi-campaign-hero")) return;
            if (element.matches("article, figure")) {
                const siblings = Array.from(element.parentElement.children);
                element.dataset.motionDelay = String((siblings.indexOf(element) % 3) * 65);
            }
            observer.observe(element);
        });
    }

    document.querySelectorAll(".contact-faq-list details, .delivery-faq-list details, .product-modal-more details").forEach(function (details) {
        details.addEventListener("toggle", function () {
            if (!details.open) return;
            Array.from(details.children).forEach(function (child) {
                if (child.tagName === "SUMMARY") return;
                animate(child, [{ opacity: 0, translate: "0 -5px" }, { opacity: 1, translate: "0 0" }], {
                    duration: 260, easing: "ease-out"
                });
            });
        });
    });

    const drawer = document.getElementById("cart-drawer");
    if (drawer) {
        let wasOpen = drawer.classList.contains("open");
        new MutationObserver(function () {
            const isOpen = drawer.classList.contains("open");
            if (isOpen && !wasOpen) {
                const content = drawer.querySelector(".empty-cart") || drawer.querySelector(".cart-drawer-header");
                if (content) animate(content, [{ opacity: .4, translate: "0 10px" }, { opacity: 1, translate: "0 0" }], {
                    duration: 460, delay: 100, easing: "cubic-bezier(.16,1,.3,1)"
                });
            }
            wasOpen = isOpen;
        }).observe(drawer, { attributes: true, attributeFilter: ["class"] });
    }
    const status = document.createElement("div");
    status.className = "cart-added-feedback";
    status.setAttribute("role", "status");
    status.setAttribute("aria-atomic", "true");
    document.body.appendChild(status);
    let timer;
    document.addEventListener("obi:cart-added", function () {
        clearTimeout(timer);
        status.textContent = "Added to your cart \u2713";
        status.classList.add("is-visible");
        const count = document.getElementById("cart-count");
        if (count) animate(count, [{ transform: "scale(1)" }, { transform: "scale(1.3)" }, { transform: "scale(1)" }], { duration: 360, easing: "ease-out" });
        timer = setTimeout(function () { status.classList.remove("is-visible"); status.textContent = ""; }, 1800);
    });
    reduced.addEventListener("change", function () {
        if (reduced.matches) active.forEach(function (animation) { animation.cancel(); });
    });
}());

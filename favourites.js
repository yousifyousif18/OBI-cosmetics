/* Browser-local favourites: exact shades, or products without options. */
(function () {
    const storageKey = "obiFavourites";
    const heart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"></path></svg>';
    const hasShades = product => Array.isArray(product.shades) && product.shades.length > 0;
    const key = item => JSON.stringify([item.productId, item.shade]);
    function read() {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
            if (!Array.isArray(stored)) return [];
            const seen = new Set();
            return stored.map(item => typeof item === "number" ? { productId: item, shade: null } : item).filter(function (item) {
                if (!item) return false;
                const product = products.find(product => product.id === item.productId);
                if (!product) return false;
                // Do not guess a shade for an older whole-product favourite.
                if (hasShades(product) ? !product.shades.some(shade => shade.name === item.shade) : item.shade !== null) return false;
                if (seen.has(key(item))) return false;
                seen.add(key(item));
                return true;
            }).map(item => ({ productId: item.productId, shade: item.shade }));
        } catch (_) { return []; }
    }
    let items = read();
    const escape = value => String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    window.OBIFavourites = {
        onlyFavourites: new URLSearchParams(location.search).get("favourites") === "1",
        has: (id, shade) => items.some(item => item.productId === id && (shade === undefined || item.shade === shade)),
        count: () => items.length,
        escape,
        savedShades: id => items.filter(item => item.productId === id && item.shade !== null).map(item => item.shade),
        summary: function (product) {
            return `<div class="favourite-shade-summary" data-favourite-summary="${product.id}">${shadeLinks(product.id)}</div>`;
        },
        button: function (product, extraClass = "", shade = null) {
            if (hasShades(product) && !product.shades.some(option => option.name === shade)) return "";
            const saved = items.some(item => item.productId === product.id && item.shade === shade);
            const name = product.name + (shade === null ? "" : " — " + shade);
            return `<button type="button" class="product-favourite-button ${extraClass}" data-favourite-id="${product.id}" ${shade === null ? "" : `data-favourite-shade="${escape(shade)}"`} aria-pressed="${saved}" aria-label="${escape((saved ? "Remove " : "Save ") + name + (saved ? " from favourites" : " to favourites"))}">${heart}<span class="favourite-button-label">${saved ? "Saved" : "Save"}</span></button>`;
        }
    };
    function shadeLinks(id) {
        return items.filter(item => item.productId === id && item.shade !== null).map(function (item) {
            return `<button type="button" class="saved-shade-link open-product-button" data-product-id="${id}" data-saved-shade="${escape(item.shade)}">${escape(item.shade)} <span aria-hidden="true">♥</span></button>`;
        }).join("");
    }
    function sync() {
        document.querySelectorAll("[data-favourite-id]").forEach(function (button) {
            const product = products.find(product => product.id === Number(button.dataset.favouriteId));
            if (!product) return;
            const shade = button.dataset.favouriteShade ?? null;
            const saved = items.some(item => item.productId === product.id && item.shade === shade);
            const name = product.name + (shade === null ? "" : " — " + shade);
            button.setAttribute("aria-pressed", String(saved));
            button.setAttribute("aria-label", (saved ? "Remove " : "Save ") + name + (saved ? " from favourites" : " to favourites"));
            const label = button.querySelector(".favourite-button-label");
            if (label) label.textContent = saved ? "Saved" : "Save";
        });
        document.querySelectorAll("[data-favourites-count]").forEach(function (element) { element.textContent = items.length; });
        document.querySelectorAll("[data-favourite-summary]").forEach(function (element) { element.innerHTML = shadeLinks(Number(element.dataset.favouriteSummary)); });
    }
    const status = document.createElement("p");
    status.className = "favourites-status";
    status.setAttribute("role", "status");
    document.body.append(status);
    document.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-favourite-id]");
        if (!button) return;
        const product = products.find(product => product.id === Number(button.dataset.favouriteId));
        if (!product) return;
        event.preventDefault();
        const shade = button.dataset.favouriteShade ?? null;
        if (hasShades(product) ? !product.shades.some(option => option.name === shade) : shade !== null) return;
        const item = { productId: product.id, shade };
        const saved = items.some(entry => key(entry) === key(item));
        const next = saved ? items.filter(entry => key(entry) !== key(item)) : [...items, item];
        try { localStorage.setItem(storageKey, JSON.stringify(next)); }
        catch (_) { status.textContent = "Favourites could not be saved in this browser."; return; }
        items = next;
        status.textContent = product.name + (shade === null ? "" : " — " + shade) + (saved ? " removed from favourites." : " saved to favourites.");
        sync();
        document.dispatchEvent(new CustomEvent("obi:favourites-changed"));
    });
    window.addEventListener("storage", function (event) {
        if (event.key !== storageKey && event.key !== null) return;
        items = read();
        sync();
        document.dispatchEvent(new CustomEvent("obi:favourites-changed"));
    });
    sync();
}());

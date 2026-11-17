/* Full-size customer screenshots without leaving the current page. */
(function () {
    if (typeof HTMLDialogElement === "undefined") return;
    const dialog = document.createElement("dialog");
    dialog.className = "review-viewer";
    dialog.setAttribute("aria-label", "Customer review screenshot");
    dialog.innerHTML = `
        <div class="review-viewer-toolbar">
            <p class="review-viewer-position" aria-live="polite"></p>
            <button type="button" class="review-viewer-close" aria-label="Close review viewer">Close &times;</button>
        </div>
        <div class="review-viewer-image"><img alt=""></div>
        <p class="review-viewer-caption"></p>
        <div class="review-viewer-navigation">
            <button type="button" class="review-viewer-previous">&larr; Previous</button>
            <a class="review-viewer-original" target="_blank" rel="noopener">Open original to zoom &nearr;</a>
            <button type="button" class="review-viewer-next">Next &rarr;</button>
        </div>`;
    document.body.append(dialog);
    const image = dialog.querySelector("img");
    const caption = dialog.querySelector(".review-viewer-caption");
    const position = dialog.querySelector(".review-viewer-position");
    const original = dialog.querySelector(".review-viewer-original");
    const previous = dialog.querySelector(".review-viewer-previous");
    const next = dialog.querySelector(".review-viewer-next");
    let links = [];
    let index = 0;

    function showReview() {
        const link = links[index];
        image.src = link.href;
        image.alt = link.querySelector("img")?.alt || "Customer review screenshot";
        caption.textContent = link.closest("figure")?.querySelector("figcaption")?.textContent || image.alt;
        position.textContent = (index + 1) + " / " + links.length;
        original.href = link.href;
        previous.disabled = index === 0;
        next.disabled = index === links.length - 1;
    }
    function move(direction) {
        const destination = index + direction;
        if (destination < 0 || destination >= links.length) return;
        index = destination;
        showReview();
    }
    function releaseScroll() {
        document.documentElement.classList.remove("review-viewer-open");
        image.removeAttribute("src");
    }
    function closeReview() {
        dialog.close();
        releaseScroll();
    }
    document.addEventListener("click", function (event) {
        const link = event.target.closest(".obi-chat-gallery a, .product-review-thumbnails a");
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        const gallery = link.closest(".obi-chat-gallery, .product-review-thumbnails");
        links = Array.from(gallery.querySelectorAll("a[href]"));
        index = links.indexOf(link);
        showReview();
        dialog.showModal();
        document.documentElement.classList.add("review-viewer-open");
    });
    dialog.querySelector(".review-viewer-close").addEventListener("click", closeReview);
    previous.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    dialog.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        // Let the native dialog handle Escape without closing the product beneath it.
        if (event.key === "Escape") event.stopPropagation();
    });
    dialog.addEventListener("click", function (event) {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeReview();
    });
    dialog.addEventListener("close", releaseScroll);
}());

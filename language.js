/* Translate presentation only; form values, IDs, saved shades and URLs stay stable. */
(function () {
    const dictionary = window.OBI_AR;
    const caseInsensitive = Object.fromEntries(Object.entries(dictionary).map(([key, value]) => [key.toLowerCase(), value]));
    const textHistory = new WeakMap();
    const attributeHistory = new WeakMap();
    const attributes = ["aria-label", "placeholder", "title", "alt"];
    let language = document.documentElement.lang === "ar" ? "ar" : "en";
    const normalise = value => value.replace(/\s+/g, " ").trim();
    const shadeNames = new Set(products.flatMap(product => product.shades || []).map(shade => shade.name.toLowerCase()));

    function localizeURL(input) {
        if (input.startsWith("#")) return input;
        const target = new URL(input, document.baseURI);
        if (target.origin !== new URL(document.baseURI).origin || !target.pathname.endsWith(".html")) return input;
        target.searchParams.delete("lang");
        return target.href;
    }

    function translateText(value) {
        const translated = translateValue(value);
        const arrows = String(value).match(/[←→↗↖]/g);
        let index = 0;
        return arrows ? String(translated).replace(/[←→↗↖]/g, arrow => arrows[index++] || arrow) : translated;
    }

    function translateValue(value) {
        if (language !== "ar") return value;
        const source = normalise(String(value));
        if (shadeNames.has(source.toLowerCase()) || /^(EGP|AED|SAR|QAR)$/.test(source) || /^[←→↗↖]$/.test(source)) return value;
        if (dictionary[source]) return dictionary[source];
        if (caseInsensitive[source.toLowerCase()]) return caseInsensitive[source.toLowerCase()];
        let preview = source.match(/^SHADE PREVIEW\s*·\s*(.+)$/i);
        if (preview) return "معاينة الدرجة · " + translateText(preview[1]);
        const decorative = source.match(/^([✦♥♡\s]*)(.*?)([✦♥♡\s]*)$/);
        if (decorative && dictionary[decorative[2]]) return decorative[1] + dictionary[decorative[2]] + decorative[3];
        let match = source.match(/^(\d+) (products?|shades?)$/);
        if (match) {
            const n = Number(match[1]);
            const shade = match[2].startsWith("shade");
            if (n === 0) return shade ? "لا توجد درجات" : "لا توجد منتجات";
            if (n === 1) return shade ? "درجة واحدة" : "منتج واحد";
            if (n === 2) return shade ? "درجتان" : "منتجان";
            return match[1] + " " + (n % 100 >= 3 && n % 100 <= 10 ? (shade ? "درجات" : "منتجات") : (shade ? "درجة" : "منتجاً"));
        }
        match = source.match(/^([\d,.]+) (EGP|AED|SAR|QAR)$/);
        if (match) return value;
        match = source.match(/^(EGP|AED|SAR|QAR)\s*([\d,.]+)$/);
        if (match) return value;
        match = source.match(/^(Selected|Shade|Quantity|Price|Subtotal|Total|Net Weight):\s*(.+)$/);
        if (match) return (match[1] === "Selected" ? "الدرجة المختارة" : translateText(match[1])) + ": " + translateText(match[2]);
        match = source.match(/^(.+) each$/);
        if (match) return translateText(match[1]) + " للوحدة";
        match = source.match(/^(Save|Remove) (.+) (to|from) favourites$/);
        if (match) return (match[1] === "Save" ? "حفظ " : "إزالة ") + translateText(match[2]) + (match[1] === "Save" ? " في المفضلة" : " من المفضلة");
        match = source.match(/^(.+) (saved to|removed from) favourites\.$/);
        if (match) return "تم " + (match[2] === "saved to" ? "حفظ " : "إزالة ") + translateText(match[1]) + (match[2] === "saved to" ? " في المفضلة." : " من المفضلة.");
        match = source.match(/^(View|Customer feedback about) (.+)$/);
        if (match) return (match[1] === "View" ? "عرض " : "آراء العملاء حول ") + translateText(match[2]);
        if (source.includes(" — ")) return source.split(" — ").map(translateText).join(" — ");
        if (source.includes(" - ")) return source.split(" - ").map(translateText).join(" - ");
        return value;
    }

    function skip(element) {
        return !element || element.closest("script, style, noscript, code, pre, [data-no-translate], .logo, .brand-wordmark, .obi-about-old-name");
    }
    function translateNode(node) {
        if (skip(node.parentElement) || !node.nodeValue.trim()) return;
        let record = textHistory.get(node);
        if (!record || node.nodeValue !== record.rendered) record = { source: node.nodeValue };
        const source = record.source;
        const translated = language === "ar" ? translateText(normalise(source)) : normalise(source);
        const leading = source.match(/^\s*/)[0];
        const trailing = source.match(/\s*$/)[0];
        const monetary = /^(?:(?:EGP|AED|SAR|QAR|LE)\s*[\d,.]+|[\d,.]+\s*(?:EGP|AED|SAR|QAR|LE))$/.test(normalise(source));
        record.rendered = language === "ar" && !monetary ? leading + translated + trailing : source;
        textHistory.set(node, record);
        if (node.nodeValue !== record.rendered) node.nodeValue = record.rendered;
    }
    function translateAttributes(element) {
        if (skip(element)) return;
        if (element.tagName === "A" && element.hasAttribute("href")) {
            const current = element.getAttribute("href");
            const localized = localizeURL(current);
            if (current !== localized) element.setAttribute("href", localized);
        }
        let records = attributeHistory.get(element);
        if (!records) { records = {}; attributeHistory.set(element, records); }
        attributes.forEach(function (attribute) {
            if (!element.hasAttribute(attribute)) return;
            const current = element.getAttribute(attribute);
            let record = records[attribute];
            if (!record || current !== record.rendered) record = { source: current };
            record.rendered = language === "ar" ? translateText(record.source) : record.source;
            records[attribute] = record;
            if (current !== record.rendered) element.setAttribute(attribute, record.rendered);
        });
    }
    function translate(root) {
        if (root.nodeType === Node.TEXT_NODE) { translateNode(root); return; }
        if (root.nodeType !== Node.ELEMENT_NODE || skip(root)) return;
        translateAttributes(root);
        root.querySelectorAll("[aria-label], [placeholder], [title], [alt], a[href]").forEach(translateAttributes);
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) translateNode(walker.currentNode);
    }

    const button = document.createElement("div");
    button.className = "language-switch";
    button.setAttribute("role", "group");
    button.setAttribute("aria-label", "Website language");
    button.setAttribute("data-no-translate", "");
    button.dir = "ltr";
    button.innerHTML = '<button type="button" data-language="ar" lang="ar" aria-label="العربية">عربي</button><button type="button" data-language="en" lang="en" aria-label="English">EN</button>';
    function updateButton() {
        button.querySelectorAll("[data-language]").forEach(function (option) {
            option.setAttribute("aria-pressed", String(option.dataset.language === language));
        });
    }
    function setLanguage(next) {
        if (next !== "ar" && next !== "en") return;
        language = next;
        document.documentElement.lang = next;
        document.documentElement.dir = "ltr";
        const address = new URL(location.href);
        address.searchParams.delete("lang");
        history.replaceState({}, "", address.href);
        updateButton();
        translate(document.documentElement);
        document.dispatchEvent(new CustomEvent("obi:language-changed", { detail: { language: next } }));
    }
    button.addEventListener("click", function (event) {
        const option = event.target.closest("[data-language]");
        if (option) setLanguage(option.dataset.language);
    });
    document.querySelector(".nav-actions")?.prepend(button);
    updateButton();

    // Localise only known order-template labels; leave names, phones and addresses intact.
    function translateOrderMessage(message) {
        if (language !== "ar") return message;
        let preserveNext = false;
        let preserveRest = false;
        return message.split("\n").map(function (line) {
            if (preserveRest) return line;
            if (preserveNext && line.trim()) { preserveNext = false; return line; }
            const productLine = line.match(/^\*(\d+)\. (.+)\*$/);
            if (productLine) return "*" + productLine[1] + ". " + translateText(productLine[2]) + "*";
            const labelled = line.match(/^(\*?)([^:*]+):(\*?)\s*(.*)$/);
            if (labelled && dictionary[labelled[2].trim()]) {
                const label = labelled[2].trim();
                const preserveValue = ["Name", "Phone", "Exact Address", "City", "City / Governorate"].includes(label);
                if (preserveValue && !labelled[4].trim()) preserveNext = true;
                if (label === "Message") preserveRest = true;
                return labelled[1] + translateText(label) + ":" + labelled[3] + " " + (preserveValue ? labelled[4] : translateText(labelled[4]));
            }
            const heading = line.match(/^([*_]?)(.*?)([*_]?)$/);
            return heading && dictionary[heading[2]] ? heading[1] + translateText(heading[2]) + heading[3] : line;
        }).join("\n");
    }
    window.OBILanguage = { t: translateText, set: setLanguage, get: () => language, url: localizeURL, translate, translateOrderMessage };
    const alert = window.alert.bind(window);
    window.alert = function (message) { alert(translateText(String(message))); };

    translate(document.documentElement);
    new MutationObserver(function (mutations) {
        const roots = new Set();
        mutations.forEach(function (mutation) {
            if (mutation.type === "characterData") translateNode(mutation.target);
            else if (mutation.type === "attributes") translateAttributes(mutation.target);
            else mutation.addedNodes.forEach(function (node) { if (node.nodeType === 1 || node.nodeType === 3) roots.add(node); });
        });
        roots.forEach(translate);
    }).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attributes });
}());

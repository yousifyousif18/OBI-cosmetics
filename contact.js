/* =========================================================
   OBI CONTACT
========================================================= */


const contactForm =
    document.getElementById(
        "contact-form"
    );


const contactWhatsAppButton =
    document.getElementById(
        "contact-whatsapp-button"
    );


const orderHelpButton =
    document.getElementById(
        "order-help-button"
    );


/* =========================================================
   GET CONTACT NUMBER
========================================================= */

function getContactMarket() {

    const market =
        getSelectedMarket();

    if (market) {
        return market;
    }


    /*
       If no region is selected yet,
       use the shared OBI number.
    */

    return {
        name: "OBI Cosmetics",
        whatsapp: "601169390811"
    };

}


/* =========================================================
   OPEN WHATSAPP
========================================================= */

function openContactWhatsApp(
    message
) {

    const market =
        getContactMarket();


    if (
        !market ||
        !market.whatsapp
    ) {
        return;
    }


    const url =
        "https://wa.me/" +
        market.whatsapp +
        "?text=" +
        encodeURIComponent(window.OBILanguage ? window.OBILanguage.translateOrderMessage(message) : message);


    window.location.href =
        url;

}


/* =========================================================
   QUICK WHATSAPP
========================================================= */

if (
    contactWhatsAppButton
) {

    contactWhatsAppButton.addEventListener(
        "click",
        function () {

            openContactWhatsApp(
                "Hi OBI Cosmetics! I would like some help."
            );

        }
    );

}


/* =========================================================
   ORDER HELP
========================================================= */

if (
    orderHelpButton
) {

    orderHelpButton.addEventListener(
        "click",
        function () {

            openContactWhatsApp(
                "Hi OBI Cosmetics! I need help with an existing order."
            );

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener("input", function (event) {
        if (typeof event.target.setCustomValidity === "function") event.target.setCustomValidity("");
    });

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            for (const id of ["contact-name", "contact-message"]) {
                const field = document.getElementById(id);
                field.setCustomValidity(field.value.trim() ? "" : (window.OBILanguage?.t("Please complete this field.") || "Please complete this field."));
                if (!field.reportValidity()) return;
            }


            const name =
                document
                    .getElementById(
                        "contact-name"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "contact-phone"
                    )
                    .value
                    .trim();


            const topic =
                document
                    .getElementById(
                        "contact-topic"
                    )
                    .value;


            const message =
                document
                    .getElementById(
                        "contact-message"
                    )
                    .value
                    .trim();


            const market =
                getSelectedMarket();


            const marketText =
                market
                    ? market.name
                    : "Not selected";


            const whatsappMessage = `
*OBI COSMETICS — CUSTOMER MESSAGE*

*Name:* ${name}

*Phone:* ${phone || "Not provided"}

*Market:* ${marketText}

*Topic:* ${topic}

*Message:*
${message}
`;


            openContactWhatsApp(
                whatsappMessage
            );

        }
    );

}

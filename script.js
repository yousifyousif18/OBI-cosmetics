const products = [

    {
        id: 1,
        name: "Lip Gloss",
        price: 0,
        image: "images/lip-gloss.jpg",
        description: "Glossy lip colour with a smooth finish.",
        shades: [
        { name: "01 Nude", color: "#81331d" },
        { name: "02 Rose", color: "#ba0f89" },
        { name: "03 Pink", color: "#9e6524" },
        { name: "04 Mauve", color: "#9B6676" },
        { name: "05 Berry", color: "#35eccbb1" },
        { name: "06 Brown", color: "#681709" },
        { name: "07 Red", color: "#A92E3B" },
        { name: "08 Clear", color: "#276f5f" }
    ]
    },

    {
        id: 2,
        name: "Lip Oil",
        price: 0,
        image: "images/lip-oil.jpg",
        description: "Lightweight lip oil for shine and moisture.",
        shades: [
        { name: "01 Nude", color: "#81331d" },
        { name: "02 Rose", color: "#ba0f89" },
        { name: "03 Pink", color: "#9e6524" },
        { name: "04 Mauve", color: "#9B6676" },
        { name: "05 Berry", color: "#35eccbb1" },
    ] 
    },

    {
        id: 3,
        name: "Lip Liner Pencil",
        price: 0,
        image: "images/lip-liner-pencil.jpg",
        description: "Classic pencil lip liner for precise definition.",
        shades: [
        { name: "01 Nude", color: "#81331d" },
        { name: "02 Rose", color: "#ba0f89" },
        { name: "03 Pink", color: "#9e6524" },
        { name: "04 Mauve", color: "#9B6676" },
        { name: "05 Berry", color: "#35eccbb1" },
    ]
    },

    {
        id: 4,
        name: "Lip Liner Roll-Up",
        price: 0,
        image: "images/lip-liner-rollup.jpg",
        description: "Retractable lip liner with smooth application.",
        shades: [
        { name: "01 Nude", color: "#81331d" },
        { name: "02 Rose", color: "#ba0f89" },
        { name: "03 Pink", color: "#9e6524" },
        { name: "04 Mauve", color: "#9B6676" },
        { name: "05 Berry", color: "#35eccbb1" },
    ]
    }
    
];
const productGrid = document.getElementById("product-grid");

products.forEach(function (product) {

    const shadeHTML = product.shades
        .map(function (shade) {
            return `
                <button
                    class="shade-swatch"
                    style="background-color: ${shade.color}"
                    data-shade="${shade.name}"
                    aria-label="${shade.name}">
                </button>
            `;
        })
        .join("");

    productGrid.innerHTML += `
        <article class="product-card">

            <div class="product-image">
                ${product.name}
            </div>

            <h3>${product.name}</h3>

            <p class="product-price">
                RM ${product.price}
            </p>

            <div class="shade-section">

                <p class="shade-label">
                    ${product.shades.length} colours
                </p>

                <div class="shade-list">
                    ${shadeHTML}
                </div>

                <p class="selected-shade">
                    Select a shade
                </p>

            </div>

            <button class="view-product-button">
                View Product
            </button>

        </article>
    `;
});
const shadeButtons = document.querySelectorAll(".shade-swatch");

shadeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");

        const allShades =
            productCard.querySelectorAll(".shade-swatch");

        allShades.forEach(function (shade) {
            shade.classList.remove("selected");
        });

        button.classList.add("selected");

        const selectedShade =
            productCard.querySelector(".selected-shade");

        selectedShade.textContent =
            "Selected: " + button.dataset.shade;
    });

});
const egyptDeliveryRates = document.getElementById("egypt-delivery-rates");

for (const { fee, areas } of EGYPT_DELIVERY_TIERS) {
    const price = document.createElement("strong");
    price.textContent = `${fee} EGP`;

    if (areas.length === 1) {
        const row = document.createElement("div");
        const name = document.createElement("span");
        name.textContent = areas[0];
        row.className = "egypt-rate-row";
        row.append(name, price);
        egyptDeliveryRates.append(row);
        continue;
    }

    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const list = document.createElement("ul");
    const name = document.createElement("span");

    name.textContent = "View covered areas";
    summary.className = "egypt-rate-row";
    summary.append(name, price);
    for (const area of areas) {
        const item = document.createElement("li");
        item.textContent = area;
        list.append(item);
    }
    details.append(summary, list);
    egyptDeliveryRates.append(details);
}

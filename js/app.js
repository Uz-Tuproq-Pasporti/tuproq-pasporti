
var map = L.map('map').setView([40.9, 71.0], 11);

L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20
}).addTo(map);

function classify(b) {
    b = parseFloat(b);
    if (b < 39) return '#ff0000';
    if (b <= 60) return '#ff8c00';
    if (b <= 80) return '#00cc44';
    return '#006600';
}

let list = document.getElementById("list");

// FAOL GEOJSON YUKLASH
fetch("data/oqoltin.geojson")
    .then(r => r.json())
    .then(json => {

        L.geoJSON(json, {
            style: f => {
                let c = classify(f.properties.Ball);
                return {
                    color: c,
                    fillColor: c,
                    fillOpacity: 0.5,
                    weight: 2
                };
            },

            onEachFeature: (f, layer) => {

                // Popup
                layer.bindPopup(`
                    <b>Kontur:</b> ${f.properties.Kontur}<br>
                    <b>Massiv:</b> ${f.properties.Massiv}<br>
                    <b>Ball:</b> ${f.properties.Ball}<br>
                    <b>Gumus:</b> ${f.properties.Gumus}<br>
                    <b>Fosfor:</b> ${f.properties.Fosfor}<br>
                    <b>Kaliy:</b> ${f.properties.Kaliy}<br>
                    <b>Sho'rlanish:</b> ${f.properties.Shorlanish}<br>
                    <b>Mexanika:</b> ${f.properties.Mexanika}<br>
                `);

                // Chap ro‘yxat
                let div = document.createElement("div");
                div.className = "item";
                div.innerHTML = `Kontur: ${f.properties.Kontur} | Massiv: ${f.properties.Massiv}`;
                div.onclick = () => {
                    map.fitBounds(layer.getBounds());
                    layer.openPopup();
                };

                list.appendChild(div);
            }
        }).addTo(map);
    });

// QIDIRUV
document.getElementById("searchBtn").onclick = () => {
    let q = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll(".item");

    items.forEach(i => {
        i.style.display = i.textContent.toLowerCase().includes(q)
            ? "block"
            : "none";
    });
};

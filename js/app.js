
var map = L.map('map').setView([41,69], 10);
L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {maxZoom:20}).addTo(map);

function classify(ball){
  var b = parseFloat(ball);
  if (b < 39) return '#ff0000';
  if (b <= 60) return '#ff8c00';
  if (b <= 80) return '#00cc44';
  return '#006600';
}

fetch('data/oqoltin.geojson')
  .then(r => r.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(f){
        var b = f.properties.Ball;
        var c = classify(b);
        return {color:c, fillColor:c, weight:2, fillOpacity:0.5};
      },
      onEachFeature: function(f, layer){
        var html = "<b>Kontur ma'lumotlari</b><br>";
        for (var k in f.properties){
          html += k + ": " + f.properties[k] + "<br>";
        }
        layer.bindPopup(html);
      }
    }).addTo(map);
  });

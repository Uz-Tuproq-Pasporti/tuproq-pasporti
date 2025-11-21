var map = L.map('map').setView([41,69],10);
L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{maxZoom:20}).addTo(map);

let layerGroup;
function classify(b){
 b=parseFloat(b);
 if(b<39) return '#ff0000';
 if(b<=60) return '#ff8c00';
 if(b<=80) return '#00cc44';
 return '#006600';
}

fetch('data/oqoltin.geojson')
.then(r=>r.json())
.then(data=>{
 let list=document.getElementById('list');

 layerGroup=L.geoJSON(data,{
  style:f=>{
    let c=classify(f.properties.Ball);
    return {color:c,fillColor:c,fillOpacity:0.5,weight:2};
  },

  onEachFeature:(f,l)=>{

    // Popup
    l.bindPopup(
      Object.entries(f.properties)
      .map(v=>v[0]+": "+v[1])
      .join("<br>")
    );

    // Chap panel uchun element
    let div=document.createElement('div');
    div.className='item';

    // TO‘G‘RI ATRIBUT NOMLARI
    let kontur = f.properties.Kontur;
    let massiv = f.properties.Massiv;

    div.textContent = "Kontur: " + kontur + " | Massiv: " + massiv;

    div.onclick=()=>{ 
        map.fitBounds(l.getBounds()); 
        l.openPopup(); 
    };

    list.appendChild(div);
  }
 }).addTo(map);

 // Qidiruv
 document.getElementById('searchBtn').onclick=()=>{
   let q=document.getElementById('search').value.toLowerCase();
   let items=document.querySelectorAll('.item');
   items.forEach(i=>{
     i.style.display = i.textContent.toLowerCase().includes(q)?'block':'none';
   });
 };
});

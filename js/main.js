// Classes
var indiceAguaIcon = L.icon({
    iconUrl: './data/img/droplet.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30]
});

var generadorRuralIcon = L.icon({
    iconUrl: './data/img/trash-fill.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30]
});

var sitioInteresIcon = L.icon({
    iconUrl: './data/img/airplane-fill.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30]
});

var nacimientosIcon = L.icon({
    iconUrl: './data/img/droplet-half.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30]
});

// Functions

function atributes(feature, layer){
    var featureKeys = Object.keys(feature.properties);
    var featureValues = Object.values(feature.properties);
    var items = featureKeys.length;
    
    var table = `
        <div style="height: 200px;overflow-y: auto;">
        <table class="table">
        <thead>
            <tr>
            <th scope="col">Atributo</th>
            <th scope="col">Valor</th>
            </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < items; i++) {
        table += '<tr>';
        table += '<th scope="row">' + featureKeys[i] + '</th>';
        table += '<td>' + featureValues[i] + '</td>';
        table += '</tr>';
      }
    
    table += '</tbody></table></div>'
    layer.bindPopup(table);
};

// Mapbase
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3']
});

// Layers
//  GeoJson
const corregimientoGeoJson = L.geoJson(corregimiento_geoJson, {
    style: {
        'fillColor': 'rgba(0, 0, 0, 0)',
        'color': '#658864'
    }
});

//  WMS
const wmsUrl = 'http://sig.gisfer.net:8080/geoserver/wms';

const base_bcs_hid_rios = L.tileLayer.wms(wmsUrl, {
    layers: 'sig3t2:base_bcs_hid_rios',
    format: 'image/png8',
    transparent: true,
    styles: 'base_bcs_hid_rios'
});

const base_cat_bas_construcciones = L.tileLayer.wms(wmsUrl, {
    layers: 'sig3t2:base_cat_bas_construcciones',
    format: 'image/png8',
    transparent: true,
    styles: 'base_cat_bas_construcciones'
});

const base_mc_corregimientos = L.tileLayer.wms(wmsUrl, {
    layers: 'sig3t2:base_mc_corregimientos',
    format: 'image/png8',
    transparent: true,
    styles: 'base_mc_corregimientos'
});

const base_mc_veredas = L.tileLayer.wms(wmsUrl, {
    layers: 'sig3t2:base_mc_veredas',
    format: 'image/png8',
    transparent: true,
    styles: 'base_mc_veredas'
});

// WFS

const wfsUrl = 'http://sig.gisfer.net:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&';
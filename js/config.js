const map = L.map('map', {
    center: corregimientoGeoJson.getBounds().getCenter(),
    zoom: 13,
    layers: [osm, base_bcs_hid_rios, base_cat_bas_construcciones, base_mc_corregimientos, base_mc_veredas]
});

var baseMap = {
    '<p class="p">Open Streets Maps</p>': osm,
    '<p class="p">Google Streets</p>': googleStreets
};

var layers = {
    '<p class="p">Corregimiento (GeoJson)</p>': corregimientoGeoJson,
    '<p class="p">POT – Base clasificación del suelo – Hidrografía: Ríos</p>': base_bcs_hid_rios,
    '<p class="p">Catastro: Construcciones</p>': base_cat_bas_construcciones,
    '<p class="p">Planeación: Corregimientos</p>': base_mc_corregimientos,
    '<p class="p">Planeación: Veredas</p>': base_mc_veredas
};


// Utilities
//  Set view
L.easyButton({
    states: [{
        icon: 'bi bi-house-door-fill',
        title: 'Restaurar vista',
        onClick: function(btn, map) {
            map.setView(corregimientoGeoJson.getBounds().getCenter(), 13);
        }
    }],
    position: 'topleft'
}).addTo(map);

//  Constrol layer
var controlLayer = L.control.layers(baseMap, layers, {
    collapsed: true
}).addTo(map);

//  User location
var loc = L.control.locate({
    flyTo: true,
    strings: {
        outsideMapBoundsMsg: 'Tu ubicación se encuentra fuera de los límites del mapa.',
        title: 'Ubicación'
    },
    locateOptions: {
        enableHighAccuracy: true
    }
}).addTo(map);

//  Measure tool
L.control.polylineMeasure({
    unit: 'meters',
    tooltipTextFinish: 'Clic o ESC para <b>finalizar la medición</b> o ',
    tooltipTextDelete: 'Presione SHIFT y clic para <b>eliminar el vértice</b>.',
    tooltipTextMove: 'Clic sostenido para <b>mover el vértice</b>.<br>',
    tooltipTextResume: '<br>Presione CTRL y clic para <b>continuar la medida</b>',
    tooltipTextAdd: 'Presione CTRL and clic para <b>agregar un vértice</b>.',
    measureControlTitleOn: 'Comenzar a medir',
    measureControlTitleOff: 'Terminar de medir',
    measureControlLabel: '<i class="bi bi-rulers"></i>;'
}).addTo(map);

//  Geocoding
L.Control.geocoder({
    position: 'topleft'
}).addTo(map);

//  Scalebar
L.control.graphicScale({
    fill: 'fill',
    doubleLine: false
}).addTo(map);

// WFS
$.ajax({
    url: wfsUrl + 'typeName=sig3t2:tema_amb_eep_nacimientos&outputFormat=json',
    success: function(data) {
        var tema_amb_eep_nacimientos = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            },
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: nacimientosIcon})
            }
        });
        controlLayer.addOverlay(tema_amb_eep_nacimientos, '	POT - Ambiental - Estructura ecológica principal: Nacimientos de agua');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:tema_bcs_hid_quebradas&outputFormat=json',
    success: function(data) {
        var tema_bcs_hid_quebradas = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            },
            style: {'color': '#1f78b4'}
        });
        controlLayer.addOverlay(tema_bcs_hid_quebradas, '<p class="p">POT - Base clasificación del suelo - Hidrografía: Quebradas</p>');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:tema_obs_agua_ica&outputFormat=json',
    success: function(data) {
        var tema_obs_agua_ica = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            },
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: indiceAguaIcon});
            }
        });
        controlLayer.addOverlay(tema_obs_agua_ica, '<p class="p">Dagma - Agua: ICA - Indice de Calidad del Agua</p>');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:tema_pgirs_grs_rso_gran_generador_rural&outputFormat=json',
    success: function(data) {
        var tema_pgirs_grs_rso_gran_generador_rural = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            },
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: generadorRuralIcon});
            }
        });
        controlLayer.addOverlay(tema_pgirs_grs_rso_gran_generador_rural, '<p class="p">Planeación - PGIRS - Generadores Residuos Sólidos: (GRS) Residuos Sólidos Orgánicos - Gran Generador Rural</p>');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:temad_areas_proteccion_ambiental&outputFormat=json',
    success: function(data) {
        var temad_areas_proteccion_ambiental = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            },
            style: {
                'fillColor': 'rgba(101, 136, 100, 0.5)',
                'color': '#658864',
                'opacity': 1,
                'weight': 2
            }
        });
        controlLayer.addOverlay(temad_areas_proteccion_ambiental, '<p class="p">Áreas de protección ambiental</p>');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:temad_corredor_verde&outputFormat=json',
    success: function(data) {
        var temad_corredor_verde = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            },
            style: {'color': '#263A29'}
        });
        controlLayer.addOverlay(temad_corredor_verde, '<p class="p">Corredor Verde</p>');
    }
});

$.ajax({
    url: wfsUrl + 'typeName=sig3t2:temad_punto_interes&outputFormat=json',
    success: function(data) {
        var temad_punto_interes = L.geoJson(data, {
            onEachFeature: function(feature, layer){
                atributes(feature, layer);
            },
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: sitioInteresIcon});
            }
        });
        controlLayer.addOverlay(temad_punto_interes, '<p class="p">Sitios de interés</p>');
    }
});

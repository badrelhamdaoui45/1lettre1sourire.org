// Form requirements for this script to work fine : 
// - There must be a radio button to select between 'send to 1 center' or 'send to random ones', 
//   The option 'send to 1 center' must have a value of 'choose',
//   The radio button must have a css class named 'choix-ehpad'
// - There must be an HTML bloc which content must include this code '<div id="mapdiv"></div>'
//   The css class of this bloc must include 'leaflet-container'
// - There must be a (hidden) text input field with the css class 'ehpad-position'. 
//   It will store the lat-long position of the selected center
// - There must be a (hidden) text input field with the css class 'ehpad-id'. 
//   It will store the ID of the selected center
// - The selected ehpad name will be displayed in a text input field with the css class 'ehpad-nom'
//   This field will be deactivated
// *****************
// **** WARNING ****
// *****************
// this script must be loaded on the page :
// 1. Modify the page 
// 2. Check "Load map script" on the right panel


var mymap, L;
const yellow1L1S = '#eec94d';
const blue1L1S = '#3D5A80';
const markerHtmlStyles = `
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF;
`

const iconYellow = L.divIcon({
    className: "yellow-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}background-color: ${yellow1L1S};" />`
});
const iconBlue = L.divIcon({
    className: "blue-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}background-color: ${blue1L1S};" />`
});

var geolocationAvailable = false;

jQuery(function() {
    initForm();
    //initMap();

    jQuery('.choix-ehpad').find('input[type="radio"]').change(function() {
        var _value = jQuery(this).val();
        if (_value == 'choose') {
            jQuery('#mapdiv').show({
                complete: d => mymap.invalidateSize(),
            });

            if (!mymap) {
                initMap();
                initGeolocation();
                initMapButtons();
            }
            // getLocation();
        } else {
            jQuery('#mapdiv').hide();
        }
    });
});

jQuery(document).on('gform_post_render', function(event, form_id, current_page) {
    console.log("partnership!");
    const url = new URL(location);
    if (url.searchParams.get('partnership') == 'neveo')
        document.getElementById('field_2_32').style.display = 'none';

    if (url.searchParams.get('partnership') == 'maison-de-retraite-le-film') {
        document.querySelectorAll('.mdr-film').forEach(e => {
            e.classList.remove('hide');
        });
        document.querySelector('[data-id="52263d21"]').classList.add('hide');
    }

    if (url.searchParams.get('partnership') == 'belfort' || url.searchParams.get('utm_campaign') == 'belfort') {
        document.querySelectorAll('.belfort').forEach(e => {
            e.classList.remove('hide');
        });
        document.querySelector('[data-id="52263d21"]').classList.add('hide');
    }

    if (url.searchParams.get('partnership') == 'cat-image') {
        document.querySelectorAll('.cat-image').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'ups' || url.searchParams.get('utm_campaign') == 'ups+noel') {
        document.querySelectorAll('.ups').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'cafegrandmere' || url.searchParams.get('utm_campaign') == 'cafe-grand-mere') {
        document.querySelectorAll('.cafegrandmere').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'sigma_theta_pi' || url.searchParams.get('utm_campaign') == 'sigma_theta_pi') {
        document.querySelectorAll('.sigma_theta_pi').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'lefil' || url.searchParams.get('utm_campaign') == 'lefil') {
        document.querySelectorAll('.lefil').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'ministeredessolidarites' || url.searchParams.get('utm_campaign') == 'ministere-des-solidatrites') {
        document.querySelectorAll('.ministeredessolidarites').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'departementdesyvelines' || url.searchParams.get('utm_campaign') == 'yvelines') {
        document.querySelectorAll('.departementdesyvelines').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('utm_campaign') == 'give-me-5' || url.searchParams.get('utm_campaign') == 'give-me-5') {
        document.querySelectorAll('.give-me-5').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'mc2i' || url.searchParams.get('utm_campaign') == 'mc2i') {
        document.querySelectorAll('.mc2i').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'pwc' || url.searchParams.get('utm_campaign') == 'pwc') {
        document.querySelectorAll('.pwc').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'kpmg' || url.searchParams.get('utm_campaign') == 'kpmg') {
        document.querySelectorAll('.kpmg').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'nexcity' || url.searchParams.get('utm_campaign') == 'nexcity') {
        document.querySelectorAll('.nexcity').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'le_marche_saint_germain' || url.searchParams.get('utm_campaign') == 'le_marche_saint_germain') {
        document.querySelectorAll('.le_marche_saint_germain').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'ecrin_blanc' || url.searchParams.get('utm_campaign') == 'ecrin_blanc') {
        document.querySelectorAll('.ecrin_blanc').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'manfield' || url.searchParams.get('utm_campaign') == 'manfield') {
        document.querySelectorAll('.manfield').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'roche-sur-yon+' || url.searchParams.get('utm_campaign') == 'roche-sur-yon+') {
        document.querySelectorAll('.roche_sur_yon').forEach(e => {
            e.classList.remove('hide');
        });
    }
    if (url.searchParams.get('partnership') == 'roche-sur-yon' || url.searchParams.get('utm_campaign') == 'roche-sur-yon') {
        document.querySelectorAll('.roche_sur_yon').forEach(e => {
            e.classList.remove('hide');
        });
    }

    // For Armonia
    if (url.searchParams.get('partnership') == 'armonia' || url.searchParams.get('utm_campaign') == 'armonia') {
        document.querySelectorAll('.armonia').forEach(e => {
            e.classList.remove('hide');
        });
    }

    // For Volotea
    if (url.searchParams.get('partnership') == 'volotea' || url.searchParams.get('utm_campaign') == 'volotea') {
        document.querySelectorAll('.volotea').forEach(e => {
            e.classList.remove('hide');
        });
    }

    if (url.searchParams.get('partnership') == 'cambodge' || url.searchParams.get('utm_campaign') == 'bruxelles') {
        document.querySelectorAll('.bruxellescambodge').forEach(e => {
            e.classList.remove('hide');
        });
    }

    // For testing
    if (url.searchParams.get('partnership') == 'test' || url.searchParams.get('utm_campaign') == 'test') {
        document.querySelectorAll('.test').forEach(e => {
            e.classList.remove('hide');
        });
    }

    // For La Traversé
    if (url.searchParams.get('partnership') == 'latraversée' || url.searchParams.get('utm_campaign') == 'latraversée') {
        document.querySelectorAll('.latraversée').forEach(e => {
            e.classList.remove('hide');
        });
    }


    // code to be trigger when next/previous page is loaded
    if (current_page == 1) {
        //console.log('Init map');
        initForm();
        _thevalue = jQuery('.choix-ehpad').find('input[type="radio"]:checked').val();
        if (_thevalue && _thevalue == 'choose') {
            jQuery('#mapdiv').show({
                complete: d => mymap.invalidateSize(),
            });

            if (!mymap) {
                initMap();
                initGeolocation();
                initMapButtons();
                // getLocation();
                mymap.invalidateSize();
            }
        }
    }
    console.log('STEP LOADED : ' + current_page);
});

function initForm() {
    jQuery('.ehpad-nom').find('input[type="text"]').attr('readonly', true);
}

function initGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            if (pos.coords.accuracy < 800) {
                geolocationAvailable = true;
                jQuery("#map-button-location").removeClass("disabled")
            }
        })
    }
}

function initMapButtons() {
    var buttonCode = '<div lang=' + document.documentElement.lang + ' class="map-button" id="map-button-home"><i class="fas fa-home"></i></div>'
    buttonCode += '<div lang=' + document.documentElement.lang + ' class="map-button disabled" id="map-button-location"><i class="fas fa-crosshairs"></i></div>'
    buttonCode += '<div lang=' + document.documentElement.lang + ' class="map-button" id="map-button-all"><i class="fas fa-globe-europe"></i></div>';
    jQuery('#mapbutton').html(buttonCode)
    jQuery("#map-button-home").click(setViewHome);
    jQuery("#map-button-all").click(setViewWorld);
    jQuery("#map-button-location").click(getLocation);
}

function setViewHome() {
    mymap.flyTo([47.784, 2.268], 5);
}

function setViewWorld() {
    if (jQuery("#mapdiv").width() > 600) {
        mymap.flyTo([33.724, -10.195], 2);
    } else {
        mymap.flyTo([23.241, -34.195], 1);
    }
}

function initMap() {
    mymap = L.map('mapdiv').setView([47.784, 2.268], 5);
    // setViewHome()


    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVjYXNtYXIxMjMiLCJhIjoiY2xoYWV6cmQ3MGd5djNjbHRmb3JvbWl4MyJ9.vIUhamvazdlwn3KCY2UP9g', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

    ehpad_list = JSON.parse(ehpad_list);
    ehpad_list_fra = ehpad_list['ehpad_fra'];
    ehpad_list_en = ehpad_list['ehpad_en'];
    ehpad_list_nl = ehpad_list['ehpad_nl'];
    ehpad_list_de = ehpad_list['ehpad_de'];
    ehpad_list_es = ehpad_list['ehpad_es'];
    ehpad_list_fra = ehpad_list_fra.filter(d => (d.geometry.coordinates[0] && d.geometry.coordinates[1]));
    ehpad_list_en = ehpad_list_en.filter(d => (d.geometry.coordinates[0] && d.geometry.coordinates[1]));
    ehpad_list_nl = ehpad_list_nl.filter(d => (d.geometry.coordinates[0] && d.geometry.coordinates[1]));
    ehpad_list_de = ehpad_list_de.filter(d => (d.geometry.coordinates[0] && d.geometry.coordinates[1]));
    ehpad_list_es = ehpad_list_es.filter(d => (d.geometry.coordinates[0] && d.geometry.coordinates[1]));
    var markers = L.markerClusterGroup({
        disableClusteringAtZoom: 10,
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: false,
    });
    if (document.documentElement.lang == 'fr-FR') {
        markers.addLayer(
            L.geoJSON(ehpad_list_fra, {
                onEachFeature: onEachFeature,
            })
        )
    } else if (document.documentElement.lang == 'en-US') { // si une autre langue est rajoutée penser a mettre un else if
        markers.addLayer(
            L.geoJSON(ehpad_list_en, {
                onEachFeature: onEachFeature,
            })
        )
    } else if (document.documentElement.lang == 'nl-NL') { // si une autre langue est rajoutée penser a mettre un else if
        markers.addLayer(
            L.geoJSON(ehpad_list_nl, {
                onEachFeature: onEachFeature,
            })
        )
    } else if (document.documentElement.lang == 'de-DE') { // si une autre langue est rajoutée penser a mettre un else if
        markers.addLayer(
            L.geoJSON(ehpad_list_de, {
                onEachFeature: onEachFeature,
            })
        )
    } else if (document.documentElement.lang == 'es-ES') { // si une autre langue est rajoutée penser a mettre un else if
        markers.addLayer(
            L.geoJSON(ehpad_list_es, {
                onEachFeature: onEachFeature,
            })
        )
    }


    mymap.addLayer(markers);
}

function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}

function featureClickEvent(e) {
    jQuery('.ehpad-position').find('input[type="text"]').val(e.latlng.lat + "," + e.latlng.lng);
    jQuery('.ehpad-nom').find('input[type="text"]').val(decodeEntities(e.target.feature.properties.name));
    jQuery('.ehpad-nom').find('input[type="text"]').css("border", '1px solid #f9d564');

    jQuery('.ehpad-id').find('input[type="text"]').val(e.target.feature.properties.id);

    if (clickedMarker) {
        clickedMarker.setIcon(iconBlue);
    }
    var layer = e.target;
    e.target.setIcon(iconYellow);
    clickedMarker = e.target;

    return;
}

function onEachFeature(feature, layer) {
    var content = "<strong>" + feature.properties.name + "</strong><br>" + feature.properties.address + "<br>" + feature.properties.zipcode + " " + feature.properties.country;
    layer.setIcon(iconBlue);
    layer.bindPopup(content);
    layer.on({
        click: featureClickEvent
    });
}

var clickedMarker;

function getPositionSuccess(pos) {
    // we center to the user pos only if it's accurate enough
    if (pos.coords.accuracy < 1000) {
        centerMapToMyPosition(pos);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPositionSuccess);
    } else {
        console.log = "Geolocation is not supported by this browser.";
    }
}

function centerMapToMyPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    mymap.flyTo([lat, lon], 13);
    mymap.once('moveend', function() {
        L.circleMarker([lat, lon], {
            radius: 5,
            fillOpacity: 1,
            fillColor: '#3388ff',
            color: 'white',
            weight: 2,
        }).addTo(mymap);
    });
}
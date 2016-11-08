"use strict";
// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

function truncate(n, useWordBoundary) {
    var isTooLong = this.length > n,
        s_ = isTooLong ? this.substr(0, n - 1) : this;
    s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
    return isTooLong ? s_ + '&hellip;' : s_;
};

mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2lqbmpqazdlMDBsdnRva284cWd3bm11byJ9.V6Hg2oYJwMAxeoR9GEzkAA';

// This adds the map
var bounds = [
    //    [8.466, 47.193], // Southwest coordinates
    //    [8.905, 47.442] // Northeast coordinates
    [8.2465, 47.0685], // Southwest coordinates
    [9.1245, 47.5665] // Northeast coordinates
];
var map = new mapboxgl.Map({
    // container id specified in the HTML
    container: 'map',
    // style URL
    style: 'mapbox://styles/mapbox/bright-v9',
    // initial position in [long, lat] format
    center: [8.73, 47.3],
    // initial zoom
    zoom: 10,
    maxBounds: bounds
});

var zoomNow = map.getZoom();
/*
https://docs.google.com/document/d/1T8s82w7HAidq8l49oHmVLcn4VYNrnbd5aIoGD4ukBps/edit?usp=sharing

var stores =
*/

$.ajax({
    //   url: "https://docs.google.com/document/d/1T8s82w7HAidq8l49oHmVLcn4VYNrnbd5aIoGD4ukBps/edit?usp=sharing"
    url: 'beispielobjektsammlung.geojson'

}).done(function(places) {

    places = eval('(' + places + ')');
    map.on('load', function(e) {

        map.addSource('places', {
            'type': 'geojson',
            'data': places
        });

        /*        map.addLayer({
                    "id": "place",
                    "type": "symbol",
                    "source": "places",
                    "layout": {
                       // "circle-radius": 20,
        //                "icon-image": "marker.png",
                        "icon-image": "circle-11",
                       // "icon-opacity": 1,
                      //  "background-color": "red",
                      //  "circle-color": "#A00"
                      //  "icon-color": "#A00",
             //           "text-field": "xxx",
                        "icon-ignore-placement": true,
            //            "text-size": 60
             //           "text-opacity": "0.5"
             //"circle-blur": 1
                    }
                });
        */

        map.addSource("route", {
            "type": "geojson",
            "data": s5strecke
        });

        map.on('zoomend', UpdateListing);
        map.on('dragend', UpdateListing);

        places.features.forEach(function(feature, i) {
            var placenr = feature.properties.OBJ_Fun_ID;
            // Create an img element for the marker
            var el = document.createElement('div');
            el.id = 'marker-' + i;
            el.className = 'markerf' + funGrp(placenr);
            el.style.left = '-28px';
            el.style.top = '-46px';
            el.style.left = '-24px';
            el.style.top = '-56px';
            el.OBJ_Fun_ID = placenr;

            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .addTo(map);

            el.addEventListener('click', function(e) {
                flyToStore(feature);
                createPopUp(feature);
                var activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }

                var listing = document.getElementById('listing-' + i);
                listing.classList.add('active');

            });
            $('#marker-' + i).hover(function(e) {
                createMiniPopUp(feature);
                var activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
            });
        });

        buildLocationList(places);

        map.addLayer({
            "id": "route",
            "type": "line",
            "source": "route",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                //                "line-color": "#f88",
                "line-color": "#AABB1D",
                "line-width": 5
            }
        });

        function doGroup0(e) {
            var how = e.target.checked ? '' : 'none';
            var groupnr = e.target.id.substr(4, e.target.id.length);
            if (groupnr == 91) {
                doBigGroup([groupnr, 10, 11, 12, 13, 14], how);
            } else if (groupnr == 92) {
                doBigGroup([groupnr, 1, 2, 3, 4, 5], how);
            } else if (groupnr == 93) {
                doBigGroup([groupnr, 6, 7, 8, 9], how);
            } else {
                doGroup(groupnr, how);
            }
        }

        function doBigGroup(grouparray, how) {
            var howb = how != 'none';
            for (var i = 0; i < grouparray.length; i++) {
                doGroup(grouparray[i], how);
                var c = document.getElementById('fkt-' + grouparray[i]);
                if (c) {
                    c.checked = howb;
                }
            }
        }

        function doGroup(groupnr, how) {
            if (!groupnr || groupnr == "") return
            var listings = document.querySelectorAll("[data-fktlis='" + groupnr + "']");
            for (var i = 0; i < listings.length; i++) {
                listings[i].style.display = how;
            }
            updateMarkersFromListing();
        }

        var filterGroup = document.getElementById('fktfilter').children;
        for (var j = 0; j < filterGroup.length; j++) {
            filterGroup[j].addEventListener('change', doGroup0);
        }

        function doQualiGroup(e) {
            var how = e.target.checked ? '' : 'none';
            var groupnr = e.target.id.substr(6, e.target.id.length);
            if (groupnr == 91) {
                var listings = document.getElementById('listings').children;
                for (var i = 0; i < listings.length; i++) {
                    listings[i].style.display = how;
                }
                var howb = how != 'none';

                listings = document.getElementById('qualis').children;
                for (var i = 0; i < listings.length; i++) {
                    listings[i].checked = howb;
                }
            } else {


                if (!groupnr || groupnr == "") return
                var listings = document.querySelectorAll("[data-qualilis1='" + groupnr + "']");
                for (var i = 0; i < listings.length; i++) {
                    listings[i].style.display = how;
                }
                listings = document.querySelectorAll("[data-qualilis2='" + groupnr + "']");
                for (var i = 0; i < listings.length; i++) {
                    listings[i].style.display = how;
                }
                listings = document.querySelectorAll("[data-qualilis3='" + groupnr + "']");
                for (var i = 0; i < listings.length; i++) {
                    listings[i].style.display = how;
                }
            }
            updateMarkersFromListing();
        }

        var filterQualiGroup = document.getElementById('qualifilter').children;
        for (var j = 0; j < filterQualiGroup.length; j++) {
            filterQualiGroup[j].addEventListener('change', doQualiGroup);
        }

        /*       for (var j = 0; j < listings.length; j++) {
                    listings[j].addEventListener('change', function(e) {
                        var how = e.target.checked ? 'inline' : 'none';
                        var placenr = e.target.id.substr(4, e.target.id.length);
                        var markers = document.getElementsByClassName('marker' + placenr);
                        for (var i = 0; i < markers.length; i++) {
                            markers[i].style.display = how;
                        };
                    });
                } 
        */
        var filterInput = document.getElementById('filter-input');
        filterInput.addEventListener('keyup', function(e) {
            var value = e.target.value.trim().toLowerCase();
            var listings = document.getElementById('listings').children;
            for (var i = 0; i < listings.length; i++) {
                var listing = listings[i];
                var how = listing.innerHTML.toLowerCase().indexOf(value) > -1 ? '' : 'none';
                listing.style.display = how;
            }
            updateMarkersFromListing();
        });

        function updateMarkersFromListing() {
            var listings = document.getElementById('listings').children;
            for (var i = 0; i < listings.length; i++) {
                var listing = listings[i];
                var placenr = listing.id.substr(8, 99);
                var marker = document.getElementById('marker-' + placenr);
                marker.style.display = listing.style.display;
            }
        }

        function updateListingElement(nr) {
            var filterGroup = document.getElementById('fktfilter').children;
            for (var j = 0; j < filterGroup.length; j += 1) {
                if (filterGroup[j].type == 'checkbox') {
                    if (!filterGroup[j].checked) {
                        var groupnr = filterGroup[j].id.substr(4, filterGroup[j].id.length);
                        doGroup(groupnr, 'none');
                    }
                }
            }
        }

        function updateListingFromMap() {
            var listings = document.getElementById('listings').children;
            var bounds = map.getBounds();
            for (var i = 0; i < listings.length; i++) {
                var listing = listings[i];
                if (!visibleOnMap(listing.getAttribute('data-lng'), listing.getAttribute('data-lat'), bounds)) {
                    listing.style.display = 'none';
                }
            }
        }

        function updateListingFromFilterGroup() {
            var filterGroup = document.getElementById('fktfilter').children;
            for (var j = 0; j < filterGroup.length; j += 1) {
                if (filterGroup[j].type == 'checkbox') {
                    if (!filterGroup[j].checked) {
                        var groupnr = filterGroup[j].id.substr(4, filterGroup[j].id.length);
                        doGroup(groupnr, 'none');
                    }
                }
            }
        }

        function showAllListing() {
            var listings = document.getElementById('listings').children;
            for (var i = 0; i < listings.length; i++) {
                listings[i].style.display = '';
            }
        }

        function visibleOnMap(lng, lat, bounds) {
            if (lng < bounds.getWest()) return false;
            if (lng > bounds.getEast()) return false;
            if (lat < bounds.getSouth()) return false;
            if (lat > bounds.getNorth()) return false;
            return true;
        }

        function switchLayer(layer) {
            var layerId = layer.target.id;
            map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
            map.style.on('load', function() {

                map.addSource("route", {
                    "type": "geojson",
                    "data": s5strecke
                });

                map.addLayer({
                    "id": "route",
                    "type": "line",
                    "source": "route",
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "#AABB1D",
                        "line-width": 5
                    }
                });

            });
        }

        function UpdateListing() {
            var zoomNew = map.getZoom();
            if (zoomNow >= zoomNew) {
                showAllListing();
                updateListingFromFilterGroup();
            }
            updateListingFromMap();
            zoomNow = zoomNew;
        }

        var layerList = document.getElementById('menu');
        var inputs = layerList.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].onclick = switchLayer;
        }
    });
});

var markerHeight = 30,
    markerRadius = 10,
    linearOffset = 25;
var popupOffsets = {
    'top': [0, 0],
    'top-left': [0, 0],
    'top-right': [0, 0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
};

var popup = new mapboxgl.Popup({
    offset: popupOffsets,
    closeButton: false,
    closeOnClick: false
});

/*map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['place'] });
    console.log(features.length);
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.Obj_Name)
        .addTo(map);
});
*/

// This is where your interactions with the placenr layer used to be
// Now you have interactions with DOM markers instead

function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 14
    });
}

function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();

    var popUps = document.getElementsByClassName('minipopup');
    if (popUps[0]) popUps[0].remove();

    var img = '';
    if (currentFeature.properties.Fotodatei !== '') {
        img = '<img src="Bilder180/' + currentFeature.properties.Fotodatei + '" width="180" height="120">';
    }

    var besquali = currentFeature.properties.Obj_Qua1;
    var greenbullet = ' <span style="font-size: 20px; font-weight: bold; color: #AABB1D"> &bullet; </span>';
    if (currentFeature.properties.Obj_Qua2 !== '') {
        besquali += greenbullet + currentFeature.properties.Obj_Qua2;
    }
    if (currentFeature.properties.Obj_Qua3 !== '') {
        besquali += greenbullet + currentFeature.properties.Obj_Qua3;
    }

    var link = '';
    if (currentFeature.properties.Link !== '') {
        link = '<p><a href="' + currentFeature.properties.Link + '" target="_blank">→ Link</a>';
    }
    var details = '<a href="details.php?id=' + currentFeature.properties.ID + '" target="_blank">→ Details</a></p>';

    var popup = new mapboxgl.Popup({
            closeOnClick: false
        })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(img +
            '<h3>' + currentFeature.properties.Obj_Name + ', ' + currentFeature.properties.Obj_Gem + '</h3>' +
            '<h5>Funktion</h5>' +
            '<p>' + currentFeature.properties.Obj_Funktion + '</p>' +
            '<h5>Besondere Qualität</h5>' +
            '<p>' + besquali + '</p>' +
            '<h5>Kommentar</h5>' +
            '<p style="font-size: 14px">' + truncate.apply(currentFeature.properties.Kommentar, [45, true]) + '</p>' +
            link + '&nbsp;&nbsp;&nbsp;' + details
        )
        .addTo(map);
}

function createMiniPopUp(currentFeature) {
    if ((currentFeature.properties.Obj_Name + ', ' + currentFeature.properties.Obj_Gem) ==
        $('.mapboxgl-popup').find('h3').html()) return;
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    var popUps = document.getElementsByClassName('minipopup');
    if (popUps[0]) popUps[0].remove();


    var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true
        })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(
            '<div class="minipopup"><h3>' + currentFeature.properties.Obj_Name + ', ' + currentFeature.properties.Obj_Gem + '</h3></div>'
        )
        .addTo(map);
}

function funGrp(fun) {
    if (fun >= 10) {
        return 1;
    } else if (fun >= 6 && fun <= 9) {
        return 3;
    } else {
        return 2;
    }
}

function buildLocationList(places) {
    for (var i = 0; i < places.features.length; i++) {
        var currentFeature = places.features[i];
        var prop = currentFeature.properties;

        var listings = document.getElementById('listings');
        var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'item';
        listing.id = 'listing-' + i;
        listing.setAttribute('data-fktlis', prop.OBJ_Fun_ID);
        listing.setAttribute('data-qualilis1', prop.Obj_Qua1_ID);
        listing.setAttribute('data-qualilis2', prop.Obj_Qua2_ID);
        listing.setAttribute('data-qualilis3', prop.Obj_Qua3_ID);
        listing.setAttribute('data-lng', currentFeature.geometry.coordinates[0]);
        listing.setAttribute('data-lat', currentFeature.geometry.coordinates[1]);

        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title f' + funGrp(prop.OBJ_Fun_ID);
        link.placesPosition = i;
        link.innerHTML = prop.Obj_Name + ', ' + prop.Obj_Gem;

        var details = listing.appendChild(document.createElement('div'));
        details.innerHTML = prop.Kommentar;
        if (prop.Obj_Gem) {
            //            details.innerHTML += ' &middot; ' + prop.Obj_Gem;
        }
        link.addEventListener('click', function(e) {
            var clickedListing = places.features[this.placesPosition];
            flyToStore(clickedListing);
            createPopUp(clickedListing);
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');

        });
    }
    $('.item').sort(function (a, b) {

      var contentA = parseInt( $(a).attr('data-fktlis'));
      var contentB = parseInt( $(b).attr('data-fktlis'));
      contentA = 100 * funGrp(contentA) + contentA;
      contentB = 100 * funGrp(contentB) + contentB;
      return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
   })
}

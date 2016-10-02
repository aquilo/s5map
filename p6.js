// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2lqbmpqazdlMDBsdnRva284cWd3bm11byJ9.V6Hg2oYJwMAxeoR9GEzkAA';

var filterGroup = document.getElementById('filter-group');
// This adds the map
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/mapbox/light-v9',
  // initial position in [long, lat] format
  center: [8.73, 47.3],
  // initial zoom
  zoom: 11
});
/*
https://docs.google.com/document/d/1T8s82w7HAidq8l49oHmVLcn4VYNrnbd5aIoGD4ukBps/edit?usp=sharing

var stores =
*/

// This adds the places to the map
var stores = $.ajax({
  //   url: "https://docs.google.com/document/d/1T8s82w7HAidq8l49oHmVLcn4VYNrnbd5aIoGD4ukBps/edit?usp=sharing"
  url: 'beispielobjektsammlung.geojson'

}).done(function(places) {
  places = eval('(' + places + ')');
  map.on('load', function(e) {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource('places', {
      'type': 'geojson',
      'data': places
    });

    places.features.forEach(function(feature, i) {
      var symbol = feature.properties['OBJ_Fun_ID'];
      symbol = '' + symbol;
      var layerID = 'poi-' + symbol;
      var labelx = feature.properties['Obj_Funktion'];
      if (!map.getLayer(layerID)) {
        console.log('******** ' + layerID + ' ******** ');
        map.addLayer({
          'id': layerID,
          'type': 'symbol',
          'source': 'places',
          'layout': {
            'icon-image': 'Markers/' + symbol + '.png',
            // "icon-image": "pin-m-star+AA0000.png",
            'icon-allow-overlap': true
          },
          'filter': ['==', 'OBJ_Fun_ID', symbol]
        });
        // Add checkbox and label elements for the layer.
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = layerID;
        input.checked = true;
        filterGroup.appendChild(input);

        var label = document.createElement('label');
        label.setAttribute('for', layerID);
        label.textContent = symbol;
        filterGroup.appendChild(label);

        // When the checkbox changes, update the visibility of the layer.
        input.addEventListener('change', function(e) {
          map.setLayoutProperty(layerID, 'visibility',
            e.target.checked ? 'visible' : 'none');
        });
      }
      // Create an img element for the marker
      var el = document.createElement('div');
      el.id = 'marker-' + i;
      el.className = 'marker' + symbol;
      el.className = 'markerpin';
      el.style.left = '-28px';
      el.style.top = '-46px';
      el.style.left = '-24px';
      el.style.top = '-56px';
      // var layerID = 'poi-' + el.className;
      // Add markers to the map at all points
      //  console.log(el.id + " " + feature.geometry.coordinates);
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);

      el.addEventListener('click', function(e) {
        // 1. Fly to the point
        flyToStore(feature);

        // 2. Close all other popups and display popup for clicked store
        createPopUp(feature);

        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        var activeItem = document.getElementsByClassName('active');

        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }

        var listing = document.getElementById('listing-' + i);
        listing.classList.add('active');

      });



    });

    // This is where your '.addLayer()' used to be
    // Initialize the list

    buildLocationList(places);
  });
});

// This is where your interactions with the symbol layer used to be
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

  var link = '';
  if (currentFeature.properties.Link !== '') {
    link = '<p><a href="' + currentFeature.properties.Link + '" target="_blank">→ Link</a>';
  }
  details = '<a href="details.php?id=' + currentFeature.properties.ID + '" target="_blank">→ Details</a></p>';

  var popup = new mapboxgl.Popup({
      closeOnClick: false
    })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>' + currentFeature.properties.Obj_Name + ', ' + currentFeature.properties.Obj_Gem + '</h3>' +
      '<h4>' + currentFeature.properties['Obj_Funktion'] + '</h4>' +
      '<p>' + currentFeature.properties.Obj_Qualitaet + '</p>' +
      '<p>' + currentFeature.properties.Kommentar + '</p>' + link + '&nbsp;&nbsp;&nbsp;' + details
    )
    .addTo(map);
}

function buildLocationList(places) {
  for (i = 0; i < places.features.length; i++) {
    var currentFeature = places.features[i];
    var prop = currentFeature.properties;

    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';
    listing.id = 'listing-' + i;

    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.placesPosition = i;
    link.innerHTML = prop.Obj_Name;

    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.Kommentar;
    if (prop.Obj_Gem) {
      details.innerHTML += ' &middot; ' + prop.Obj_Gem;
    }
    link.addEventListener('click', function(e) {
      // Update the currentFeature to the store associated with the clicked link
      var clickedListing = places.features[this.placesPosition];

      // 1. Fly to the point
      flyToStore(clickedListing);

      // 2. Close all other popups and display popup for clicked store
      createPopUp(clickedListing);

      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      var activeItem = document.getElementsByClassName('active');

      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      this.parentNode.classList.add('active');

    });
  }
}
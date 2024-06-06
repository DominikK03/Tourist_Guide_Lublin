let map;
let directionsService;
let directionsRendererDriving;
let directionsRendererWalking;
let directionsRendererBicycling;
let currentPosition;
let activeRenderer = null;
let selectedDestination = null;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.2465, lng: 22.5684 },
    zoom: 13,
    mapTypeControl: false // Wyłącza kontrolki "Satelita" i "Mapa"
  });

  directionsService = new google.maps.DirectionsService();
  directionsRendererDriving = new google.maps.DirectionsRenderer({ map, polylineOptions: { strokeColor: 'blue' } });
  directionsRendererWalking = new google.maps.DirectionsRenderer({ map, polylineOptions: { strokeColor: 'green' } });
  directionsRendererBicycling = new google.maps.DirectionsRenderer({ map, polylineOptions: { strokeColor: 'red' } });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(currentPosition);

        const userMarker = new google.maps.Marker({
          position: currentPosition,
          map: map,
          title: 'Twoja Lokalizacja'
        });

        addLocationMarkers();
      },
      () => {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, map.getCenter());
  }

  // Add travel info box
  const travelInfoBox = document.createElement('div');
  travelInfoBox.id = 'travel-info-box';
  travelInfoBox.innerHTML = `
    <div id="driving-info" class="travel-mode"><img src="img/driving.png" alt="Driving"> <span>-- min</span></div>
    <div id="walking-info" class="travel-mode"><img src="img/walking.png" alt="Walking"> <span>-- min</span></div>
    <div id="bicycling-info" class="travel-mode"><img src="img/bicycling.png" alt="Bicycling"> <span>-- min</span></div>
  `;
  document.getElementById('map').appendChild(travelInfoBox);

  document.querySelectorAll('.travel-mode').forEach(element => {
    element.addEventListener('click', () => {
      const travelMode = element.id.split('-')[0].toUpperCase();
      if (selectedDestination) {
        showRoute(travelMode, selectedDestination);
      }
    });
  });
}

function handleLocationError(browserHasGeolocation, pos) {
  console.error(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : 'Error: Your browser doesn\'t support geolocation.'
  );
}

function addLocationMarkers() {
  const locations = [
    { name: "Brama Krakowska", position: { lat: 51.24759106330887, lng: 22.56651608432512 }, gallery: "brama-krakowska" },
    { name: "Rynek Starego Miasta w Lublinie", position: { lat: 51.24795259208489, lng: 22.56776345443592 }, gallery: "rynek" },
    { name: "Kamienice na Rynku w Lublinie", position: { lat: 51.248384490620595, lng: 22.56817157743883 }, gallery: "kamienice" },
    { name: "Kamień Nieszczęścia", position: { lat: 51.247177738135065, lng: 22.56798304077623 }, gallery: "kamien-nieszczescia" },
    { name: "Archikatedra Lubelska", position: { lat: 51.246768850196176, lng: 22.56838350563361 }, gallery: "archikatedra" },
    { name: "Plac Po Farze", position: { lat: 51.24876671448555, lng: 22.569287505864605 }, gallery: "plac-po-farze" },
    { name: "Zamek w Lublinie", position: { lat: 51.250560139212666, lng: 22.57178075274862 }, gallery: "zamek" },
    { name: "Krakowskie Przedmieście", position: { lat: 51.24797659606636, lng: 22.56090996445639 }, gallery: "krakowskie-przedmiescie" },
    { name: "Plac Litewski", position: { lat: 51.24811181839207, lng: 22.55900752158498 }, gallery: "plac-litewski" },
    { name: "Muzeum Wsi Lubelskiej", position: { lat: 51.26205732431987, lng: 22.50645261888695 }, gallery: "muzeum-wsi" }
  ];

  locations.forEach((location, index) => {
    const marker = new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.name
    });

    const infowindow = new google.maps.InfoWindow({
      content: location.name
    });

    marker.addListener('mouseover', () => {
      infowindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      infowindow.close();
    });

    marker.addListener('click', () => {
      selectedDestination = location.position;
      calculateAndDisplayRoute(location.position, 'DRIVING', 'driving-info');
      calculateAndDisplayRoute(location.position, 'WALKING', 'walking-info');
      calculateAndDisplayRoute(location.position, 'BICYCLING', 'bicycling-info');
      showImagesForLocation(index); // Wywołanie funkcji z lublin_gallery.js
    });
  });
}

function calculateAndDisplayRoute(destination, travelMode, infoElementId) {
  const request = {
    origin: currentPosition,
    destination: destination,
    travelMode: google.maps.TravelMode[travelMode]
  };

  directionsService.route(request, (response, status) => {
    if (status === 'OK') {
      const duration = response.routes[0].legs[0].duration.text;
      document.getElementById(infoElementId).querySelector('span').innerText = duration;
      document.getElementById(infoElementId).dataset.route = JSON.stringify(response);
    } else {
      console.error('Directions request failed due to ' + status);
    }
  });
}

function showRoute(travelMode, destination) {
  if (activeRenderer) {
    activeRenderer.set('directions', null);
  }

  switch (travelMode) {
    case 'DRIVING':
      activeRenderer = directionsRendererDriving;
      break;
    case 'WALKING':
      activeRenderer = directionsRendererWalking;
      break;
    case 'BICYCLING':
      activeRenderer = directionsRendererBicycling;
      break;
  }

  const infoElementId = `${travelMode.toLowerCase()}-info`;
  const routeData = JSON.parse(document.getElementById(infoElementId).dataset.route);

  if (routeData) {
    activeRenderer.setDirections(routeData);
  } else {
    console.error('No route data available for travel mode:', travelMode);
  }
}

window.initMap = initMap;

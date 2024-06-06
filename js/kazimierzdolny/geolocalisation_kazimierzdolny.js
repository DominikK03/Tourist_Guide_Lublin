let map;
let directionsService;
let directionsRendererDriving;
let directionsRendererWalking;
let directionsRendererBicycling;
let currentPosition;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.2465, lng: 22.5684 },
    zoom: 13
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
    { name: "Brama Krakowska", position: { lat: 51.24759106330887, lng: 22.56651608432512 } },
    { name: "Rynek Starego Miasta w Lublinie", position: { lat: 51.24795259208489, lng: 22.56776345443592 } },
    { name: "Kamienice na Rynku w Lublinie", position: { lat: 51.248384490620595, lng: 22.56817157743883 } },
    { name: "Kamień Nieszczęścia", position: { lat: 51.247177738135065, lng: 22.56798304077623 } },
    { name: "Archikatedra Lubelska", position: { lat: 51.246768850196176,  lng: 22.56838350563361 } },
    { name: "Plac Po Farze", position: { lat: 51.24876671448555, lng: 22.569287505864605 } },
    { name: "Zamek w Lublinie", position: { lat: 51.250560139212666, lng: 22.57178075274862 } },
    { name: "Krakowskie Przedmieście", position: { lat: 51.24797659606636, lng: 22.56090996445639 } },
    { name: "Plac Litewski", position: { lat: 51.24811181839207, lng: 22.55900752158498 } },
    { name: "Muzeum Wsi Lubelskiej", position: { lat: 51.26205732431987, lng: 22.50645261888695 } }
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
      showImagesForLocation(index);
      calculateAndDisplayRoute(location.position, 'DRIVING', directionsRendererDriving);
      calculateAndDisplayRoute(location.position, 'WALKING', directionsRendererWalking);
      calculateAndDisplayRoute(location.position, 'BICYCLING', directionsRendererBicycling);
    });
  });
}

function calculateAndDisplayRoute(destination, travelMode, renderer) {
  const request = {
    origin: currentPosition,
    destination: destination,
    travelMode: google.maps.TravelMode[travelMode]
  };

  directionsService.route(request, (response, status) => {
    if (status === 'OK') {
      renderer.setDirections(response);
    } else {
      console.error('Directions request failed due to ' + status);
    }
  });
}

window.initMap = initMap;

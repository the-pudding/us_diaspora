// function setupFlyover($mapUnexpected, mapCoordinates) {
//   $mapUnexpected.on('click', () => {
//     $mapUnexpected.flyTo({
//       center: [mapCoordinates.X2, mapCoordinates.Y2],
//       speed: 0.8
//     });
//   });
// }

function formatPUMA(puma) {

  let name = puma;
  if (puma.includes('--')) {
    name = puma.split('--')[1].replace(' PUMA', '')
  } else {
    name = name.replace(' PUMA', '')
  }
  return name

}

function makeMapUnexpected(mapCoordinates, container, data) {


  //   d3.select('html').classed('no-scroll', true)

  mapboxgl.accessToken =
    'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ';

  const $mapUnexpected = new mapboxgl.Map({
    // TODO Ask russell: Why do I need to return this map object if I declared it here? It's a global object, so shouldn't its value remain declared in the upper scope?
    container: `map-${container}`,
    // center: [mapCoordinates.X1, mapCoordinates.Y1],
    center: [-104.90465, 39.68594],
    // maxZoom: 16,
    maxZoom: 14,
    minZoom: 3,
    // pitch: 60,
    dragPan: true,
    scrollZoom: true,
    style: 'mapbox://styles/dock4242/ck43bzz4f01461cl4ri5e5ogn',
    maxBounds: [
      [-180, 0],
      [-40, 75]
    ],
    // zoom: 11,
  });

  $mapUnexpected.addControl(new mapboxgl.NavigationControl());
  $mapUnexpected.on('load', () => {

    // console.log($mapUnexpected.getSource('composite'))
    // console.log($mapUnexpected.style.sourceCaches)
    // console.log($mapUnexpected.getStyle().sources)

    // $mapUnexpected.addSource('composite', {
    //   'type': 'vector',
    //   'url': 'mapbox://dock4242.djhtixgc'
    // });



  })

  //   if (container !== 'intro') setupFlyover($mapUnexpected, mapCoordinates);

  //   let popupUnexpected = new mapboxgl.Popup({
  //     closeButton: false,
  //     closeOnClick: false,
  //     offset: 20
  //   });

  //   $mapUnexpected.on('zoom', e => {
  //     const currentZoom = $mapUnexpected.getZoom()
  //     if (currentZoom < 5) {
  //       $mapUnexpected.getCanvas().style.cursor = '';
  //       popupUnexpected.remove();
  //     }
  //     return
  //   })


  //   $mapUnexpected.on('mousemove', e => {
  //     // console.log(e.lngLat.wrap());
  //     const currentZoom = $mapUnexpected.getZoom()
  //     if (currentZoom < 5) {
  //       $mapUnexpected.getCanvas().style.cursor = '';
  //       popupUnexpected.remove();
  //       return
  //     }
  //     $mapUnexpected.getCanvas().style.cursor = 'pointer';

  //     const currentPUMA = $mapUnexpected.queryRenderedFeatures(e.point).filter(layer => {
  //       return layer.layer.id === 'puma_polygons'
  //     })[0]

  //     if (currentPUMA != undefined) {

  //       const pumaData = currentPUMA.properties.Name
  //       console.log(pumaData)

  //       const pumaDataFormatted = formatPUMA(pumaData)
  //       //   console.log(pumaDataFormatted)
  //       const tooltipSubhed = `<p class='nbhd-subhed'>${pumaDataFormatted}</p>`;
  //       console.log(e.lngLat)

  //       popupUnexpected
  //         .setLngLat(e.lngLat)
  //         .setHTML(tooltipSubhed)
  //         .addTo($mapUnexpected);
  //     }

  //   });



  return $mapUnexpected;
}

function makeTourMap(container) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ';
  const $mapTour = new mapboxgl.Map({
    container: `map-${container}`,
    center: [-100.13166997361526, 37.90144323731123],
    maxZoom: 16,
    scrollZoom: false,
    dragPan: true,
    style: 'mapbox://styles/dock4242/ck43bzz4f01461cl4ri5e5ogn',
    zoom: 3.5355101377334592,
  });


  return $mapTour;
}

function makeExploreMap(container) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ';
  const $mapExplore = new mapboxgl.Map({
    container: `map-${container}`,
    center: [-100.13167, 37.90144324],
    maxZoom: 16,

    dragPan: true,
    scrollZoom: false,
    style: 'mapbox://styles/dock4242/ck43bzz4f01461cl4ri5e5ogn',
    zoom: 3.5355101377334592,
  });



  let popupUnexpected = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 20,
    maxWidth: 300
  });

  $mapExplore.on('zoom', e => {
    const currentZoom = $mapExplore.getZoom()
    if (currentZoom < 5) {
      $mapExplore.getCanvas().style.cursor = '';
      popupUnexpected.remove();
    }
    return
  })


  $mapExplore.on('zoom', e => {
    popupUnexpected.remove();
    // console.log($mapExplore.getZoom())
  })

  $mapExplore.on('mousemove', e => {
    // console.log(e.lngLat.wrap());

    const currentZoom = $mapExplore.getZoom()
    if (currentZoom < 5) {
      $mapExplore.getCanvas().style.cursor = '';
      popupUnexpected.remove();
      return
    }
    $mapExplore.getCanvas().style.cursor = 'pointer';

    const currentPUMA = $mapExplore.queryRenderedFeatures(e.point).filter(layer => {
      return layer.layer.id === 'puma_polygons'
    })[0]

    // const currentDiaspora =

    if (currentPUMA != undefined) {

      const pumaData = currentPUMA.properties.Name
      //   console.log(pumaData)

      const pumaDataFormatted = formatPUMA(pumaData)
      //   console.log(pumaDataFormatted)
      const tooltipSubhed = `<p class='nbhd-subhed'>${pumaDataFormatted}</p>`;
      //   console.log(e.lngLat)

      popupUnexpected
        .setLngLat(e.lngLat)
        .setHTML(tooltipSubhed)
        .addTo($mapExplore);
    }

  });

  $mapExplore.addControl(new mapboxgl.NavigationControl());



  return $mapExplore;
}

function makeRoute($map, coords, counterValue) {
  console.log('nice');
  // TESTING
  const origin = [+coords.X1, +coords.Y1];
  const destination = [+coords.X2, +coords.Y2];
  // const from = turf.point([-75.343, 39.984]);

  const route = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [origin, destination],
      },
    }, ],
  };

  // A single point that animates along the route.
  // Coordinates are initially set to origin.
  //   const point = {
  //     type: 'FeatureCollection',
  //     features: [
  //       {
  //         type: 'Feature',
  //         properties: {},
  //         geometry: {
  //           type: 'Point',
  //           coordinates: origin,
  //         },
  //       },
  //     ],
  //   };

  // Calculate the distance in kilometers between route start/end point.
  const lineDistance = turf.lineDistance(route.features[0], 'kilometers');
  //   console.log(lineDistance);

  const arc = [];

  // Number of steps to use in the arc and animation, more steps means
  // a smoother arc and animation, but too many steps will result in a
  // low frame rate
  const steps = 500;

  // Draw an arc between the `origin` & `destination` of the two points
  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(route.features[0], i, 'kilometers');
    arc.push(segment.geometry.coordinates);
  }

  // Update the route with calculated arc coordinates
  route.features[0].geometry.coordinates = arc;

  let counter = counterValue;

  $map.on('load', () => {
    // Add a source and layer displaying a point which will be animated in a circle.
    $map.addSource('route', {
      type: 'geojson',
      data: route,
    });

    // $map.addSource('point', {
    //   type: 'geojson',
    //   data: point,
    // });

    $map.addLayer({
      id: 'route',
      source: 'route',
      type: 'line',
      paint: {
        'line-width': 2,
        'line-color': '#007cbf',
      },
    });

    // $map.addLayer({
    //   id: 'point',
    //   source: 'point',
    //   type: 'circle',
    //   paint: {
    //     'circle-radius': 10,
    //     'circle-color': '#007cbf',
    //   },

    //   //   type: 'symbol',
    //   //   layout: {
    //   //     'icon-image': 'airport-15',
    //   //     'icon-rotate': ['get', 'bearing'],
    //   //     'icon-rotation-alignment': 'map',
    //   //     'icon-allow-overlap': true,
    //   //     'icon-ignore-placement': true,
    //   //   },
    // });

    function animate() {
      // Update point geometry to a new position based on counter denoting
      // the index to access the arc.
      //   point.features[0].geometry.coordinates =
      //     route.features[0].geometry.coordinates[counter];

      // Calculate the bearing to ensure the icon is rotated to match the route arc
      // The bearing is calculate between the current point and the next point, except
      // at the end of the arc use the previous point and the current point
      //   point.features[0].properties.bearing = turf.bearing(
      //     turf.point(
      //       route.features[0].geometry.coordinates[
      //         counter >= steps ? counter - 1 : counter
      //       ]
      //     ),
      //     turf.point(
      //       route.features[0].geometry.coordinates[
      //         counter >= steps ? counter : counter + 1
      //       ]
      //     )
      //   );

      //   console.log(point.features[0].geometry.coordinates);
      // Update the source with this new data.
      //   $map.getSource('point').setData(point);

      // Request the next frame of animation so long the end has not been reached.
      if (counter < steps) {
        requestAnimationFrame(animate);
      }

      counter += 1;
    }

    // Start the animation.
    animate(counter);
  });
}

export default {
  makeMapUnexpected,
  makeTourMap,
  makeExploreMap,
  makeRoute,
};

/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
/* global d3 */
import enterView from 'enter-view';
// import turf from '@turf/turf'
// import turfHelpers from '@turf/helpers'
import makeMaps from './makeMaps';


let $countryHeaderLarge;
let $countryHeaderSmall;

let tourCoordinates;
let rawData;

let $mapIntro;
let $mapTour;
let $mapExplore;

let $mapGreece;
let $mapBulgaria;
let $mapTonga;
let $mapEcuador;

let data;
let nestedData;

let mapInterval;
let expandedNav = false;
let initialTime = 1

// const height = window.innerHeight;

const introCoords = {
  'X1': -68.32792,
  'Y1': 46.20214
}

// const tongaCoords = {
//   'X2': -111.99184859446382,
//   'Y2': 40.69852553447012,
//   'X1': -175.196482,
//   'Y1': -21.200206
// };
// const ecuadorCoords = {
//   'X2': -73.86617173851454,
//   'Y2': 40.74069877883909,
//   'X1': -78.78488785454653,
//   'Y1': -1.4859650869146321
// };
// const bulgariaCoords = {
//   'X2': -87.9760049258716,
//   'Y2': 42.038264174921,
//   'X1': 25.120547279064226,
//   'Y1': 42.957556303399286
// };

// const greeceCoords = {
//   'X2': -82.76700345733673,
//   'Y2': 27.972586791167004,
//   'X1': 22.368843,
//   'Y1': 38.969777
// }

function nestData(dataArg) {
  console.log(dataArg)

  nestedData = d3.nest()
    .key(d => d.reason_num)
    .entries(dataArg)
    .sort((a, b) => {
      return a.key < b.key ? 1 : -1
    })
    .filter(item => ['1', '2', '3', '4'].includes(item.key))
    .map(item => ({
      ...item,
      reason: item.values[0].reason
    }))

  console.log(nestedData)
}

function setupDOM() {
  $countryHeaderLarge = d3.select('.country-title__suffix')
  $countryHeaderSmall = d3.select('.subhed-country')
  //   $mapTour = makeMaps.makeTourMap('tour')

  //   $mapTour.on('click', () => {
  //     console.log($mapTour.getZoom())
  //   })


  d3.select('.explore__expand-tab').on('click', () => {

    if (expandedNav === false) {
      d3.select('nav.explore').style('transform', 'translateX(0)')
      d3.select('.triangle-left').classed('collapsed', true)
      expandedNav = true
    } else if (expandedNav === true) {
      d3.select('nav.explore').style('transform', 'translateX(-95%)')
      d3.select('.triangle-left').classed('collapsed', false)
      expandedNav = false
    }

    console.log('log')


  })


  d3.select('.intro__cover-text').on('click', () => {
    d3.select('.intro__cover-text').classed('slide-out-left', true)
    d3.select('.masthead').classed('slide-out-right', true)
    d3.select('html').classed('no-scroll', false)

  })

  d3.select('.tour-step').on('click', () => {
    d3.select('.intro__cover-text').classed('slide-out-left', true)
    d3.select('.masthead').classed('slide-out-right', true)
    d3.select('html').classed('no-scroll', false)
  })

  document.addEventListener('click', function (e) {

    e = e || window.event;
    const target = e.target || e.srcElement,
      text = target.textContent || target.innerText;
    console.log(target)
  }, false);




}

function titleCountryChange(name) {
  if (name.length > 7) {
    $countryHeaderLarge.style('font-size', '48px')
  } else if (name.length <= 7) {
    $countryHeaderLarge.style('font-size', '48px')
  }
}

function animateIntro(rawData) {

  data = rawData.sort((a, b) => {
      return (a.birthplace < b.birthplace) ? -1 : 1;
    })
    .map(item => ({
      ...item,
      X: +item.X,
      Y: +item.Y
    }));
  let i = 0;

  //   console.log(data)
  $mapIntro.on('load', () => {

    mapInterval = setInterval(function () {

      const newNameRaw = data[i].birthplace;

      $mapIntro.flyTo({
        center: [
          data[i].X,
          data[i].Y
        ],
        speed: 0.8,
        curve: 0.6, // change the speed at which it zooms out
        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        //   easing: function (t) {
        //     return t;
        //   },
        // this animation is considered essential with respect to prefers-reduced-motion
        // essential: true
      });



      $countryHeaderLarge.text(`${newNameRaw.replace(/_/g, ' ')}`);
      $countryHeaderSmall.text(`${newNameRaw.replace(/_/g, ' ')}`);
      titleCountryChange(newNameRaw)

      i++
      if (i === data.length) {
        i = 0
      }


    }, 6000);
  })



  //   d3.select('#map-intro').on('click', () => {
  //       clearInterval(mapInterval)
  //   })

  return rawData;
}

function resize() {

}

function makeIntroMap(data) {
  $mapIntro = makeMaps.makeMapUnexpected(introCoords, 'intro', rawData)
  return data;
}

function makeUnexpectedMaps(data) {



  //   $mapTonga = makeMaps.makeMapUnexpected(tongaCoords, 'tonga', rawData)
  //   $mapEcuador = makeMaps.makeMapUnexpected(ecuadorCoords, 'ecuador', rawData)
  //   $mapBulgaria = makeMaps.makeMapUnexpected(bulgariaCoords, 'bulgaria', rawData)
  //   $mapGreece = makeMaps.makeMapUnexpected(greeceCoords, 'greece', rawData)

  //   makeMaps.makeRoute($mapTonga, tongaCoords, 0)
  //   makeMaps.makeRoute($mapBulgaria, bulgariaCoords, 0)
  //   makeMaps.makeRoute($mapEcuador, ecuadorCoords, 0)
  //   makeMaps.makeRoute($mapGreece, greeceCoords, 0)


  return data;
}

function getReasonNumber(reason) {
  if (reason === 'economic') {
    return '3'
  }
  if (reason === 'community') {
    return '1'
  }
  if (reason === 'political') {
    return '2'
  }

}

function updateMap(el) {
  console.log(el)

  function flyToCoords(currentStep) {
    const destination = tourCoordinates.filter(item => item.name === currentStep)[0]
    $mapIntro.flyTo({
      center: [+destination.lon, +destination.lat],
      speed: 1,
      zoom: +destination.zoom
    })
  }
  const currentStep = el.getAttribute('data-step')
  if (currentStep === 'usa') {
    flyToCoords(currentStep)
  } else if (currentStep === 'nyc') {
    flyToCoords(currentStep)
  } else if (currentStep === 'nyc-brooklyn') {
    flyToCoords(currentStep)
  } else if (currentStep === 'nyc-queens') {
    flyToCoords(currentStep)
  } else if (currentStep === 'nyc-manhattan-bronx') {
    flyToCoords(currentStep)
  } else if (currentStep === 'la-1') {
    flyToCoords(currentStep)
  } else if (currentStep === 'fl-1') {
    flyToCoords(currentStep)
  } else if (currentStep === 'hou-1') {
    flyToCoords(currentStep)
  } else if (currentStep === 'minneapolis') {
    flyToCoords(currentStep)
  }
}

function updateMapBack(el) {
  console.log(el)

  function flyBackToCoords(prevStep) {
    const destination = tourCoordinates.filter(item => item.name === prevStep)[0]
    $mapIntro.flyTo({
      center: [+destination.lon, +destination.lat],
      speed: 1,
      zoom: +destination.zoom
    })
  }
  const prevStep = el.getAttribute('data-previous-step')

  //   console.log(el)
  //   console.log(prevStep)


  if (prevStep === 'usa') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'nyc') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'nyc-brooklyn') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'nyc-queens') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'nyc-manhattan-bronx') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'la-1') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'fl-1') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'hou-1') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'minneapolis') {
    flyBackToCoords(prevStep)
  }

}


function setupEnterView() {

  //   enterView({
  //     selector: '.tour',
  //     enter(el) {

  //     },
  //     exit(el) {
  //       //   d3.select('.intro__scroll-cue').classed('hidden', false)
  //     },
  //     progress(el, progress) {
  //       //   el.style.opacity = progress;
  //     },
  //     offset: 0.1, // enter at middle of viewport
  //     once: false, // trigger just once
  //   });

  window.onscroll = function () {
    myFunction()
  };

  function myFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      d3.select('.intro__scroll-cue').classed('hidden', true)
      clearInterval(mapInterval)
      //   console.log('fifty')
    } else {
      //   console.log('less than fifty')
      d3.select('.intro__scroll-cue').classed('hidden', false)
    }
  }



  enterView({
    selector: '.tour-step',
    enter(el) {
      updateMap(el)
    },
    exit(el) {
      updateMapBack(el)
    },
    progress(el, progress) {
      //   el.style.opacity = progress;
    },
    offset: 0.4, // enter at middle of viewport
    once: false, // trigger just once
  });

  enterView({
    selector: '.short-story',
    enter(el) {
      console.log(el)
    },
    exit(el) {
      console.log(el)
    }
  })

  //   enterView({
  //     selector: '#map-tonga',
  //     enter(el) {
  //       $mapTonga.flyTo({
  //         center: [tongaCoords.X2, tongaCoords.Y2],
  //         speed: 0.4,
  //       });
  //     },
  //     exit(el) {}
  //   })


  //   enterView({
  //     selector: '#map-bulgaria',
  //     enter(el) {
  //       $mapBulgaria.flyTo({
  //         center: [bulgariaCoords.X2, bulgariaCoords.Y2],
  //         speed: 0.4,
  //       });
  //     },
  //     exit(el) {}
  //   })

  //   enterView({
  //     selector: '#map-greece',
  //     enter(el) {
  //       $mapGreece.flyTo({
  //         center: [greeceCoords.X2, greeceCoords.Y2],
  //         speed: 0.4,
  //       });
  //     },
  //     exit(el) {}
  //   })

  //   enterView({
  //     selector: '#map-ecuador',
  //     enter(el) {
  //       $mapEcuador.flyTo({
  //         center: [ecuadorCoords.X2, ecuadorCoords.Y2],
  //         speed: 0.4,
  //       });
  //     },
  //     exit(el) {}
  //   })

  //   enterView({
  //     selector: '.country-button.Zimbabwe',
  //     enter(el) {
  //       d3.select('.explore.bottom')
  //         .classed('fade', false)
  //       //   el.style.backgroundImage('background-image', 'linear-gradient(to bottom, rgba(60,59,110,0), rgba(60,59,110, 0) 100%)')
  //     },
  //     exit(el) {
  //       d3.select('.explore.bottom')
  //         .classed('fade', true)
  //     }
  //   })

  enterView({
    selector: '.explore__viz',
    enter(el) {
      d3.select('.explore__expand-tab')
        .style('visibility', 'visible')
    },
    exit(el) {
      d3.select('.explore__expand-tab')
        .style('visibility', 'hidden')
    },
    offset: 0
  })

}

function setupExploreMapInteraction() {

  //   console.log('cool')
  // Add sidebar buttons 
  const $countryButtons = d3.select('nav.explore__nav-bar')
    .select('ul')
    .selectAll('li.country-button')
    .data(rawData)
    .join('li')

  $countryButtons.attr('class', d => {
      return `country-button ${d.birthplace}`
    })
    .text(d => d.birthplace.replace(/_/g, ' '))
    .on('mouseenter', d => {
      const thisCountry = d.birthplace;

      //   $mapExplore
      d3.select('div.explore__viz')
        .select(`.marker.${thisCountry}`).classed('showMarker', true)

      $mapExplore.setLayoutProperty('Birthplace names', 'visibility', 'none');
    })
    .on('mouseleave', d => {
      const thisCountry = d.birthplace;
      d3.select('div.explore__viz')
        .select(`.marker.${thisCountry}`).classed('showMarker', false)

      $mapExplore.setLayoutProperty('Birthplace names', 'visibility', 'visible');
    })
    .on('click', d => {
      const thisCountry = d.birthplace;
      d3.select('div.explore__viz')
        .select(`.marker.${thisCountry}`).classed('showMarker', true)
    })


  // Creating mapbox markers
  rawData.forEach(marker => {
    const el = document.createElement('div');
    el.className = `marker ${marker.birthplace}`;

    new mapboxgl.Marker(el)
      .setLngLat([+marker.X, +marker.Y])
      .addTo($mapExplore);
  });



  $mapExplore.on('load', () => {

    // $mapExplore.addSource('Birthplace names', {
    //   type: 'symbol',
    //   sourceLayer: "Birthplace names",
    //   //   url: 'mapbox://dock4242.4ivco4c2'
    // });
    // console.log($mapExplore.getStyle())




    // var features = $mapExplore.querySourceFeatures("updated_centroids-7qn63d");
    // console.log(features)

    // var features = $mapExplore.querySourceFeatures("updated_centroids-7qn63d", {
    //   sourceLayer: "Birthplace names"
    // });
    // console.log(features)





    const features = $mapExplore.querySourceFeatures('pumas', {
      sourceLayer: 'puma_polygons'
    });

    console.log(features)
  })


  //   places.features.forEach(function(feature) 






  //   console.log($mapExplore.queryRenderedFeatures({
  //     layers: ['ipums_puma_2010_2-18tyev']
  //   }))


  // ensuring scroll bars are visible in navigation section

  //   const scrollSection = document.getElementsByClassName('button-list');
  //   scrollSection.scrollTop = 1;
  //   scrollSection.scrollTop = 0;





}


function init() {
  setupDOM()

  Promise.all([
      //   d3.csv('assets/data/diaspora_w_reasons.csv'),
      // d3.csv('assets/data/updated_centroids.csv'),
      d3.csv('assets/data/coordinates - edited_final.csv'),
      d3.csv('assets/data/diaspora_data_culling - updatecoords.csv')
    ])
    .then(data => {
      tourCoordinates = data[1]
      rawData = data[0].map(datum => ({
        ...datum,
        pumaFormatted: (() => {
          const platonicPumaLength = 5
          const pumaLength = datum.PUMA.length
          const zerosToAdd = platonicPumaLength - pumaLength

          let pumaFormatted;
          if (zerosToAdd === 0) {
            return datum.PUMA
          }
          if (zerosToAdd === 1) {
            return '0'.concat(datum.PUMA)
          }
          if (zerosToAdd === 2) {
            return '00'.concat(datum.PUMA)
          }

        })()
      })).filter(datum => datum.non_specific != '1')
      //   return data[0]
      return rawData
    })
    .then(data => makeIntroMap(data))
    .then(data => makeUnexpectedMaps(data))
    .then(data => animateIntro(data))
    .then(data => nestData(data))
    // .then(() => $mapExplore = makeMaps.makeExploreMap('explore'))
    // .then(() => setupExploreMapInteraction())
    .then(() => setupEnterView())
}

export default {
  init,
  resize
};

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

let expandedNav = false;

// const height = window.innerHeight;

const introCoords = {
  'X1': -95.615632,
  'Y1': 30.094774
}

const tongaCoords = {
  'X2': -111.99184859446382,
  'Y2': 40.69852553447012,
  'X1': -175.196482,
  'Y1': -21.200206
};
const ecuadorCoords = {
  'X2': -73.86617173851454,
  'Y2': 40.74069877883909,
  'X1': -78.78488785454653,
  'Y1': -1.4859650869146321
};
const bulgariaCoords = {
  'X2': -87.9760049258716,
  'Y2': 42.038264174921,
  'X1': 25.120547279064226,
  'Y1': 42.957556303399286
};

const greeceCoords = {
  'X2': -82.76700345733673,
  'Y2': 27.972586791167004,
  'X1': 22.368843,
  'Y1': 38.969777
}

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
  $mapTour = makeMaps.makeTourMap('tour')

  $mapTour.on('click', () => {
    console.log($mapTour.getZoom())
  })


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





}

function titleCountryChange(name) {
  if (name.length > 7) {
    $countryHeaderLarge.style('font-size', '64px')
  } else if (name.length <= 7) {
    $countryHeaderLarge.style('font-size', '96px')
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


  const mapInterval = setInterval(function () {

    const newNameRaw = data[i].birthplace;

    $mapIntro.flyTo({
      center: [
        data[i].X,
        data[i].Y
      ]
    });



    $countryHeaderLarge.text(`${newNameRaw}`);
    $countryHeaderSmall.text(`${newNameRaw}`);
    titleCountryChange(newNameRaw)

    i++
    if (i === data.length) {
      i = 0
    }


  }, 4000);

  d3.select('#map-intro').on('click', () => {
    clearInterval(mapInterval)
  })

  return rawData;
}

function resize() {

}

function makeIntroMap(data) {
  $mapIntro = makeMaps.makeMapUnexpected(introCoords, 'intro', rawData)
  return data;
}

function makeUnexpectedMaps(data) {



  $mapTonga = makeMaps.makeMapUnexpected(tongaCoords, 'tonga', rawData)
  $mapEcuador = makeMaps.makeMapUnexpected(ecuadorCoords, 'ecuador', rawData)
  $mapBulgaria = makeMaps.makeMapUnexpected(bulgariaCoords, 'bulgaria', rawData)
  $mapGreece = makeMaps.makeMapUnexpected(greeceCoords, 'greece', rawData)

  makeMaps.makeRoute($mapTonga, tongaCoords, 0)
  makeMaps.makeRoute($mapBulgaria, bulgariaCoords, 0)
  makeMaps.makeRoute($mapEcuador, ecuadorCoords, 0)
  makeMaps.makeRoute($mapGreece, greeceCoords, 0)


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

  function flyToCoords(currentStep) {
    const destination = tourCoordinates.filter(item => item.name === currentStep)[0]
    $mapTour.flyTo({
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
  } else if (currentStep === 'nyc-manhattan-harlem') {
    flyToCoords(currentStep)
  } else if (currentStep === 'nyc-bronx') {
    flyToCoords(currentStep)
  } else if (currentStep === 'nyc-staten-island') {
    flyToCoords(currentStep)
  } else if (currentStep === 'la-1') {
    flyToCoords(currentStep)
  } else if (currentStep === 'la-2') {
    flyToCoords(currentStep)
  } else if (currentStep === 'la-3') {
    flyToCoords(currentStep)
  } else if (currentStep === 'minneapolis') {
    flyToCoords(currentStep)
  } else if (currentStep === 'slc') {
    flyToCoords(currentStep)
  }
}

function updateMapBack(el) {

  function flyBackToCoords(prevStep) {
    const destination = tourCoordinates.filter(item => item.name === prevStep)[0]
    $mapTour.flyTo({
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
  } else if (prevStep === 'nyc-manhattan-harlem') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'nyc-bronx') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'nyc-staten-island') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'la-1') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'la-2') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'la-3') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'minneapolis') {
    flyBackToCoords(prevStep)
  } else if (prevStep === 'slc') {
    flyBackToCoords(prevStep)
  }

}


function setupEnterView() {

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

  enterView({
    selector: '#map-tonga',
    enter(el) {
      $mapTonga.flyTo({
        center: [tongaCoords.X2, tongaCoords.Y2],
        speed: 0.4,
      });
    },
    exit(el) {}
  })


  enterView({
    selector: '#map-bulgaria',
    enter(el) {
      $mapBulgaria.flyTo({
        center: [bulgariaCoords.X2, bulgariaCoords.Y2],
        speed: 0.4,
      });
    },
    exit(el) {}
  })

  enterView({
    selector: '#map-greece',
    enter(el) {
      $mapGreece.flyTo({
        center: [greeceCoords.X2, greeceCoords.Y2],
        speed: 0.4,
      });
    },
    exit(el) {}
  })

  enterView({
    selector: '#map-ecuador',
    enter(el) {
      $mapEcuador.flyTo({
        center: [ecuadorCoords.X2, ecuadorCoords.Y2],
        speed: 0.4,
      });
    },
    exit(el) {}
  })

  enterView({
    selector: '.country-button.Zimbabwe',
    enter(el) {
      d3.select('.explore.bottom')
        .classed('fade', false)
      //   el.style.backgroundImage('background-image', 'linear-gradient(to bottom, rgba(60,59,110,0), rgba(60,59,110, 0) 100%)')
    },
    exit(el) {
      d3.select('.explore.bottom')
        .classed('fade', true)
    }
  })

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

  // Add sidebar buttons 
  d3.select('nav.explore__nav-bar')
    .select('ul')
    .selectAll('li.country-button')
    .data(rawData)
    .join('li')
    .attr('class', d => {
      return `country-button ${d.birthplace}`
    })
    .text(d => d.birthplace)
    .on('mouseenter', d => {
      const thisCountry = d.birthplace;
      d3.select('div.explore__viz')
        .select(`.marker.${thisCountry}`).classed('showMarker', true)
    })
    .on('mouseleave', d => {
      const thisCountry = d.birthplace;
      d3.select('div.explore__viz')
        .select(`.marker.${thisCountry}`).classed('showMarker', false)
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

  // ensuring scroll bars are visible in navigation section

  //   const scrollSection = document.getElementsByClassName('button-list');
  //   scrollSection.scrollTop = 1;
  //   scrollSection.scrollTop = 0;

}


function init() {
  setupDOM()

  Promise.all([
      d3.csv('assets/data/diaspora_w_reasons.csv'),
      d3.csv('assets/data/updatecoords.csv')
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
      }))
      //   return data[0]
      return rawData
    })
    .then(data => makeIntroMap(data))
    .then(data => makeUnexpectedMaps(data))
    .then(data => animateIntro(data))
    .then(data => nestData(data))
    .then(() => $mapExplore = makeMaps.makeExploreMap('explore'))
    .then(() => setupExploreMapInteraction())
    .then(() => setupEnterView())
}

export default {
  init,
  resize
};

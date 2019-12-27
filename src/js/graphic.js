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
let scrollMarker = true;
let i = 0;

// const height = window.innerHeight;

const introCoords = {
  'X1': -68.32792,
  'Y1': 46.20214
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
    window.scrollTo(0, 0);

  })

  //   document.addEventListener('click', function (e) {

  //     e = e || window.event;
  //     const target = e.target || e.srcElement,
  //       text = target.textContent || target.innerText;
  //     console.log(target)
  //   }, false);




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

  $mapIntro.on('load', () => {


    const newNameRaw = data[i].birthplace;
    $countryHeaderLarge.text(`${newNameRaw.replace(/_/g, ' ')}`);
    $countryHeaderSmall.text(`${newNameRaw.replace(/_/g, ' ')}`);

    $mapIntro.flyTo({
      center: [
        data[i].X,
        data[i].Y
      ],
      zoom: 11,
      speed: 1,
      curve: 0.6,
    }).on('moveend', function (e) {

      if (scrollMarker) {

        i === data.length ? i = 0 : i++
        console.log(data[i])

        const newNameRaw = data[i].birthplace;
        $countryHeaderLarge.text(`${newNameRaw.replace(/_/g, ' ')}`);
        $countryHeaderSmall.text(`${newNameRaw.replace(/_/g, ' ')}`);
        titleCountryChange(newNameRaw)
        $mapIntro.flyTo({
          center: [
            data[i].X,
            data[i].Y
          ],
          zoom: 11,
          speed: 1,
          curve: 0.6,
        })
      } else return

    });


  })


  return rawData;
}

function resize() {

}

function makeIntroMap(data) {
  $mapIntro = makeMaps.makeMapUnexpected(introCoords, 'intro', rawData)
  return data;
}


function updateMap(el) {
  //   console.log(el)

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
  //   console.log(el)

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


  window.onscroll = function () {
    myFunction()
  };

  function myFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      scrollMarker = false;
      d3.select('.intro__scroll-cue').classed('hidden', true)
      $mapIntro.on('load', e => {
        $mapIntro.flyTo({}).on('moveend', () => {})
      })
      $mapIntro.zoom = +$mapIntro.getZoom() - 0.1
    } else {
      d3.select('.intro__scroll-cue').classed('hidden', false)
    }
  }

  d3.select('.tour-step:nth-child(2)').classed('ux__fade-intro-txt', true)



  enterView({
    selector: '.ux__fade-intro-txt',
    enter(el) {},
    exit(el) {
      console.log('exited')
    },
    progress(el, progress) {
      //   console.log(progress)
      d3.select('.intro__cover-text').style('opacity', `${1-progress*2}`)
      $mapIntro
        .on('moveend', () => {})
        .flyTo({
          pitch: `${60-(progress*60)}`
        })

      //   if (progress === 0) {
      //     // scrollMarker = true
      //   }
    },
    offset: 0, // enter at middle of viewport
    once: false, // trigger just once
  });



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
      //   console.log(el)
    },
    exit(el) {
      //   console.log(el)
    }
  })


}

function setupExploreMapInteraction() {

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
    // .then(data => makeUnexpectedMaps(data))
    .then(data => animateIntro(data))
    // .then(data => nestData(data))
    // .then(() => $mapExplore = makeMaps.makeExploreMap('explore'))
    // .then(() => setupExploreMapInteraction())
    .then(() => setupEnterView())
}

export default {
  init,
  resize
};

/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
/* global d3 */
import enterView from 'enter-view';
// import turf from '@turf/turf'
// import turfHelpers from '@turf/helpers'
import makeMaps from './makeMaps';
import isMobile from './utils/is-mobile';


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
let expandedNav = true;
let scrollMarker = false;
let lastCountry;
let flying;
let currentTime;
let i = 0;
let thisCountry;

const DURATION = 7000

// const height = window.innerHeight;

const introCoords = {
  'X1': -68.32792,
  'Y1': 46.20214
}


function nestData(dataArg) {
  //   console.log(dataArg)

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

  //   d3.select('.mapboxgl-canvas').on('click')


  d3.select('.explore__expand-tab').on('click', () => {

    if (expandedNav === false) {

      d3.select('nav.explore').style('transform', 'translateX(0)')
      d3.select('.triangle-left').classed('collapsed', true)

      d3.select('.method').classed('outta-sight-info', true)
      d3.select('.method').classed('in-sight-info', false)

      d3.select('.intro__blurb').classed('outta-sight-intro', true)
      d3.select('.intro__blurb').classed('in-sight-intro', false)

      d3.select('.misc-info').classed('outta-sight-info', false)
      d3.select('.misc-info').classed('in-sight-info', true)

      expandedNav = true
    } else if (expandedNav === true) {
      d3.select('nav.explore').style('transform', 'translateX(-95%)')
      d3.select('.triangle-left').classed('collapsed', false)
      expandedNav = false
    }


  })



  // d3.select('.misc-info__mob-country-expander').on('click', () => {
  //   if (expandedNav === false) {
  //     d3.select('nav.explore').style('transform', 'translateX(0)')
  //     expandedNav = true
  //     d3.select('.misc-info__mob-country-expander').html("Hide countries <div id='triangle-left'></div>")
  //   } else if (expandedNav === true) {
  //     d3.select('nav.explore').style('transform', 'translateX(-95%)')
  //     d3.select('.misc-info__mob-country-expander').html("Select a country <div id='triangle'></div>")
  //     expandedNav = false
  //   }
  // })


  //   d3.select('.intro__cover-text').on('click', () => {
  //     d3.select('.intro__cover-text').classed('slide-out-left', true)
  //     d3.select('.masthead').classed('slide-out-right', true)
  //     d3.select('html').classed('no-scroll', false)

  //   })

  //   d3.select('.tour-step').on('click', () => {
  //     d3.select('.intro__cover-text').classed('slide-out-left', true)
  //     d3.select('.masthead').classed('slide-out-right', true)
  //     d3.select('html').classed('no-scroll', false)
  //     window.scrollTo(0, 0);

  //   })


  // d3.selectAll('.blurb').on('click', () => {

    d3.select('.intro__blurb').classed('in-sight-intro', false)
    d3.select('.intro__blurb').classed('outta-sight-intro', true)
    d3.select('.triangle-left').classed('collapsed', true)
    d3.select('.misc-info').classed('outta-sight-info', false)
    d3.select('.misc-info').classed('in-sight-info', true)

  // })


  d3.select('.misc-info__info').on('click', () => {

    d3.select('.misc-info').classed('in-sight-info', false)
    d3.select('.misc-info').classed('outta-sight-info', true)


    d3.select('.intro__blurb').classed('in-sight-intro', true)
    d3.select('.intro__blurb').classed('outta-sight-intro', false)

    // d3.select('.intro__blurb').style('top', '50%')
  })


  d3.select('.misc-info__method').on('click', () => {

    d3.select('.misc-info').classed('in-sight-info', false)
    d3.select('.misc-info').classed('outta-sight-info', true)

    d3.select('.method').classed('in-sight-intro', true)
    d3.select('.method').classed('outta-sight-intro', false)


    // d3.select('.intro__blurb').style('top', '50%')
  })



  d3.select('.method').on('click', () => {

    d3.select('.misc-info').classed('in-sight-info', true)
    d3.select('.misc-info').classed('outta-sight-info', false)

    d3.select('.method').classed('in-sight-intro', false)
    d3.select('.method').classed('outta-sight-intro', true)


    // d3.select('.intro__blurb').style('top', '50%')
  })



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

  //   data = rawData.sort(() => Math.random() - 0.5)



  //   $mapIntro.on('load', () => {


  //     const topTimer = d3.timer(topTimeTaken => {

  //       const newNameRaw = data[i].birthplace;
  //       $countryHeaderLarge.text(`${newNameRaw.replace(/_/g, ' ')}`);
  //       $countryHeaderSmall.text(`${newNameRaw.replace(/_/g, ' ')}`);

  //       const zoomLevel = data[i].Name.includes('NYC') ? 13 : 9;

  //       const t = d3.timer(elapsed => {
  //         currentTime = elapsed;

  //         d3.select('.progress-bar')
  //           .style('width', () => {
  //             console.log(currentTime)
  //             return `${currentTime/DURATION * 100}%`
  //           })
  //         console.log(elapsed)
  //         if (elapsed > DURATION || scrollMarker) t.stop();
  //       }, 10);


  //       $mapIntro.flyTo({
  //         center: [
  //           data[i].X,
  //           data[i].Y
  //         ],
  //         zoom: zoomLevel,
  //         speed: 1,
  //         curve: 0.6,
  //       })

  //       if (topTimeTaken > DURATION || scrollMarker) topTimer.stop();
  //       i++
  //       if (i === data.length - 1) {
  //         i = 0
  //       }
  //     }, 6000)






  //     // mapInterval = setInterval(() => {

  //     //   i++
  //     //   if (i === data.length - 1) {
  //     //     i = 0
  //     //   }

  //     //   const t = d3.timer(elapsed => {
  //     //     currentTime = elapsed;

  //     //     d3.select('.progress-bar')
  //     //       .style('width', () => {
  //     //         console.log(currentTime)
  //     //         return `${currentTime/DURATION * 100}%`
  //     //       })
  //     //     console.log(elapsed)
  //     //     if (elapsed > DURATION || scrollMarker) t.stop();
  //     //   }, 10);

  //     //   const newNameRaw = data[i].birthplace;
  //     //   $countryHeaderLarge.text(`${newNameRaw.replace(/_/g, ' ')}`);
  //     //   $countryHeaderSmall.text(`${newNameRaw.replace(/_/g, ' ')}`);

  //     //   const zoomLevel = data[i].Name.includes('NYC') ? 13 : 9;


  //     //   $mapIntro.flyTo({
  //     //     center: [
  //     //       data[i].X,
  //     //       data[i].Y
  //     //     ],
  //     //     zoom: zoomLevel,
  //     //     speed: 1,
  //     //     curve: 0.6,
  //     //   })
  //     // }, DURATION)



  //   })


  return rawData;
}

function resize() {

}

function makeIntroMap(data) {
  $mapIntro = makeMaps.makeMapUnexpected(introCoords, 'intro', rawData)
  return data;
}

function pitchMap(el, progress) {

  const currentStep = el.getAttribute('data-step')

  if (currentStep === 'pitch-up') {



    d3.select('.intro__cover-text').style('opacity', `${1-progress*2}`)
    $mapIntro
      .on('moveend', () => {})
      .flyTo({
        pitch: `${60-(progress*60)}`,
        //   speed: 2,
        easing: () => {
          return 1
        }
      })
  }
}




function updateMap(el) {
  //   console.log(el)

  function changeVisuals(currentStep) {

    const destination = tourCoordinates.filter(item => item.name === currentStep)[0]

    $mapIntro.flyTo({
      center: [+destination.lon, +destination.lat],
      speed: 1,
      zoom: +destination.zoom
    })
  }

  const currentStep = el.getAttribute('data-step')
  if (currentStep === 'usa') {
    changeVisuals(currentStep)
  } else if (currentStep === 'nyc') {
    changeVisuals(currentStep)
  } else if (currentStep === 'nyc-brooklyn') {
    changeVisuals(currentStep)
  } else if (currentStep === 'nyc-queens') {
    changeVisuals(currentStep)
  } else if (currentStep === 'nyc-manhattan-bronx') {
    changeVisuals(currentStep)
  } else if (currentStep === 'la-1') {
    changeVisuals(currentStep)
  } else if (currentStep === 'fl-1') {
    changeVisuals(currentStep)
  } else if (currentStep === 'hou-1') {
    changeVisuals(currentStep)
  } else if (currentStep === 'minneapolis') {
    changeVisuals(currentStep)
  }
}

function updateMapBack(el) {
  //   console.log(el)
  //   const newNameRaw = data[i].birthplace;
  //   $countryHeaderLarge.text(`${newNameRaw.replace(/_/g, ' ')}`);
  //   $countryHeaderSmall.text(`${newNameRaw.replace(/_/g, ' ')}`);

  //   const zoomLevel = data[i].Name.includes('NYC') ? 13 : 9;
  const zoomLevel = 9

  function flyBackToCoords(prevStep) {
    const destination = tourCoordinates.filter(item => item.name === prevStep)[0]
    $mapIntro.flyTo({
      center: [+destination.lon, +destination.lat],
      speed: 1,
      zoom: +destination.zoom
    })
  }
  const prevStep = el.getAttribute('data-previous-step')


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

  function stopTour() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      clearInterval(mapInterval)
      //   console.log('cleared')
      scrollMarker = true;
      d3.select('.intro__scroll-cue').classed('hidden', true)
      $mapIntro.on('load', e => {
        $mapIntro.zoom = +$mapIntro.getZoom() - 0.1
        // console.log('stopping fly')
      })

    } else {
      d3.select('.intro__scroll-cue').classed('hidden', false)
    }
  }

  window.onscroll = function () {
    stopTour()
  };



  d3.select('.tour-step:nth-child(2)').classed('ux__fade-intro-txt', true)



  enterView({
    selector: '.tour-step',
    enter(el) {
      updateMap(el)
    },
    exit(el) {
      updateMapBack(el)
    },
    progress(el, progress) {
      pitchMap(el, progress)
      //   el.style.opacity = progress;
    },
    offset: 0, // enter at middle of viewport
    once: false, // trigger just once
  });

}

function setupExploreMapInteraction() {

  //   if(isMobile.any()){}

  // Add sidebar buttons

  let selectDropdown = d3.select('.misc-info__mob-country-expander')
  selectDropdown.selectAll("option")
    .data(rawData)
    .enter()
    .append("option")
    .text(d => d.birthplace.replace(/_/g, ' '))
    ;

  selectDropdown.insert("option").text("Find a Country").attr("selected","selected").lower();

  selectDropdown.on("change",function(){
    var newValue = selectDropdown.node().value
    for (var item in rawData){
      if(rawData[item].birthplace.replace(/_/g, ' ') == newValue){
        $mapIntro.flyTo({
          center: [+rawData[item].X, +rawData[item].Y],
          speed: 1,
          zoom: 9
        })
        d3.select('div.intro__cover-viz')
          .selectAll(`.marker`).classed('showMarker', false)
      }
    }
  })



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
      thisCountry = d.birthplace;
      //   console.log(thisCountry)

      //   console.log($mapIntro.queryRenderedFeatures().filter(item => item.sourceLayer === 'only_pumas_w_diasporas-4hi77s'))

      const visibleFeatures = $mapIntro.queryRenderedFeatures().filter(item => item.sourceLayer === 'only_pumas_w_diasporas-4hi77s')

      //   console.log(visibleFeatures)

      const thisCountryFeatures = visibleFeatures.filter(item => item.properties.birthplace.replace(/ /g, '_').includes(thisCountry))

      //   console.log(thisCountry)
      //   console.log(thisCountryFeatures)
      const popup = new mapboxgl.Popup({
        closeButton: false
      });

      thisCountryFeatures.forEach(feature => {
        // const prop = feature.properties;
        // const item = document.createElement('a');
        // // item.href = prop.wikipedia;
        // // item.target = '_blank';
        // item.textContent = prop.Name +
        // item.addEventListener('mouseover', function() {
        // // Highlight corresponding feature on the map
        popup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            `<div class='tooltip__diaspora-name ${feature.properties.birthplace}'>${feature.properties.birthplace}</div>
            <div class='tooltip__puma-name'>${feature.properties.Name.replace(/PUMA/g,'')}</div>`
          )
          .addTo($mapIntro);

      })



      //   d3.select('div.intro__cover-viz')
      //     .select(`.marker.${thisCountry}`).classed('showMarker', true)

    })
    .on('mouseleave', d => {
      d3.selectAll('.mapboxgl-popup').remove()
      //   const thisCountry = d.birthplace;
      //   d3.select('div.intro__cover-viz')
      //     .select(`.marker.${thisCountry}`).classed('showMarker', false)

      //   $mapExplore.setLayoutProperty('Birthplace names', 'visibility', 'visible');
    })
    .on('click', d => {

      $mapIntro.flyTo({
        center: [+d.X, +d.Y],
        speed: 1,
        zoom: 9
      })
      d3.select('div.intro__cover-viz')
        .selectAll(`.marker`).classed('showMarker', false)
    })


  // Creating mapbox markers
  rawData.forEach(marker => {

    const el = document.createElement('div');
    el.className = `marker ${marker.birthplace}`;

    d3.select(el)
      .append('div')
      .attr('class', `tooltip__diaspora-name ${marker.birthplace}`)
      .text(`${marker.birthplace.replace(/_/g, ' ')}`)

    d3.select(el)
      .append('div')
      .attr('class', `tooltip__puma-name ${marker.Name}`)
      .text(`${marker.Name.replace(/PUMA/g, '')}`)

    d3.select(el)
      .append('div')
      .attr('class', `tooltip__triangle ${marker.Name}`)


    // const elDiaspora = document.createElement('div');
    // elDiaspora.className = `tooltip__diaspora-name ${marker.birthplace}`
    // elDiaspora.innerHTML(`${marker.birthplace}`)

    // const elPUMA = document.createElement('div');
    // elPUMA.className = `tooltip__puma-name ${marker.birthplace}`
    // elPUMA.innerHTML(`${marker.Name.replace(/PUMA/g, '')}`)

    // el.appendChild(elDiaspora)
    // el.appendChild(elPUMA)



    new mapboxgl.Marker(el)
      .setLngLat([+marker.X, +marker.Y])
      .addTo($mapIntro);


  });


  //   const tooltipBump = d3.select('.marker.Brazil').node().offsetHeight / 2 - 20 //include height of triangle at bottom


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
    .then(() => setupExploreMapInteraction())
  // .then(() => setupEnterView())
}

export default {
  init,
  resize
};

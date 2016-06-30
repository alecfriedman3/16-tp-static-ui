var markers = {};
var numDays;
var dayItinerary;
var currentDay;
var boundary;


function addDay() {
  numDays++
  $('<button class="btn btn-circle day-btn">' + numDays
    + '</button>').insertBefore('#day-add');
  dayItinerary.push(dayItinerary[0].clone(true))
}

function removeDay() {
  if(numDays === 1){
    dayItinerary[1] = dayItinerary[0].clone(true);
  } else {
    numDays--;
    dayItinerary.splice(currentDay, 1)
    $('#day-add').prev().remove();
  }
  let newDay = Math.min(currentDay, numDays);
  changeDay.call($('#day-buttons').find('button')[newDay - 1], false)
}











function setDay(day) {
  $.ajax({
    method: 'GET',
    url: '/api/days/' + day
    })
    .then(function(retVal) {
      displayDay(retVal);
      // menu panes

    })
}

function displayDay(blob) {
  addChoice($('#my-hotels'), blob.hotel.id, 'hotel', blob.hotel.name);
  //function addChoice($('#my-hotels'), id, type, name)
  blob.restaurants.forEach (function(restaurant) {
    addChoice($('#my-restaurants'), restaurant.id, 'restaurant', restaurant.name);
  })
    blob.activities.forEach (function(activity) {
    addChoice($('#my-activities'), activity.id, 'activity', activity.name);
  })
}

function addChoice($elem, id, type, name) {
 $elem.append("<div class='itinerary-item'><span class='title' data-id=" + 
      id + " data-type=" + type +">" + name +
      "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button></div>");
 let thing = stuffSearch(type, id);
  addMapTag(thing, type);
  currentMap.fitBounds(boundary);
}

function addMapTag(thing, locType) {
  var mapMarker = drawMarker(locType, thing.place.location, thing.name);
  markers[locType + '/'+ thing.id] = mapMarker;
  boundary.extend(mapMarker.position);
}







function changeDay(event) {
  if(this.id === "day-add") return;
  // Save the choice dom element in the array (index by current day)
  // Clear all map markers
  // Restore the dom element for the day
  // dayItinerary is 1 based, not zero based, in correspondence with the current day
  $(this).parent().find('.current-day').removeClass('current-day');
  $(this).addClass('current-day');
  //If changeDay is called from removeDay, do not change the data
  if (event) dayItinerary[currentDay] = ($('#itinerary').clone(true))
  currentDay = +$(this).text();
  $('#day-text').text('Day ' + currentDay)

  // Hardcoded map clearing
  for (let key in markers){
    removeMapTag(key)
  }
  markers = {};
  boundary = new google.maps.LatLngBounds();

  $('#itinerary').replaceWith(dayItinerary[currentDay]);
  setMarkersFromItinerary();
}

function setMarkersFromItinerary(){
  let $locations = $('#itinerary').find('.title')
  for (let i = 0; i < $locations.length; i++) {
    let locID = $locations[i].dataset.id;
    let locType = $locations[i].dataset.type;
    let thing = stuffSearch(locType, locID);
    addMapTag(thing, locType)
  }
  currentMap.fitBounds(boundary);
}

function addMapTag(thing, locType) {
  var mapMarker = drawMarker(locType, thing.place.location, thing.name);
  markers[locType + '/'+ thing.id] = mapMarker;
  boundary.extend(mapMarker.position);
}

function removeMapTag(id, eventType) {
  var key = (arguments.length > 1) ? eventType + '/' + id : id
  markers[key].setMap(null);
}

function remover () {
  let $sibling = $(this).prev()
  let eventType = $sibling.data('type')
  let id = $sibling.data('id');
  $(this).parent().remove()
  removeMapTag(id, eventType);
}



function adder (event) {
  let $sibling = $(this).prev()
  let eventType = $sibling.data('type')
  let name = $sibling[0].selectedOptions[0].text;
  let id = $sibling[0].selectedOptions[0].dataset.id;

  switch (eventType) {
    case 'hotel':
      let toBeDeleted = $('#my-hotels').find('.title').data('id')
      if(toBeDeleted) {
        removeMapTag(toBeDeleted, 'hotel')
        $('#my-hotels').empty();
      }
      addChoice($('#my-hotels'), id, eventType, name);
      break;
    case 'restaurant':
      addChoice($('#my-restaurants'), id, eventType, name);
     break;
    case 'activity':
      addChoice($('#my-activities'), id, eventType, name);
     break;
  }

}


function stuffSearch(type, id){
  return stuff[type].find(function(object) {
      return object.id === +id;
  })
}

var markers = {};
var numDays;
var currentDay;
var boundary;


function addDay(event) {
  numDays++
  addDayButton(numDays)
  $.ajax({
    method: 'POST',
    url: '/api/days/count',
    data: {day: numDays}
  })
}

function addDayButton (num){
  $('<button class="btn btn-circle day-btn">' + num
    + '</button>').insertBefore('#day-add');
}


function removeDay(event) {
  if(numDays !== 1){
    numDays--;
    $('#day-add').prev().remove();
    $.ajax({
      method:"DELETE",
      url: 'api/days/count',
      data: {day: currentDay}
    })
    .then (function (){
      let newDay = Math.min(currentDay, numDays);
      changeDay.call($('#day-buttons').find('button')[newDay - 1])
    })
  }

}




function setDay(day) {
  // currentMap.fitBounds([40.705086, -74.009151])
  // currentMap.setZoom(13)
  currentDay = day;
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
  if(blob.hotel) addChoice($('#my-hotels'), blob.hotel.id, 'hotel', blob.hotel.name);
  //function addChoice($('#my-hotels'), id, type, name)
  blob.restaurants.forEach (function(restaurant) {
    addChoice($('#my-restaurants'), restaurant.id, 'restaurant', restaurant.name);
  })
    blob.activities.forEach (function(activity) {
    addChoice($('#my-activities'), activity.id, 'activity', activity.name);
  })
}

function addChoice($elem, id, type, name) {
  // Is there already one of those?
  let found = $elem.find("[data-id='" + id + "']");
  if (found.length > 0) {
    alert("You already have " + name + " on your schedule for this day.");
    return;
  }

  $elem.append("<div class='itinerary-item'><span class='title' data-id=" +
      id + " data-type=" + type +">" + name +
      "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button></div>");
  let thing = stuffSearch(type, id);
  addMapTag(thing, type);
  currentMap.fitBounds(boundary);
  $.ajax({
    method: 'POST',
    url: '/api/days/' + currentDay + '/' + type,
    data: {day: currentDay, id: id}
  })
}

function addMapTag(thing, locType) {
  var mapMarker = drawMarker(locType, thing.place.location, thing.name);
  markers[locType + '/'+ thing.id] = mapMarker;
  boundary.extend(mapMarker.position);
}

function remover (event) {//event handler from dom button
  let $sibling = $(this).prev()
  let eventType = $sibling.data('type')
  let id = $sibling.data('id');
  $(this).parent().remove()
  removeMapTag(id, eventType);
  $.ajax({
    method: 'DELETE',
    url: '/api/days/' + currentDay + '/' + eventType,
    data: {day: currentDay, id: id}
  })
}

function adder (event) {//event handler from dom boutton
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


function changeDay(event) {
  if(this.id === "day-add") return;
  // Save the choice dom element in the array (index by current day)
  // Clear all map markers
  // Restore the dom element for the day
  // dayItinerary is 1 based, not zero based, in correspondence with the current day
  $(this).parent().find('.current-day').removeClass('current-day');
  $(this).addClass('current-day');

  $('#my-hotels').empty();
  $('#my-restaurants').empty();
  $('#my-activities').empty();

  currentDay = +$(this).text();
  setDay(currentDay);

  $('#day-text').text('Day ' + currentDay)
  for (let key in markers){
    removeMapTag(key)
  }
  markers = {};

  setMarkersFromItinerary();
}

function setMarkersFromItinerary(){
  let $locations = $('#itinerary').find('.title')
  if($locations.length) boundary = new google.maps.LatLngBounds();
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




function stuffSearch(type, id){
  return stuff[type].find(function(object) {
      return object.id === +id;
  })
}

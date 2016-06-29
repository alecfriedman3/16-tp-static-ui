var markers = {};
var numDays;
var dayItinerary;
var currentDay;


function addDay() {
  numDays++
  $('<button class="btn btn-circle day-btn">' + numDays
    + '</button>').insertBefore('#day-add');
  dayItinerary.push(dayItinerary[0].clone())
}

function removeDay() {
  numDays--;
}

function changeDay() {
  if(this.id === "day-add") return;

  // Save the choice dom element in the array (index by current day)
  // Clear all map markers
  // Restore the dom element for the day
  // dayItinerary is 1 based, not zero based, in correspondence with the current day
  $(this).parent().find('.current-day').removeClass('current-day');
  $(this).addClass('current-day');

  dayItinerary[currentDay] = ($('#itinerary').clone())
  currentDay = +$(this).text();
  $('#day-text').text('Day ' + currentDay)

  for (let key in markers){
    removeMapTag(key)
  }
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
}

function addMapTag(thing, locType) {
  var mapMarker = drawMarker(locType, thing.place.location, thing.name);
  markers[locType + '/'+ thing.id] = mapMarker;
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

function addChoice($elem, id, type) {
  let thing = stuffSearch(type, id)
 $elem.append("<div class='itinerary-item'><span class='title' data-id=" + id + " data-type=" + type +">" + thing.name +
      "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button></div>");
  addMapTag(thing, type);
}



function adder (event) {
  let $sibling = $(this).prev()
  let eventType = $sibling.data('type')
  let id = $sibling[0].selectedOptions[0].dataset.id;
  switch (eventType) {
    case 'hotel':
      let toBeDeleted = $('#my-hotels').find('.title').data('id')
      if(toBeDeleted) {
        removeMapTag(toBeDeleted, 'hotel')
        $('#my-hotels').empty();
      }
      addChoice($('#my-hotels'), id, eventType);
      break;
    case 'restaurant':
      addChoice($('#my-restaurants'), id, eventType);
     break;
    case 'activity':
      addChoice($('#my-activities'), id, eventType);
     break;
  }

}


function stuffSearch(type, id){
  return stuff[type].find(function(object) {
      return object.id === +id;
  })
}

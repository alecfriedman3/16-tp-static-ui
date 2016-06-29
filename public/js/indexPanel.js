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
  let $locations = $('#itinerary').find()
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

function addChoice($elem, id, objects, type) {
  let thing = objects.find(function(object) {
      return object.id === +id;
  })
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
      $('#my-hotels').empty();
      addChoice($('#my-hotels'), id, hotels, eventType);
      break;
    case 'restaurant':
      addChoice($('#my-restaurants'), id, restaurants, eventType);
     break;
    case 'activity':
      addChoice($('#my-activities'), id, activities, eventType);
     break;
  }

}

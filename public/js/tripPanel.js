var markers = {};

function populatePanel(){
  // If I'm not in the index panel, don't do anything.
  if ($('#control-panel').length){
    let $hotelList = $('#hotel-choices')
    hotels.forEach(function(hotel){
      $hotelList.append('<option data-id=' + hotel.id +'>' + hotel.name + '</option>')
    })
    let $restaurantList = $('#restaurant-choices')
    restaurants.forEach(function(restaurant){
      $restaurantList.append('<option data-id="' + restaurant.id +'">' + restaurant.name + '</option>')
    })
    let $activities = $('#activity-choices')
    activities.forEach(function(activity){
      $activities.append('<option data-id="' + activity.id +'">' + activity.name + '</option>')
    })
  }
}

function onClicks () {
  $('#options-panel').on('click' , "button", adder)
  $('#itinerary').on('click' , "button", remover)
}

function addMapTag(thing, locType) {
  var mapMarker = drawMarker(locType, thing.place.location, thing.name);
  markers[locType + '/'+ thing.id] = mapMarker;
}

function removeMapTag(id, eventType) {
  markers[eventType + '/' + id].setMap(null);
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


$(document).ready(function (){
  populatePanel();
  onClicks();
})

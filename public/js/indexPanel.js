var markers = {};
var numDays;



function addDay() {
  numDays++
  $('<button class="btn btn-circle day-btn">' + numDays 
    + '</button>').insertBefore('#day-add');
}

function removeDay() {
  numDays--;
}

function changeDay() {
  if(this.id !== "day-add") {
    $(this).parent().find('.current-day').removeClass('current-day');
    $(this).addClass('current-day');
  }
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

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
}

function addMapTag(name, locType) {

}

function addChoice($elem, name, id, objects, type) {
   $elem.append("<div class='itinerary-item'><span class='title'>" + name + 
      "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button></div>");
  addMapTag(name, type);
}



function adder (event) {
  let $sibling = $(this).prev()
  let id = $sibling[0].selectedOptions[0].dataset.id;
  let name = $sibling[0].selectedOptions[0].text;
  switch ($sibling.data('type')) {
    case 'hotel':
      $('#my-hotels').empty();
      addChoice($('#my-hotels'), name, id, hotels, $sibling.data('type'));
      break;
    case 'restaurant':
      addChoice($('#my-restaurants'), name, id, restaurants, $sibling.data('type'));
     break;
    case 'activity':
      addChoice($('#my-activities'), name, id, activities, $sibling.data('type'));
     break;
  }
 
}


$(document).ready(function (){
  populatePanel();
  onClicks();
})

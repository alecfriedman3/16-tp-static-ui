function populatePanel(){
  if ($('#control-panel').length){
    var $hotelList = $('#hotel-choices')
    hotels.forEach(function(hotel){
      $hotelList.append('<option data-id=' + hotel.id +'>' + hotel.name + '</option>')
    })
    var $restaurantList = $('#restaurant-choices')
    restaurants.forEach(function(restaurant){
      $restaurantList.append('<option data-id="' + restaurant.id +'">' + restaurant.name + '</option>')
    })
    var $activities = $('#activity-choices')
    activities.forEach(function(activity){
      $activities.append('<option data-id="' + activity.id +'">' + activity.name + '</option>')
    })
  }
}

function onClicks () {
  $('#options-panel').on('click' , "button", adder)
}

function adder (event) {
  var $sibling = $(this).prev()
  var $option = $sibling[0].selectedOptions[0]
  console.log('option', $sibling[0].selectedOptions[0].text)
  switch ($sibling.data('type')) {
    case 'hotel':
      console.log('that\' a hotel')
      break;
    case 'restaurant':
      console.log('that\' a restaurant')
      break;
    case 'activity':
      console.log('that\' an activity')
      break;
  }
}


$(document).ready(function (){
  populatePanel();
  onClicks();
})

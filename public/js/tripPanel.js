function populatePanel(){
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

function adder (event) {
  let $sibling = $(this).prev()
  let $option = $sibling[0].selectedOptions[0]
  // let id = $sibling[0].selectedOptions[0].data('id');
  let name = $sibling[0].selectedOptions[0].text;
  let $list;
  switch ($sibling.data('type')) {
    case 'hotel':
      console.log('that\'s the hotel', name )
      $list = $('#my-hotels');
      $list.empty();
      break;
    case 'restaurant':
      console.log('that\'s the restaurant', name)
      $list = $('#my-restaurants');
      break;
    case 'activity':
      console.log('that\'s the activity', name)
      $list = $('#my-activities');
     break;
  }
  $list.append(" \
      <div class='itinerary-item'>\
        <span class='title'>" + name + "</span>\
        <button class='btn btn-xs btn-danger remove btn-circle'>x</button>\
      </div>")
}


$(document).ready(function (){
  populatePanel();
  onClicks();
})

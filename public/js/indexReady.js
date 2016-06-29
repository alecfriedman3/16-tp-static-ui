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
  $('#day-add').on('click', addDay)
  $('#remove-day').on('click', removeDay)
  $('#day-buttons').on('click', 'button', changeDay)
}


$(document).ready(function (){
  dayItinerary = [];
  currentDay = 1;
  populatePanel();
  onClicks();
  dayItinerary.push($('#itinerary').clone(true), null)
  numDays = 1;
})

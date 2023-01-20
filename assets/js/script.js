// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $('.saveBtn').on('click', savePlanner);

  function savePlanner() {
    var time = $(this).parent().attr('id').split('-')[1];
    var plan = $(this).siblings('.description').val().trim();
    localStorage.setItem(time, plan);
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  $('.time-block').each(function() {
    var presentHour = dayjs().format("HH");
    var time = $(this).attr('id').split('-')[1];

    if (time < presentHour) {
      $(this).addClass('past');
      $(this).removeClass('present future');
    } else if (presentHour === time) {
      $(this).addClass('present');
      $(this).removeClass('past future');
    } else {
      $(this).addClass('future');
      $(this).removeClass('past present');
    }
  }); 

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
    
    for (var i = 9; i < 17; i++) {
      var dailyPlan = localStorage.getItem(i);
      $('#hour-'+i).children('.description').val(dailyPlan);
    }

    // TODO: Add code to display the current date in the header of the page.
    var today = dayjs();
    $('#currentDay').text(today.format('dddd, MMM D, YYYY'));

  // ------------------ EXTRAS -----------------

  var currentTime = dayjs().format("HH:mm:ss a");
  $('#currentTime').text(currentTime);

  $(function() {
    if (dayjs().hour() >= 9 && dayjs.hour() <= 17) {
      var presentHour = dayjs().format("HH");
    }
    $('#progressbar').progressbar({
      value: presentHour/17 * 100,
    });
  });

});


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
    var presentHourString = dayjs().format("HH");
    var timeString = $(this).attr('id').split('-')[1];

    var time = parseInt(timeString);
    var presentHour = parseInt(presentHourString);
 
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
    
    for (var i = 9; i <= 17; i++) {
      var dailyPlan = localStorage.getItem(i);
      $('#hour-'+i).children('.description').val(dailyPlan);
    }

    // TODO: Add code to display the current date in the header of the page.
    var today = dayjs();
    $('#currentDay').text(today.format('dddd, MMM D, YYYY'));

  // ------------------ EXTRAS -----------------

  // Show current time of day
  var currentTime = dayjs().format("HH:mm:ss a");
  $('#currentTime').text(currentTime);

  // function to create and style the progress bar about the work flow
  $(function() {
    // get the hour of day and change it to integer type
    var hour = parseInt(dayjs().hour());

    // set up of empty strings for later usage
    var presentHourString = "";
    var fromTimeString = "";
    var toTimeString = "";

    var workTimeDifference = 0;
    var presentHour = 0;
    var progressCompleted = 0;

    // Using a condition to compute the time difference between end hour and current hour during the work hours
    if (hour >= 9 && hour <= 17) {

      presentHourString = dayjs().format("HH");
      presentHour = parseInt(presentHourString);

      var fromTimeString = dayjs().hour(9);
      var toTimeString = dayjs().hour(17);

      var workTimeDifferenceString = toTimeString.diff(fromTimeString, "hours");
      var workTimeDifference = parseInt(workTimeDifferenceString);
    }

    // Added labels to show the percentage of work hours have gone and extra comments
    var progressCompleted = (presentHour - workTimeDifference - 1)/workTimeDifference * 100;
    $('.progress-bar').css('width', progressCompleted + '%');
    if (progressCompleted <= 25) {
      $('.progress-bar').text(progressCompleted + '% Completed Only 😭!');
    } else if (progressCompleted <= 50) {
      $('.progress-bar').text(progressCompleted + '% Almost time for lunch break 🤤!');
    } else if (progressCompleted <= 75) {
      $('.progress-bar').text(progressCompleted + '% Almost finshed work 🙂!');
    } else {
      $('.progress-bar').text(progressCompleted + '% Argh, now I have to go through rush hour 😭!');
    }
  });

});


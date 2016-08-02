$(document).ready(init);

function init() {
    
    var dialog = $("#dialog-form").dialog({
        show:{effect:"blind", duration:500},
	      hide:{effect:"explode", duration:500},
        autoOpen: false,
        height: 350,
        width: 350,
        modal: true,
        buttons: {
            "Create Event": addEvent,
            Cancel: function() {
                $(this).dialog("close");
            }
        },
        close: function() {
            form[0].reset();
            allFields.removeClass("ui-state-error" );
        }
    });
 
    var form = dialog.find("form").on("submit", function(event) {
      event.preventDefault();
      addEvent();
    }); form,
 
    show = $("#show"),
    description = $("#description"),
    allFields = $([]).add(show).add(description),
    tips = $(".validateTips");
 
    function updateTips(t) {
      tips
        .text( t )
        .addClass("ui-state-highlight");
      setTimeout(function() {
        tips.removeClass("ui-state-highlight", 1500);
      }, 500);
    }
 
    function checkLength( o, n, min, max ) {
      if (o.val().length > max || o.val().length < min) {
        o.addClass("ui-state-error" );
        updateTips("Length of " + n + " must be between " +
          min + " and " + max + ".");
        return false;
      } else {
        return true;
      }
    } 

    function addEvent() {
      var valid = true;
      allFields.removeClass("ui-state-error" );
      valid = valid && checkLength(show, "show", 3, 50);
      valid = valid && checkLength(description, "description", 6, 144);
 
      if(valid){
        var event = {
              title  : show.val()+" <br/>: "+description.val(),
              start  : day,
              allDay : false // will make the time show
          };
        calendar.fullCalendar( 'renderEvent', event);
        alert("New event succesfully added!");
        dialog.dialog("close");
      }
      return valid;
    }
    var day;
    var calendar = $('#calendar').fullCalendar({
        dayClick: function(date, jsEvent, view) {
            /*
            alert('Clicked on: ' + date.format());

            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

            alert('Current view: ' + view.name);

            // change the day's background color just for fun
            $(this).css('background-color', 'red');
            */
            day = date;
            dialog.dialog("open");
        },
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2016-08-01'
        },
        {
          title: 'Long Event',
          start: '2016-08-07',
          end: '2016-08-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-08-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-08-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2016-08-11',
          end: '2016-08-13'
        },
        {
          title: 'Meeting',
          start: '2016-08-12T10:30:00',
          end: '2016-08-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2016-08-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2016-08-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2016-08-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2016-08-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2016-08-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2016-08-28'
        }
      ]
    });
}
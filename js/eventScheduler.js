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
 
    var dialog2 = $("#dialog2-form").dialog({
        show:{effect:"blind", duration:500},
	      hide:{effect:"explode", duration:500},
        autoOpen: false,
        height: 350,
        width: 350,
        modal: true,
        buttons: {
            "Delete": deleteEvent,
            "Edit": editEvent,
            Cancel: function() {
                $(this).dialog("close");
            }
        },
        close: function() {
            form2[0].reset();
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
 
    var form2 = dialog.find("form").on("submit", function(event) {
      event.preventDefault();
      addEvent();
    }); form2,
    show2 = $("#show2"),
    description2 = $("#description2"),
    allFields2 = $([]).add(show2).add(description2),
    tips2 = $(".validateTips");

    function updateTips(t) {
      tips
        .text( t )
        .addClass("ui-state-highlight");
      setTimeout(function() {
        tips.removeClass("ui-state-highlight", 1500);
      }, 500);
    }

    function updateTips2(t) {
      tips2
        .text( t )
        .addClass("ui-state-highlight");
      setTimeout(function() {
        tips2.removeClass("ui-state-highlight", 1500);
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
              title  : show.val()+":\n"+description.val(),
              start  : day
          };
        calendar.fullCalendar( 'renderEvent', event);
        alert("New event succesfully added!");
        dialog.dialog("close");
      }
      return valid;
    }

    function editEvent() {
      var valid = true;
      allFields2.removeClass("ui-state-error" );
      valid = valid && checkLength(show2, "show", 3, 50);
      valid = valid && checkLength(description2, "description", 6, 144);
 
      if(valid){
        selectedEvent.title = show2.val()+":\n"+description2.val();
        calendar.fullCalendar( 'updateEvent', selectedEvent);
        alert("Event succesfully updated!");
        dialog2.dialog("close");
      }
      return valid;
    }

    function deleteEvent() {
      calendar.fullCalendar( 'removeEvents', selectedEvent._id);
      alert("Event succesfully deleted!");
      dialog2.dialog("close");
    }

    var day;
    var selectedEvent;
    var calendar = $('#calendar').fullCalendar({
      dayClick: function(date) {
        day = date;
        dialog.dialog("open");
      },
      eventClick: function(event) {
            selectedEvent = event;
            $('#show2').val(event.title);
            $('#description2').val(event.title);
            dialog2.dialog("open");
      },
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      editable: true,
      eventLimit: true,
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
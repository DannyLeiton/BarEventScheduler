$(document).ready(init);

function init() {
    //Create Event Dialog
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
    //Edit or Delete Event Dialog
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
    //Create Event form
    var form = dialog.find("form").on("submit", function(event) {
      event.preventDefault();
      addEvent();
    }); form, 
    show = $("#show"),
    description = $("#description"),
    allFields = $([]).add(show).add(description),
    tips = $(".validateTips");
    //Edit or Delete Event Form 
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
        saveEvent(event);
        calendar.fullCalendar( 'renderEvent', event);
        alert("New event succesfully added!");
        dialog.dialog("close");
      }
      return valid;
    }

    function saveEvent(theEvent){        
        var http = new XMLHttpRequest();
        var url = "/events/";
        var params = "title="+theEvent.title+"&start="+theEvent.start;
        http.open("POST", url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(params);
    }

    function editEvent() {
      var valid = true;
      allFields2.removeClass("ui-state-error" );
      valid = valid && checkLength(show2, "show", 3, 50);
      valid = valid && checkLength(description2, "description", 6, 144);
 
      if(valid){
        selectedEvent.title = show2.val()+":\n"+description2.val();
        putEvent(selectedEvent);
        calendar.fullCalendar('updateEvent', selectedEvent);
        alert("Event succesfully updated!");
        dialog2.dialog("close");
      }
      return valid;
    }

    function putEvent(theEvent){        
        var http = new XMLHttpRequest();
        var url = "/events/"+theEvent._id;
        var params = "title="+theEvent.title;
        http.open("PUT", url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(params);
    }

    function deleteEvent() {
      removeEvent(selectedEvent);
      calendar.fullCalendar( 'removeEvents', selectedEvent._id);
      alert("Event succesfully deleted!");
      dialog2.dialog("close");
    }

    function removeEvent(theEvent){        
        var http = new XMLHttpRequest();
        var url = "/events/"+theEvent._id;
        http.open("DELETE", url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send();
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
            var title = event.title.split(":\n");
            $('#show2').val(title[0]);
            $('#description2').val(title[1]);
            dialog2.dialog("open");
      },
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      editable: false,
      eventLimit: true,
      events: {
                url: '/events/',
                type: "GET",                    
                error: function() {
                  alert('there was an error while fetching events!');
                }
              }
    });
}
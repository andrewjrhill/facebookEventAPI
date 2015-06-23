/* ===================================================== */
/* Project Name:         Simple Facebook Events via JSON */
/* Project URL:                     www.andrewjrhill.com */
/* Author(s):       Andrew Hill - andrewjrhill@gmail.com */
/* ===================================================== */

var globalScope = {

  init: function() {

    var fbPageId = 'UNIQUE PAGE ID WHERE EVENTS WILL BE HOSTED';
    var accessToken = 'YOUR APP ID' + '|' + 'YOUR APP SECRET';
    var fields = 'id,name,description,start_time,cover,picture';
    var JSONURL = 'https://graph.facebook.com/' + fbPageId + '/events/' +
                  '?fields=' + fields +
                  '&access_token=' + accessToken;

    // Uncomment to list all possible metadata endpoints in devtools Network tab.
    // var JSONURL = 'https://graph.facebook.com/' + fbPageId +
    //               '?metadata=1&' + 
    //               'access_token=' + accessToken;

    globalScope.getEvents(JSONURL);
  },

  getEvents: function(JSONURL) {
    $.getJSON(JSONURL, function(json){
      var eventData = json.data;
      printEvents(eventData);
    })

    function printEvents(eventData){
      for (var i in eventData) {
        var eventStartDate = (eventData[i].start_time).match('^[0-9\-]*(?=T)');
        var eventStartTime = (eventData[i].start_time).match('((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)');

        $('.container').append(
          '<div id="' +  eventData[i].id + '">' +
            '<p><strong>Cover: </strong><img src=' + eventData[i].cover.source + '></p>' +
            '<p><strong>Name: </strong> ' + eventData[i].name + '</p>' +
            '<p><strong>Description: </strong> ' + eventData[i].description + '</p>' +
            '<p><strong>Date: </strong> ' + eventStartDate + '</p>' +
            '<p><strong>Time: </strong> ' + eventStartTime[0] + '</p>' +
          '</div>'
        );
      }
    }
  }
}

globalScope.init();

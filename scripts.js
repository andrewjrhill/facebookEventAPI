/* ===================================================== */
/* Project Name:         Simple Facebook Events via JSON */
/* Project URL:                     www.andrewjrhill.com */
/* Author(s):       Andrew Hill - andrewjrhill@gmail.com */
/* ===================================================== */

// Define global scope.
var fbGlobalScope = {

  init: function() {

    // Find unique page ID by viewing source of Facebook page and searching for page_id.
    // Example: View page source on https://www.facebook.com/GitHub/, CTRL+F to find 
    // page_id will return the numeric page ID '262588213843476' for GitHubs' Facebook Page.
    var fbPageId = 'NUMERIC PAGE ID GOES HERE';

    // Access Token is a combination of your App ID and App Secret. Both can be found
    // when signing up for a new Facebook App at https://developers.facebook.com/apps/
    var accessToken = 'APP ID GOES HERE' + '|' + 'APP SECRET GOES HERE';

    // List the fields you wish to be returned by the Graphing API to increase
    // performance. This will be included in a URL so do not place spaces between commas.
    // A list of fields can be viewed by visiting the documentation at
    // https://developers.facebook.com/docs/graph-api/reference/v2.3/event
    var fields = 'id,name,description,start_time,cover';

    // Constructed URL used to retrieve JSON objects containing our events.
    var eventsURL = 'https://graph.facebook.com/' + fbPageId + '/events/' +
                    '?fields=' + fields +
                    '&access_token=' + accessToken;

    // Get events and pass eventsURL to function.
    fbGlobalScope.getEvents(eventsURL);
  },

  // Define primary event retrieval function.
  getEvents: function(eventsURL) {

    // Request event data from Facebooks Graphing API using the constructed eventsURL.
    $.getJSON(eventsURL, function(json){
      // Assign JSON data to a workable array.
      var eventData = json.data;
      // Print data to the page. Pass in eventData to allow for looping.
      printEvents(eventData);
    });

    // Define primary event printing function.
    function printEvents(eventData){
      // Loop through events in eventData array.
      for (var i in eventData) {
        // Regex to match only the events date from the API date/time data.
        var eventStartDate = (eventData[i].start_time).match('^[0-9\-]*(?=T)');
        // Regex to match only the events time from the API date/time data.
        var eventStartTime = (eventData[i].start_time).match('((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)');
        // Append data to the document body.
        $('body').append(
          // Event ID
          '<div id="' +  eventData[i].id + '">' +
            // Event cover image
            '<p><strong>Cover: </strong><img src=' + eventData[i].cover.source + '></p>' +
            // Event name
            '<p><strong>Name: </strong> ' + eventData[i].name + '</p>' +
            // Event description
            '<p><strong>Description: </strong> ' + eventData[i].description + '</p>' +
            // Event date
            '<p><strong>Date: </strong> ' + eventStartDate + '</p>' +
            // Event time
            '<p><strong>Time: </strong> ' + eventStartTime[0] + '</p>' +
          '</div>'
        );
      }
    }
  }
}

// Initialize all functions
fbGlobalScope.init();

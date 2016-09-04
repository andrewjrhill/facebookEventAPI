endpointURL = () => {
  // Find unique page ID by viewing source of Facebook page and searching for page_id.
  // Example: View page source on https://www.facebook.com/GitHub/, CTRL+F to find
  // page_id will return the numeric page ID '262588213843476' for GitHubs' Facebook Page.
  const facebookPageID = '262588213843476';

  // Your access token is a combination of your App ID and App Secret. Both can be found
  // when signing up for a new Facebook App at https://developers.facebook.com/apps/
  const appID = '0000000000000000';
  const secret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';

  // List the fields you wish to be returned by the Graphing API to increase
  // performance. This will be included in a URL so do not place spaces between commas.
  // A list of fields can be viewed by visiting the documentation at
  // https://developers.facebook.com/docs/graph-api/reference/v2.3/event
  const fields = 'id,name,description,start_time,cover';

  // Constructed URL used to retrieve JSON objects containing our events.
  return `https://graph.facebook.com/${facebookPageID}/events/?fields=${fields}&access_token=${appID}|${appSecret}`;
}

// Define primary event retrieval function.
getEvents = () => {
  // Request event data from Facebooks Graphing API using the constructed endpointURL.
  $.getJSON(endpointURL, (json) => {
    // Print data to the page. Pass in events to allow for looping.
    printEvents(json.data);
  });
}

// Define primary event printing function.
printEvents = (events) => {
  // Loop through events in events array.
  for (var event in events) {
    // Convert the date/time string returned by Facebook to a date/time object.
    var eventDateTime = new Date(events[event].start_time);
    // Match the date to a YYYY-MM-DD format.
    var eventStartDate = (events[event].start_time).match('^[0-9\-]*(?=T)');
    // Match the time to a HH:MM format.
    var eventStartTime = `${eventDateTime.getHours()}:${('0' + eventDateTime.getMinutes()).slice(-2)}`;

    // Append data to the document body.
    $('body').append(
      `<div id="${events[event].id}">
        <p>Cover: <img src=${events[event].cover.source}></p>
        <p>Name: ${events[event].name}</p>
        <p>Description: ${events[event].description}</p>
        <p>Date: ${eventStartDate}</p>
        <p>Time: ${eventStartTime}</p>
      </div>`
    );
  }
}

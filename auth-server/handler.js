'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://meet-gamma-one.vercel.app/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: 'consent',
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  try {
    const { code } = JSON.parse(event.body);
    const { tokens } = await oAuth2Client.getToken(code);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(tokens),
    };
  } catch (error) {
    console.error("Error getting access token:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

module.exports.getCalendarEvents = async (event) => {
  try {
    const access_token = event.headers.Authorization.split(' ')[1];
    oAuth2Client.setCredentials({ access_token });

    const results = await calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  } catch (error) {
    console.error("Error getting calendar events:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
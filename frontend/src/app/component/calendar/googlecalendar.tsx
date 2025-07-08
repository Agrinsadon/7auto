import { gapi } from 'gapi-script';

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const CLIENT_ID = '906679290994-3vvamik8bag69tn9chd19i06ddol4f1t.apps.googleusercontent.com';

export function initGoogleCalendar(callback: () => void) {
  function start() {
    gapi.client.init({
      apiKey: 'AIzaSyDx03X-msU24wwa5eETdrVj-fZ8J_3fN7E',
      clientId: CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: SCOPES,
    }).then(() => {
      gapi.auth2.getAuthInstance().signIn().then(callback);
    });
  }

  gapi.load('client:auth2', start);
}

export async function fetchCalendarEvents() {
  const response = await gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 2500,
    orderBy: 'startTime',
  });

  return response.result.items;
}

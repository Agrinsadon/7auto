// src/app/component/calendar/googlecalendar.ts

export const initGoogleCalendar = async (onReady: () => void) => {
    if (typeof window === 'undefined') return;
  
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.async = true;
  
    gapiScript.onload = () => {
      const gapi = (window as any).gapi;
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: 'AIzaSyDx03X-msU24wwa5eETdrVj-fZ8J_3fN7E',
          clientId: '906679290994-3vvamik8bag69tn9chd19i06ddol4f1t.apps.googleusercontent.com',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar.readonly',
        }).then(() => {
          gapi.auth2.getAuthInstance().signIn().then(onReady);
        });
      });
    };
  
    document.body.appendChild(gapiScript);
  };
  
  export const fetchCalendarEvents = async () => {
    if (typeof window === 'undefined') return [];
  
    const gapi = (window as any).gapi;
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 2500,
      orderBy: 'startTime',
    });
  
    return response.result.items;
  };
  
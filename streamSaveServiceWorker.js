/*
This service worker intercepts urls set by streamSave and responds with
the data streamed to it by the client. It basically acts as a middle-man
so that the client and dynamically generate data on-demand for a download.
*/

// keep track of multiple urls to intercept
const MAP = new Map();

// set url to intercept and data stream to use for feeding the response
self.onmessage = evt => {
    const port = evt.ports[0];
    port.onmessage = e => {
        MAP.set(e.data.url, e.data);
        port.postMessage({ url: e.data.url });
    }
}
// intercept urls and respond with the streamed data
self.onfetch = evt => {
    const data = MAP.get(evt.request.url);
    if (data) {
        MAP.delete(evt.request.url);
        evt.respondWith(new Response(data.stream, { headers: new Headers(data.headers) }))
    }
}


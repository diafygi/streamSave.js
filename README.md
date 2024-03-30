# streamSave.js

This library lets you trigger a download prompt in browsers and stream data to that downloading file.

Demo: https://diafygi.github.io/streamSave.js/

## How to use

Example use:
```html
<script src="./streamSave.js"></script>
<script>
  (async () => {
    const [url, writer] = await promptSave("sample.txt", 200);  // trigger a download prompt
    writer.write(new Uint8Array(Array(100).fill(0));            // write some data
    writer.write(new Uint8Array(Array(100).fill(1));            // write some more data
    writer.close();                                             // finish the download
  })();
</script>
```

To get the demo to work on your local system:
```
git clone https://github.com/diafygi/streamSave.js
cd streamSave.js
python3 -m http.server
# (open your browser to localhost:8000)
```

## How this works

Largely inspired by https://github.com/jimmywarting/StreamSaver.js

Since most modern browsers have service workers, message channels, and transform streams, you can just use those directly instead of using the `mitm.html` technique that is used in StreamSaver.js.

I made this as a project to learn how StreamSaver.js worked, and it's mostly to use on internal side projects.


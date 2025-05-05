// First validate the env exists
if (!process.env.ORIGINS) {
  throw new Error('ORIGINS environment variable is required');
}

// Split and clean origins
const origins = process.env.ORIGINS.split(',')
  .map(o => o.trim())
  .filter(Boolean);

if (!origins.length) {
  throw new Error('No valid origins provided in ORIGINS');
}

// Optional: Add debug logging
console.log('Allowed origins:', origins);


module.exports = (oauthProvider, message, content) => `
<script>
(function() {
  function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf('*') >= 0) {
        const regex = new RegExp(arr[i].replaceAll('.', '\\\\.').replaceAll('*', '[\\\\w_-]+'))
        console.log(regex)
        if (elem.match(regex) !== null) {
          return true;
        }
      } else {
        if (arr[i] === elem) {
          return true;
        }
      }
    }
    return false;
  }
  function recieveMessage(e) {
    console.log("recieveMessage %o", e)
    if (!contains(${JSON.stringify(origins)}, e.origin.replace('https://', 'http://').replace('http://', ''))) {
      console.log('Invalid origin: %s', e.origin);
      return;
    }
    // send message to main window with da app
    window.opener.postMessage(
      'authorization:${oauthProvider}:${message}:${JSON.stringify(content)}',
      e.origin
    )
  }
  window.addEventListener("message", recieveMessage, false)
  // Start handshare with parent
  console.log("Sending message: %o", "${oauthProvider}")
  window.opener.postMessage("authorizing:${oauthProvider}", "*")
})()
</script>`

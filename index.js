addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

async function handleRequest(request) {
  //fetch for URL array
  let urlArray = [];
  await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
  .then(response => urlArray = response.json())
  .then(data => urlArray = data);

  //fetch for script response
  let responseData = "";
  await fetch(urlArray["variants"][Math.floor(Math.random()*2)])
  .then(response => response.text())
  .then(data => responseData = data);

  //change values in return html string
  responseData = responseData.replace("Return to cloudflare.com", "Pretty good, right?");
  responseData = responseData.replace("!", "! Stay safe and remember to wash your hands.");
  responseData = responseData.replace("https://cloudflare.com", "https://www.linkedin.com/in/bryant-hou/");
  return new Response(responseData, {
    headers: { 'content-type': 'text/html' },
  })
}

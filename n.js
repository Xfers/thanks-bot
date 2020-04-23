const AsyncLocalStorage = require('async_hooks').AsyncLocalStorage;
const asyncLocal1 = new AsyncLocalStorage();

function logData() {
  console.log(asyncLocal1.getStore(['url']));
}

function accept(request, response) {
  asyncLocal1.getStore()['url'] = request.url;
  setTimeout(logData, 100);
  setTimeout(logData, 1000);
};

asyncLocal1.run(new Object(), accept.bind(null, { url: 'url1'}, {}));
setTimeout(() => { asyncLocal1.run(new Object(), accept.bind(null, { url: 'url2'}, {})) },
  500);

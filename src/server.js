const http = require('http');
const responseHandler = require('./htmlResponses.js');
// const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/success': responseHandler.getCodes,
  '/badRequest': responseHandler.getCodes,
  '/unauthorized': responseHandler.getCodes,
  index: responseHandler.getIndex,
};

const onRequest = (request, response) => {
  console.log(request.url);

  /* switch (request.url) {
    case '/':
      responseHandler.getIndex(request, response);
      break;
    case '/success':

      break;
    default:
      responseHandler.getIndex(request, response);
      break;
  } */
  // parse url using built-in URL class
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  request.acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.index(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});

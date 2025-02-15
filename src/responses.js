// const fs = require('fs');
// pull in the file system module
// const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  response.write(content);
  response.end();
};

// overfactoring?
const checkConvertXML = (request, response, status, responseJSON) => {
  // if accepted type is XML, convert and pass to respond()
  if (request.type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += `<message>${responseJSON.message}</message>`;
    if (responseJSON.id !== '') {
      responseXML += `<id>${responseJSON.id}</id>`;
    }
    responseXML += '</response>';
    return respond(request, response, status, responseXML, 'text/xml');
  }
  // if accepted type isn't XML (default JSON), stringify and pass to respond()
  const stringResponse = JSON.stringify(responseJSON);
  return respond(request, response, status, stringResponse, 'application/json');
};

/* const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  if (request.type[0] === 'text/xml') {
    //return toXML(request, response, responseJSON);

  }
  const stringResponse = JSON.stringify(responseJSON);
  return respond(request, response, 200, stringResponse, 'application/json');
}; */

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  return checkConvertXML(request, response, 200, responseJSON);
};
const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!request.query.valid || request.query.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return checkConvertXML(request, response, 400, responseJSON);
  }
  return checkConvertXML(request, response, 200, responseJSON);
};
const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };

  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return checkConvertXML(request, response, 401, responseJSON);
  }
  return checkConvertXML(request, response, 200, responseJSON);
};
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };
  return checkConvertXML(request, response, 403, responseJSON);
};
const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };
  return checkConvertXML(request, response, 500, responseJSON);
};
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  return checkConvertXML(request, response, 501, responseJSON);
};
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return checkConvertXML(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};

const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

/* const getIndex = (request, response) => {
  // set status code (200), content type, content length
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(index, 'utf8'),
  });
  response.write(index);
  response.end();
}; */

const respond = (request, response, content, type) => {
  response.writeHead(200, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  response.write(content);
  response.end();
};

/* const getCodes = (request, response) => {
  const xyz = {
    code: '999',
    message: 'placeholder text placeholder text',
  };

  const codeString = JSON.stringify(xyz);
  return respond(request, response, codeString, 'application/json');
}; */

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
  // respond(request, response, style, 'text/css');
};
const getStyle = (request, response) => {
  respond(request, response, style, 'text/css');
};

// export function(s)
module.exports = {
  getIndex,
  getStyle,
};

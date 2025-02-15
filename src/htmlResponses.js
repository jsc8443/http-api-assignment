const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const htmlRespond = (request, response, content, type) => {
  response.writeHead(200, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  htmlRespond(request, response, index, 'text/html');
};
const getStyle = (request, response) => { // load css file
  htmlRespond(request, response, style, 'text/css');
};

// export function(s)
module.exports = {
  getIndex,
  getStyle,
};

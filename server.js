const http = require('http');
const url = require('url');
const server = http.createServer();

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'whatever' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'pam lovett', 'message': 'f*ck, sh*t, c*ck ' }
]

server.listen(3000, () => {
  console.log('Hey, Listen! port 3000')
})

const getAllMessages = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
}

const addMessage = (message, response) => {
  response.writeHead(201, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(message));
  messages.push(message);
  response.end();
};

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response)
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': messages.length+1 };
    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response)
    });
  }
});





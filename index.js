const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
const server = http.createServer(app);
const port = 3000;
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

const users = [
	{
		id: 1,
		name: 'samiul',
	},
	{
		id: 2,
		name: 'islam',
	},
	{
		id: 3,
		name: 'akash',
	},
];

// const map = new Map();

app.post('/ticket-purchase', (req, res) => {
	io.to(req.body.socketId).emit('private-message', 'Waiting for payment...');
	res.send({ message: 'Ticket Purchase!', socketId: socketId });
});

app.post('/payment-done', (req, res) => {
	io.to(req.body.socketId).emit('private-message', 'Payment Done!');
	res.send('Payment Done!');
});

// io.use((socket, next) => {
// 	const identifier = socket.handshake.headers['identifier'];
// 	const user = users.find((user) => user.id === parseInt(identifier));
// 	if (!user) {
// 		return next(new Error('Authentication error'));
// 	}
// 	socket.data = { ...user };
// 	next();
// });

io.on('connection', (socket) => {
	// console.log(`socket Id: ${socket.data.id}. username: ${socket.data.name} connected.`);
	// socket.on('message', (msg) => {
	// 	// io.emit('message', msg.message);
	//   socket.to(socket.data.id+1).emit('message', msg.message);
	// });

	socket.emit('identifier', socket.id);

	// socket.on('private-message', (msg) => {
	// 	socket.to(msg.to).emit('message', msg.message);
	// });

	// map.set(socket.id, socket.handshake.headers['identifier']);
});

server.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

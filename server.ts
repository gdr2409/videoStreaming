import * as express from 'express';
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

async function videoStreamer (req, res) {
	const file = req.query.file;
	const filePath = 'assets/' + file;
	const stat = fs.statSync(filePath);
	const fileSize = stat.size;
	const head = {
		'Content-Length': fileSize,
		'Content-Type': 'video/mp4',
	}
	res.writeHead(200, head)
	fs.createReadStream(filePath).pipe(res);
}

app.get('/video', videoStreamer);

server.listen(4300);
console.log('server listening on port ' + 4300);
const express = require("express")
const app = express()
const http = require('http');
var cors = require('cors')
const { client } = require("./databaselogs/db")
app.use(cors())
app.use(express.json());
client.connect();
const { Server } = require('socket.io');


// const socketIO = require('socket.io');


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

client.connect();

let connectedClients = new Set();

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected`);

  connectedClients.add(socket);

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
    connectedClients.delete(socket);
  });
});

async function handleDatabaseUpdate(data) {
  console.log('Database updated');

  for (const client of connectedClients) {
    client.emit('dbUpdate', data);
  }
}

// setInterval(handleDatabaseUpdate, 10000);


app.get('/', async (req, res) => {
  client.query("SELECT * FROM button", (err, { rows }) => {
    (err) ? console.log({ err }) : res.json({ rows });
  });
})

app.put('/update', async (req, res) => {
  console.log(req.body);
  try {
    const data = await client.query('UPDATE button SET button1 = $1, button2 = $2 , button3 = $3 WHERE user_id = 1 ', [req.body?.button1, req.body?.button2, req.body?.button3]);
    // const newdata= 
    res.json("true") // prints the number of rows affected by the update
    handleDatabaseUpdate(req.body )

  } catch (err) {
    console.error(err);
  } finally {
    console.log("dsd");
    // await client.end();
  }
})

const port = 3003
// io.listen(3004,()=>{
//     console.log(`Server is running at Port : ${port}`)
// })

server.listen(port, () => {
  console.log(`Server is running at Port : ${port}`)
})
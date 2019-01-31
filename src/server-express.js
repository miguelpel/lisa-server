import superscript from 'superscript';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const server = express();
const PORT = process.env.PORT || 5000;

server.use(bodyParser.json());

let bot;

// const corsOptions = {
//   origin: 'http://localhost:3000'
// }

// server.use(cors())


// var cors = require('cors');

var corsOptions = {
  origin: '*',
  methods: ['GET'],
  maxAge: 3600,
  enablePreflight: true
};

//server.options('*', cors())

server.options('/superscript', cors(corsOptions));
server.get('/superscript', cors(corsOptions), (req, res) => {
  if (req.query.message) {
    return bot.reply('user1', req.query.message, (err, reply) => {
      res.json({
        message: reply.string,
      });
    });
  }
  return res.json({ error: 'No message provided.' });
});

const options = {
  logPath: null,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:5000/superscriptdb',
  factSystem: {
    clean: true,
  },
  importFile: './data.json',
};

superscript.setup(options, (err, botInstance) => {
  if (err) {
    console.error(err);
  }
  bot = botInstance;

  server.listen(PORT, () => {
    console.log(`===> 🚀  Server is now running on port ${PORT}`);
  });
});

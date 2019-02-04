import superscript from 'superscript';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const server = express();
const PORT = process.env.PORT || 5000;

server.use(bodyParser.json());

let bot;

// change origin for 'http://localhost:3000' for dev,
// and 'https://lisa-client.netlify.com' for production
var corsOptions = {
  origin: 'https://lisa-client.netlify.com',
  methods: ['GET'],
  maxAge: 3600,
  enablePreflight: true
};

server.options('/superscript', cors(corsOptions));
server.get('/superscript', cors(corsOptions), (req, res) => {
  if (req.query.message) {
    return bot.reply(req.query.user, req.query.message, (err, reply) => {
      res.json({
        to: req.query.user,
        userName: 'Lisa',
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

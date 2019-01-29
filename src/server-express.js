import superscript from 'superscript';
import express from 'express';
import bodyParser from 'body-parser';

const server = express();
const PORT = process.env.PORT || 5000;

server.use(bodyParser.json());

let bot;

server.get('/superscript', (req, res) => {
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
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:5000/superscriptdb',
  MONGODB_URI: "mongodb://heroku_wx3317kg:go8pt9am4r7lcc2omc27v95fcc@ds161724.mlab.com:61724/heroku_wx3317kg",
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

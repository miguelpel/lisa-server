'use strict';

var _superscript = require('superscript');

var _superscript2 = _interopRequireDefault(_superscript);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();
var PORT = process.env.PORT || 5000;

server.use(_bodyParser2.default.json());

var bot = void 0;

server.get('/superscript', function (req, res) {
  if (req.query.message) {
    return bot.reply('user1', req.query.message, function (err, reply) {
      res.json({
        message: reply.string
      });
    });
  }
  return res.json({ error: 'No message provided.' });
});

/*const options = {
  logPath: null,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:5000/superscriptdb' || "mongodb://heroku_wx3317kg:go8pt9am4r7lcc2omc27v95fcc@ds161724.mlab.com:61724/heroku_wx3317kg",
  MONGODB_URI: "mongodb://heroku_wx3317kg:go8pt9am4r7lcc2omc27v95fcc@ds161724.mlab.com:61724/heroku_wx3317kg",
  factSystem: {
    clean: true,
  },
  importFile: './data.json',
};*/

var options = {
  logPath: null,
  mongoURI: process.env.MONGOBD_URI || 'mongodb://localhost:5000/superscriptdb',
  factSystem: {
    clean: true
  },
  importFile: './data.json'
};

_superscript2.default.setup(options, function (err, botInstance) {
  if (err) {
    console.error(err);
  }
  bot = botInstance;

  server.listen(PORT, function () {
    console.log('===> \uD83D\uDE80  Server is now running on port ' + PORT);
  });
});
'use strict';

var _superscript = require('superscript');

var _superscript2 = _interopRequireDefault(_superscript);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();
var PORT = process.env.PORT || 5000;

server.use(_bodyParser2.default.json());

var bot = void 0;

// change origin for 'http://localhost:3000' for dev,
// and 'https://lisa-client.netlify.com' for production
var corsOptions = {
  origin: 'https://lisa-client.netlify.com',
  methods: ['GET'],
  maxAge: 3600,
  enablePreflight: true
};

server.options('/superscript', (0, _cors2.default)(corsOptions));
server.get('/superscript', (0, _cors2.default)(corsOptions), function (req, res) {
  if (req.query.message) {
    return bot.reply(req.query.user, req.query.message, function (err, reply) {
      res.json({
        to: req.query.user,
        userName: 'Lisa',
        message: reply.string
      });
    });
  }
  return res.json({ error: 'No message provided.' });
});

var options = {
  logPath: null,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:5000/superscriptdb',
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
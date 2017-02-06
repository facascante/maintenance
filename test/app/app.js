function create(options) {
	var express = require('express');
	var maintenance = require('../../source/maintenance');

	var called = {};
	var app = express();

	app.set('port', process.env.PORT || 3030);
	app.set('views', __dirname + '/views');
	app.engine('html', require('ejs').renderFile);

	maintenance(app, options);

	app.get('/', function (req, res) {
		called['/'] = true;
		res.sendStatus(200);
	});

	app.get('/api/call', function (req, res) {
		called['/api/call'] = true;
		res.json({response: 'response'});
	});

	var server = app.listen(app.get('port'));

	return {
		close: function (callback) {
			server.close(callback);
		},

		called: called
	};
}

module.exports = create;

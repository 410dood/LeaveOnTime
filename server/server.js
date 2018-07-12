// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080

import todoRoutes from './routes/todo.server.route';

var accountSid = 'AC4362215f434f81dba6fc9804a3c4addd'; // Your Account SID from www.twilio.com/console
var authToken = 'your_auth_token';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
	body: 'Hello from Node',
	to: '+12345678901',  // Text this number
	from: '+12345678901' // From a valid Twilio number
})
	.then((message) => console.log(message.sid));


// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ==== production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))
app.use('/api', todoRoutes);



// ====== Error handler ====
app.use(function (err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})


// =================================
// ========== TWILIO SERVER ========
// =================================

const path = require('path');
const { MessagingResponse } = require('twilio').twiml;
const googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_MAPS_API_KEY,
	Promise, // 'Promise' is the native constructor.
});

// const PORT = process.env.PORT || 5000;

express()
	.use(bodyParser.urlencoded({ extended: true }))
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.post('/sms', async (req, res) => {
		try {
			const twiml = new MessagingResponse();
			const input = req.body.Body.toLowerCase();

			// Send help info if requested on format to submit query text
			if (['help me', 'help?', 'help', '?'].includes(input)) {
				const helpMsg = () => ([
					'To use SMS Pigeon, make sure to enter your map query in the following format:',
					'"from <address> to <address> by <method=driving|walking|transit>"',
					'E.g.: "from 1234 mcgill street montreal to 4321 guy avenue montreal by transit"',
				].join('\n'));
				twiml.message(helpMsg());
				res.writeHead(200, { 'Content-Type': 'text/xml' });
				res.end(twiml.toString());
				return;
			}

			const directions = await getGmapsDirections(input);
			let shortDirections = [];
			console.log(directions);

			if (Array.isArray(directions)) {
				// eslint-disable-next-line no-restricted-syntax
				for (const direction of directions) {
					// Must loop over array of strings to ensure not over message POST limit of 1600 characters
					if ([shortDirections, direction].join('\n').length < 1600) {
						shortDirections.push(direction);
					} else {
						console.log(shortDirections.join('\n'));
						twiml.message(shortDirections.join('\n'));
						shortDirections = [direction];
					}
				}
			}
			if (shortDirections.length !== 0) {
				console.log(shortDirections.join('\n'));
				twiml.message(shortDirections.join('\n'));
			} else { // directions is simply a string (not array), likely an error message
				console.log(directions);
				twiml.message(directions);
			}

			res.writeHead(200, { 'Content-Type': 'text/xml' });
			res.end(twiml.toString());
		} catch (e) {
			console.log(e);
		}
	})
	.listen(PORT, () => {
		console.log(`Express server listening on port ${PORT}`);
	});

async function getGmapsDirections(input) {
	console.log(input);

	const keyFrom = getValidAlias(input, ['from ', 'de ', 'beginning at ']);
	const keyTo = getValidAlias(input, ['to ', 'towards ', 'toward ', 'toward ']);
	const keyBy = getValidAlias(input, ['using ', 'by means of ', 'by means ', 'via ', 'by ']);

	const from = keyFrom.index;
	const to = keyTo.index;
	const by = keyBy.index ? keyBy.index : -1;

	const origin = (from != -1) ? input.substring(from + keyFrom.length, Math.min((to < from) ? input.length : to, (by < from) ? input.length : by)) : '';
	const destination = (to != -1) ? input.substring(to + keyTo.length, Math.min((from < to) ? input.length : from, (by < to) ? input.length : by)) : '';
	const mode = (by != -1) ? input.substring(by + keyBy.length, Math.min((from < by) ? input.length : from, (to < by) ? input.length : to)) : '';

	console.log(`origin: ${origin}`);
	console.log(`destination: ${destination}`);
	console.log(`mode: ${mode}`);

	const errorMsg = () => (['Unfortunately, Google Maps was unable to find any results for your query.',
		`Origin: ${origin}`,
		`Destination: ${destination}`,
		`Mode: ${mode}`].join('\n'));

	try {
		const query = {};
		if (origin) query.origin = origin.toLowerCase().trim();
		if (destination) query.destination = destination.toLowerCase().trim();
		if (mode) query.mode = mode.toLowerCase().trim();
		console.log(`mode: ${mode}`);

		const response = await googleMapsClient.directions(query).asPromise();
		console.log(response);

		if (['NOT_FOUND', 'ZERO_RESULTS'].includes(response.json.status)) {
			return errorMsg();
		}

		const replaceThis = [/<b>|<\/b>|<div>|<\/div>|<.*>/g, ''];
		const directions = [];

		response.json.routes.forEach((route) => {
			if (!Array.isArray(route.legs)) return;
			route.legs.forEach((leg) => {
				if (!Array.isArray(leg.steps)) return;
				leg.steps.forEach((step) => {
					directions.push(step.html_instructions ? `▶ ${step.html_instructions.replace(...replaceThis)} (${step.distance.text})` : step.html_instructions);
				});
			});
		});

		return directions;
	} catch (e) {
		console.log(e);
		return errorMsg();
	}
}

function getValidAlias(inputToValidate, aliases) {
	let index = -1;
	let i;
	for (i = 0; i < aliases.length; i++) {
		if (inputToValidate.indexOf(aliases[i]) != -1) {
			index = inputToValidate.indexOf(aliases[i]);
			break;
		}
	}
	return aliases[i] ? { length: aliases[i].length, index } : -1;
}

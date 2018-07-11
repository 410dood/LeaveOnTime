const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const DestinationAddress = require('../db/models/destinationAddress')

const passport = require('../passport')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
)

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})


router.get('/destinationAddress', (req, res, next) => {
	console.log('===== Destination Address!!======')
	console.log(req.destinationAddress)
	if (req.destinationAddress) {
		return res.json({ destinationAddress: req.destinationAddress })
	} else {
		return res.json({ destinationAddress: null })
	}
})

router.post(
	'/login',
	function (req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/signup', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})


router.post('/destinationAddress', (req, res) => {
	const { dest_title, dest_address, dest_city, dest_state, dest_zipcode, dest_time } = req.body
	console.log(typeof req.body);
	// ADD VALIDATION
	DestinationAddress.findOne({ 'dest_title': username }, (err, userMatch) => {
		if (destinationAddressMatch) {
			return res.json({
				error: `Sorry, already a destination with the title: ${destinationAddress}`
			})
		}
		const newDestinationAddress = new DestinationAddress({
			'dest_title': title,
			'dest_address': address,
			'dest_city': city,
			'dest_state': state,
			'dest_zipcode': zipcode,
			'dest_time': time
		})
		newDestinationAddress.save((err, savedDestinationAddress) => {
			if (err) return res.json(err)
			return res.json(savedDestinationAddress)
		})
	})
})

module.exports = router

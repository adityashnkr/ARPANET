const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth_mid');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const config = require('config');
const { check, validationResult } = require('express-validator');
const request = require('request');
//@route GET api/profile/me
//@desc Get current user profile
//@access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			website,
			skills,
			company,
			location,
			bio,
			status,
			githubusername,
			youtube,
			twitter,
			facebook,
			linkedin,
			instagram,
		} = req.body;
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map((skills) => skills.trim());
		}

		profileFields.social = {};
		profileFields.user = req.user.id;
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				//Update
				let profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			//Create
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

//@route GET api/profile
//@desc See all user profile
//@access Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

//@route GET api/profile/user/:user_id
//@desc See user profile by ID
//@access Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);
		if (!profile) return res.status(400).json({ msg: 'Profile not found' });
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server error');
	}
});

//@route DELETE api/profile
//@desc Delete user profile
//@access Private
router.delete('/', auth, async (req, res) => {
	try {
		await Post.deleteMany({ user: req.user.id });
		//Delete profile
		await Profile.findOneAndDelete({ user: req.user.id });
		//Delete user
		await User.findOneAndDelete({ _id: req.user.id });
		res.json({ msg: 'User deleted!' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private

router.put(
	'/experience',
	auth,
	[
		check('title', 'Title is required').not().isEmpty(),
		check('company', 'Company is required').not().isEmpty(),
		check(
			'from',
			'From date is required and needs to be from the past'
		).notEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(req.body);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);
// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete profile experience
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private

router.put(
	'/education',
	auth,
	[
		check('school', 'School is required').not().isEmpty(),
		check('degree', 'Degree is required').not().isEmpty(),
		check('fieldofstudy', 'Field is required').not().isEmpty(),
		check(
			'from',
			'From date is required and needs to be from the past'
		).notEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(req.body);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/profile/education/:exp_id
// @desc     Delete profile education
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);
		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github of user
// @access   Public

router.get('/github/:username', async (req, res) => {
	try {
		console.log(process.env.githubSecret)
		const option = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=10&sort=created:asc&client_id=${config.get(
				'githubClientId'
			)}&client_secret=process.env.githubSecret`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' },
		};
		console.log(option)
		request(option, (error, response, body) => {
			if (error) console.error(error);
			if (response.statusCode !== 200) {
				res.status(404).json({ msg: 'No GitHub profile found' });
				return;
			}
			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;

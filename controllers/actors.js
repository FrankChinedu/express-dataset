const db = require('../db/index');
const util = require('../util/index');

const inDescendingOrder = util.inDescendingOrder;
const inAlphabeticalOrder = util.inAlphabeticalOrder;
const getNumberOfEvents = util.orderByNumberOfEvents;
const orderByComplexity = util.orderByComplexity;
const orderByStreak = util.orderByStreak;
const removeStreakAndCreatedAtFromArr = util.removeStreakAndCreatedAtFromArr;
const removeEventNumAndCreatedAtFromArr = util.removeEventNumAndCreatedAtFromArr;
const sortbyDate = util.sortbyDate;

var getAllActors = (req, res) => {
	db.find({}, function (err, doc) {
		let actors = doc.map(event => { 
			const actorEvent = event.actor
			const createdAt = event.created_at
			const result = {...actorEvent, createdAt}
			return result;
		});
		actors = inAlphabeticalOrder(actors);
		actors = getNumberOfEvents(actors);
		actors = inDescendingOrder(actors);
		actors = orderByComplexity(actors);
		actors = removeEventNumAndCreatedAtFromArr(actors);

		res.status(200).json(actors);
	});
};

var updateActor = (req, res) => {
	const {body} = req;
	const actorId = body.id;
	const notVAlid = !Object.keys (body).every (element =>
    ['id', 'login', 'avatar_url'].includes (element)
  );
  if (notVAlid) {
    return res.status (400).json();
  }
	db.findOne({ "actor.id" : actorId }, function(err, doc) {
		if(!doc) {
			res.status(404).json();
			return;
		}
		db.update({ _id: doc._id }, {$set: { "actor.avatar_url" : body.avatar_url }},
		 {multi: true}, function(err, numRepl) {
			res.status(200).json();
		 })
	})
};

var getStreak = (req, res) => {
	db.find({}, function (err, doc) {
		let actors = doc.map(event => {
			const actorEvent = event.actor
			const createdAt = event.created_at
			const result = {...actorEvent, createdAt}
			return result;
		});

		actors = sortbyDate(actors);
		actors = orderByStreak(actors);
		actors = removeStreakAndCreatedAtFromArr(actors);

		res.status(200).json(actors);
	});
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};


















const db = require('../db/index');
const util = require('../util/index');

const inAscendingOrder = util.inAscendingOrder;

var getAllEvents = (req, res) => {
	db.find({}, function (err, doc) {
		let result = inAscendingOrder(doc);
		res.status(200).send(result);
	});
};

var addEvent =  (req, res) => {
	let { body } = req;
	db.findOne({ id: body.id}, function(err, exist) {
		if (exist) {
			res.status(400).end();
			return;
		}
		db.insert(body, function(err, doc) {
			res.status(201).end();
		});
});
};


var getByActor = (req, res) => {
	const {params: {actorId}} = req;
	db.find({ "actor.id" : parseInt(actorId) }, function(err, doc) {
		doc.length ? 
		res.status(200).send(inAscendingOrder(doc)) : res.status(404).end();
	})
};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};


















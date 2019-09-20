const db = require('../db/index');
const util = require('../util/index');

const inAscendingOrder = util.inAscendingOrder;

var getAllEvents = (req, res) => {
	db.find({}, {
				_id: 0
			},

			function (err, doc) {
		let result = inAscendingOrder(doc);
		res.status(200).json(result);
	});
};

var addEvent =  (req, res) => {
	let { body } = req;
	db.findOne({
				id: body.id
			}, 

			function (err, exist) {
		if (exist) {
			res.status(400).json();
			return;
		}
		db.insert([{...body}], function(err, doc) {
			res.status(201).json();
		});
});
};


var getByActor = (req, res) => {
	const {params: {actorId}} = req;
	db.find({
				"actor.id": parseInt(actorId)
			}, {
				_id: 0
			}, function (err, doc) {
		doc.length ? 
		res.status(200).json(inAscendingOrder(doc)) : res.status(404).json();
	})
};


var eraseEvents = (req, res) => {
	db.remove({}, { multi: true}, function(err, numRemoved) {
		res.status(200).json();
	})
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};


















const db = require('../db/index');

var getAllActors = () => {
	
};

var updateActor = (req, res) => {
	const {body} = req;
	const actorId = body.id;
	db.findOne({ "actor.id" : actorId }, function(err, doc) {
		if(!doc) {
			res.status(404).end();
			return;
		}
		res.status(200).send('some');
	
	})
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};


















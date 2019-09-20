var express = require('express');
var router = express.Router();
const ActorController = require('../controllers/actors');

// Routes related to actor.
router.put('/', ActorController.updateActor);

module.exports = router;
var express = require('express');
var router = express.Router();
var EventsController = require('../controllers/EventsController.js');

/*
 * GET
 */
router.get('/', function(req, res) {
    EventsController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    EventsController.show(req, res);
});

/*
 * POST
 */
router.post('/', function(req, res) {
    EventsController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    EventsController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    EventsController.remove(req, res);
});

module.exports = router;
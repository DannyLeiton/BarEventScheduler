var EventsModel = require('../models/EventsModel.js');

/**
 * EventsController.js
 *
 * @description :: Server-side logic for managing Events.
 */
module.exports = {

    /**
     * EventsController.list()
     */
    list: function(req, res) {
        EventsModel.find(function(err, Events){
            if(err) {
                return res.json(500, {
                    message: 'Error getting Events.'
                });
            }
            return res.json(Events);
        });
    },

    /**
     * EventsController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        EventsModel.findOne({_id: id}, function(err, event){
            if(err) {
                return res.json(500, {
                    message: 'Error getting event.'
                });
            }
            if(!Events) {
                return res.json(404, {
                    message: 'No such event'
                });
            }
            return res.json(event);
        });
    },

    /**
     * EventsController.create()
     */
    create: function(req, res) {
        var Events = new EventsModel({
			id :  req.body.id,
            title :  req.body.title,
            start :  'ISODate('+req.body.start+')'
        });

        Events.save(function(err, event){
            if(err) {
                return res.json(500, {
                    message: 'Error saving event',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: event._id
            });
        });
    },

    /**
     * EventsController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        EventsModel.findOne({_id: id}, function(err, event){
            if(err) {
                return res.json(500, {
                    message: 'Error saving event',
                    error: err
                });
            }
            if(!event) {
                return res.json(404, {
                    message: 'No such event'
                });
            }

            event.id = req.body.id ? req.body.id : event.id;
            event.title = req.body.title ? req.body.title : event.title;
            event.start = req.body.start ? req.body.start : event.start;
            
            event.save(function(err, event){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting event.'
                    });
                }
                if(!event) {
                    return res.json(404, {
                        message: 'No such event'
                    });
                }
                return res.json(event);
            });
        });
    },

    /**
     * EventsController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        EventsModel.findByIdAndRemove(id, function(err, Events){
            if(err) {
                return res.json(500, {
                    message: 'Error getting Events.'
                });
            }
            return res.json(Events);
        });
    }
};
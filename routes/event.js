const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event_controller')
const {check}=require('express-validator')

const validate =[
    check("name").isLength().withMessage("name must not be empty"),
    check('files').exists().withMessage('Files are required'),
    check("tagline").isLength().withMessage("Tagline should not be empty"),
    check("schedule").isLength().withMessage("Schedule should not be empty"),
    check("description").isLength({ min: 1, max: 300 }).withMessage("Description should be between 1 and 300 characters long"),
    check("moderator").isLength().withMessage("Moderator should not be empty"),
    check("category").isLength().withMessage("category should not be empty"),
    check("sub_category").isLength().withMessage("sub_category should not be empty"),
    check("rigor_rank").isLength().withMessage("rigor_rank should not be empty")
]


router.post('/events',validate,eventController.createEvent);
//update event
router.put('/events/:id',eventController.updateEvent);
//Delete Event
router.delete('/events/:id',eventController.deleteEvent);

//get events
router.get('/events',eventController.getLatestEventss);

//get event by id
router.get('/events/:id',eventController.getEvent);

module.exports = router;
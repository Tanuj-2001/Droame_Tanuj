const express = require('express')
const router = express.Router()
var app = express();
const {getBooking,createBooking, deleteBooking, editBooking} = require('../controllers/BookingController')

app.get("/",getBooking)
router.post("", createBooking)
router.delete("/:_id", deleteBooking)
router.put("/:_id", editBooking)


module.exports = app;
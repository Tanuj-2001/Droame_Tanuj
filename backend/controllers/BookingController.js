const Booking = require('../models/BookingSchema')

const getBooking = async (req,res) => {
    try {
        const bookings = await Booking.find({customer : req.params.customer})
        res.send(bookings)

    } catch (e) {
        res.status(500).send({'error' : 'Cannot fetch!'})
    }
}

const createBooking = async (req,res) => {

    try {
        const booking = new Booking(req.body)
        await booking.save()
        res.status(201).send(booking)
    } catch (e) {
        console.log(e)
        res.status(500).send({'error' : 'Cannot fetch!'})
    }

}

const deleteBooking = async(req, res) =>{
    try{
        await Booking.findByIdAndDelete(req.params._id)
        res.send("Booking Deleted")
    }catch(e){
        res.send({'error':"Booking not available"})
    }   
}

const editBooking = async(req, res) =>{
    try{
        await Booking.findByIdAndUpdate(req.params._id, req.body, {new:true})
        res.send("Booking edited")
    }catch(e){
        res.send({'error': "Booking not Available"})
    }
}

module.exports = {getBooking, createBooking, deleteBooking, editBooking}
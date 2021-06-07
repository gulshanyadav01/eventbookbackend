const Booking = require("../../model/booking"); 
const User = require('../../model/user');
const { dateToString } = require("../../helpers/date")
const {singleEvent, user } = require("./merge"); 
const Event = require("../../model/event")

const transformBooking = (booking)  => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }

}

module.exports = {
    
  
    bookings: async( ) => {
        try{
          const bookings = await   Booking.find(); 
          return bookings.map(booking => {
              return transformBooking(booking)
          })
  
        }catch(err){
            throw err; 
        }
  
    }   
    , 
    bookEvent: async args => {
        const fetchedEvent  = await Event.findOne({_id: args.eventId}); 
        const booking = new Booking({
            user: "60bc851ccef3ed909abe025e",
            event:fetchedEvent 
        }); 
        const result = await booking.save(); 
        return transformBooking(result); 
    },
    cancelBooking: async args  => {
        try{
            const booking = await Booking.findById({_id: args.bookingId})
            const event = transformEvent(booking.event); 
            await Booking.deleteOne({_id: args.bookingId}); 
            return event; 
  
        }catch(err){
            throw err; 
        }
  
    }
  };
  
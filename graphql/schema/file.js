
// type Booking {
//     _id: ID!
//     event: Event!
//     user: User!
//     createdAt: String!
//     updatedAt: String!
// }

bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
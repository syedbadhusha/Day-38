const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());
const rooms = [];
const bookings = [];
// const bookedrooms = []
// Posting rooms
app.post("/createroom", (req, res) => {
  req.body.roomid = rooms.length + 1;
  rooms.push(req.body);
  res.json({ message: "Room created" });
});
// getting rooms list
app.get("/rooms", (req, res) => {
  res.json(rooms);
});
// Posting booking person with rooms
app.post("/createbooking", (req, res) => {
  req.body.bookingid = bookings.length + 1;
  bookings.push(req.body);
  res.json({ message: "Room Booked" });
});
// function to get list all customers with booked data with
async function bookedcustomers() {
  const bookedcustomers = await bookings.map((bookedcust) => {
    const roomanames = rooms.filter(
      (room) => room.roomid === bookedcust.roomid
    );
    const roomanamesnew = roomanames.map((names) => names.roomname);

    const newbookedcustomers = {
      customername: bookedcust.customername,
      roomname: roomanamesnew,
      date: bookedcust.date,
      starttime: bookedcust.starttime,
      endtime: bookedcust.endtime,
    };
    return newbookedcustomers;
  });
  return bookedcustomers;
}
// get method to get list all customers with booked data with
app.get("/bookings", async (req, res) => {
  res.json(await bookedcustomers());
});
///  function to get list all rooms with booked data with
async function bookedr() {
  const bookedrooms = await rooms.map((room) => {
    const isbooked = bookings.some((book) => book.roomid === room.roomid);
    const bookedstatus = isbooked?'Booked':'Not Booked';
    const customers = bookings.filter((book) => book.roomid === room.roomid);
    const customernames = customers.map((names) => names.customername);
    const bookeddates = bookings.filter((book) => book.roomid === room.roomid);
    const newbookeddates = bookeddates.map((names) => names.date);
    const bookedstart = bookings.filter((book) => book.roomid === room.roomid);
    const bookedstartnew = bookedstart.map((names) => names.starttime);
    const bookedend = bookings.filter((book) => book.roomid === room.roomid);
    const bookedendnew = bookedend.map((names) => names.endtime);

    const newbooked = {
      roomname: room.roomname,
      bookedstatus: bookedstatus,
      customers: customernames,
      date: newbookeddates,
      starttime: bookedstartnew,
      endtime: bookedendnew,
    };
    return newbooked;
  });

  return bookedrooms;
}
//// get method to get list all rooms  with booked data with
app.get("/bookedrooms", async (req, res) => {
  res.json(await bookedr());
});
// function to list how many time a customer has booked the room
async function noofbookings() {
  const bookedcustomers = await bookings.map((bookedcust) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const day = today.getDate();

    const currentdate = `${day}-${month}-${year}`;
    const bookingstatus =
      currentdate == bookedcust.date ? "booked" : "Not Booked";
    const roomanames = rooms.filter(
      (room) => room.roomid === bookedcust.roomid
    );
    const roomanamesnew = roomanames.map((names) => names.roomname);

    const newbookedcustomers = {
      customername: bookedcust.customername,
      roomname: roomanamesnew,
      date: bookedcust.date,
      starttime: bookedcust.starttime,
      endtime: bookedcust.endtime,
      bookingid: bookedcust.bookingid,
      bookingdate: bookedcust.date,
      bookingstatus: bookingstatus,
    };
    return newbookedcustomers;
  });
  return bookedcustomers;
}
// get method to list how many time a customer has booked the room
app.get("/noofbookings", async (req, res) => {
  res.json(await noofbookings());
});

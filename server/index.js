// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
// const cors = require("cors");

// const authRoutes = require("./routes/auth.js")
// const listingRoutes = require("./routes/listing.js")
// const bookingRoutes = require("./routes/booking.js")
// const userRoutes = require("./routes/user.js")

// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// // Set up CORS to allow requests from your deployed frontend
// app.use(cors({
//   origin: "https://rental-application-frontend.vercel.app",
//   methods: ["POST","GET"],
//   credentials: true // Allows cookies to be sent with requests
// }));


// /* ROUTES */
// app.use("/auth", authRoutes)
// app.use("/properties", listingRoutes)
// app.use("/bookings", bookingRoutes)
// app.use("/users", userRoutes)

// /* MONGOOSE SETUP */
// const PORT = 3001;
// mongoose
//   .connect(process.env.MONGO_URL, {
//     dbName: "Dream_Nest",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   })
//   .catch((err) => console.log(`${err} did not connect`));


  
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');



app.use(cors({
  origin: ["https://rental-application-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"], // Add other methods if needed
  credentials: true
}));

// Middleware and routes setup
app.use(express.json());
app.use(express.static("public"));



const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// Mongoose setup
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Dream_Nest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));

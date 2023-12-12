const express = require("express");
const app = express();
const quotes = require("./quotes.json");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();
app.use(express.json()); //this function express.json() will convert request body into json format 
app.use(cors());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res)=>{
    res.send("Notes API");
})

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is running on port" + PORT);
    });
})
.catch((error)=>{
    console.log(error);
})











// app.get("/quote", (req, res)=>{
//     res.json(quotes);
// });

// app.get("/random", (req, res)=>{
//     let index = Math.floor(Math.random() * quotes.length)
//     let quote = quotes[index];
//     res.status(200).json(quote);
// });



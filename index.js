const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();


const userRoutes = require("./routes/userRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const authRoutes = require("./routes/authRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");

const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Parse JSON request bodies


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB Connected Succesfully");
}).catch((err)=>{
    console.log(err);
    console.log("Error In DB Connection");
});

app.use("/api/users", userRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/transactions", transactionRoutes);

app.get("/", (req,res)=>{
    res.send("Welcome to Ideacity Server");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
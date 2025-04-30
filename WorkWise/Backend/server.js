const express = require("express");
require("dotenv").config();
const connect = require("./config/db.js");
const  router  = require("./routes/userRoutes.js");
const router2 = require("./routes/seatRoutes.js")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/auth/", router)
app.use("/api/auth/seat", router2)

const PORT = process.env.PORT

connect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
})
.catch((err)=>{
    console.log("Unable to start the server", err)
})
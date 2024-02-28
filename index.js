const express=require("express")
const app=express()
var cors =require("cors")
const connectToMongoose=require("./DB/db")
app.use(cors())
app.use(express.json())
connectToMongoose()
const vehiclesRouter = require("./routes/vehicles");
const authRouter=require("./routes/auth")

//routes 
app.use("/api/vehicles", vehiclesRouter);
//routes 
app.use("/api/auth", require("./routes/auth"));


const PORT=7000
app.get('/',(request,response)=>{
response.send("hello from umrahride dashboard backend")
})
app.listen(PORT,()=>{
console.log(`app listening at ${PORT}`)
})
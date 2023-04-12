const express =require("express");
const cors =require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config()
const port = process.env.PORT || 3000
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("db connected")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    destination: String,
    travellers: String,
    budget:String

  });

  const User = mongoose.model('User', userSchema);



  const server = express();
server.use(cors());
server.use(bodyParser.json());

server.post("/postedform",async (req,res)=>{

    let user = new User();
    user.name=req.body.name
    user.email=req.body.email
    user.destination=req.body.destination
    user.travellers=req.body.travellers;
    user.budget=req.body.budget;
    const doc = await user.save();

    console.log(doc )
    res.json(doc)
})

server.get('/retrievedata',async (req,res)=>{

   const docs =  await User.find({})
   res.json(docs)

})
server.get('/',async (req,res)=>{

  //  const docs =  await User.find({})
   res.send("Welcome to mock-15")

})

server.listen(port,()=>{
    console.log('server started')
    console.log(process.env.MONGO_URI)
})



const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://shoaibshaikh0059:FEqxLSupXrxe2D1s@cluster0.ldhsyac.mongodb.net/"

const connectToMongo =() =>{
    mongoose.connect(mongoURI);
    console.log("Connected to Mongodb Database");

}

module.exports = connectToMongo;
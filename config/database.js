const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);    
        console.log('MONGODB connected');
    }
    catch(error){
        console.error('MONGODB connection error ',error);
        process.exit(1);
    }
};

mongoose.connection.on('connected',()=>{
    console.log('MONGOOSE conncted to MongoDB');
});
mongoose.connection.on('error',(err)=>{
    console.error('MONGOOSE connction error ',err);
});
mongoose.connection.on('disconnected',()=>{
    console.log('MONGOOSE disconnected');
});

module.exports = connectDB;


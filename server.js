
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const productRoutes = require('./routes/ProductRoutes');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/api' , productRoutes);

app.get('/' , (req , res)=>{
    res.json({
        message : 'API is working fine',
        endpoints : {
            upload : 'POST /api/upload',
            listProducts : 'GET /api/products',
            searchProducts : 'GET /api/products/search',
        }
    });
});

app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`MongoDB : ${process.env.MONGODB_URI}`);
});

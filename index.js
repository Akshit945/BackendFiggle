//imports
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const Account = require('./models/account.model');
const cors = require('cors'); // Import the cors middleware
const app = express(); 

//midllewares
app.use(express.json());
app.use(cors());
 
//api work
app.get('/',(req,res) => {
    res.send('Welcome To Figgle API');
})
//Products API
app.post('/api/products',async (req,res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

app.get('/api/products',async (req,res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

//Account API
app.post('/api/accounts', async (req, res) => {
    try {
      const account = await Account.create(req.body);
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app.get('/api/accounts', async (req, res) => {
    try {
      const accounts = await Account.find({});
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app.put('/api/accounts/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const accounts = await Account.findByIdAndUpdate(id,req.body);
      if (!accounts){
        return res.status(404).json({message : "Product Not Found"})
      }
      const updatedAccount = await Account.findById(id);
      res.status(200).json(updatedAccount);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//database connection
mongoose.connect("mongodb+srv://figgleCanvas:VfcW0greBHWeRmBg@ecomm.xcwucfo.mongodb.net/Figgle-Api?retryWrites=true&w=majority&appName=Ecomm").then(()=>{console.log("connection success")}).catch(()=>{console.log("connection failed")});

//server
app.listen(3000,()=>{
    console.log('server is running on port 3000');
})